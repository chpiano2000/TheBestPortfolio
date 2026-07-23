/**
 * Parses YAML-like frontmatter from a markdown string.
 * Supporting formats:
 * ---
 * id: My Post Title
 * aliases: [alias1, alias2]
 * tags: [tag1, tag2]
 * date: JULY 2024
 * readTime: 05 MIN READ
 * snippet: An interesting post snippet.
 * ---
 * Content starts here...
 */
export function parseMarkdownWithFrontmatter(rawMarkdown) {
  if (!rawMarkdown) {
    return { metadata: {}, content: "" };
  }

  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = rawMarkdown.match(frontmatterRegex);

  if (!match) {
    return {
      metadata: {},
      content: rawMarkdown,
    };
  }

  const yamlBlock = match[1];
  const content = match[2];
  const metadata = {};

  const lines = yamlBlock.split("\n");
  let currentKey = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    // Check if it's a list item under the current key
    if (line.startsWith("  - ") || line.startsWith(" - ") || trimmed.startsWith("- ")) {
      if (currentKey) {
        const itemVal = trimmed.replace(/^-?\s*/, "").replace(/^["']|["']$/g, "").trim();
        if (!Array.isArray(metadata[currentKey])) {
          metadata[currentKey] = [];
        }
        metadata[currentKey].push(itemVal);
      }
      continue;
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let val = line.slice(colonIndex + 1).trim();

    // Check for inline arrays e.g., aliases: [] or tags: [tag1, tag2]
    if (val.startsWith("[") && val.endsWith("]")) {
      const arrayContent = val.slice(1, -1).trim();
      val = arrayContent
        ? arrayContent.split(",").map((item) => item.trim().replace(/^["']|["']$/g, ""))
        : [];
    } else {
      // Remove surrounding quotes if present
      val = val.replace(/^["']|["']$/g, "");
    }

    metadata[key] = val;
    currentKey = key;
  }

  return {
    metadata,
    content: content.trim(),
  };
}

/**
 * Parses date string to Date object for sorting.
 * Supports formats like "JULY 2024" or standard ISO strings.
 */
export function parseDate(dateStr) {
  if (!dateStr) return new Date(0);
  const parts = dateStr.split(" ");
  if (parts.length === 2) {
    const monthNames = [
      "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    const month = monthNames.indexOf(parts[0].toUpperCase());
    const year = parseInt(parts[1], 10);
    if (month !== -1 && !isNaN(year)) {
      return new Date(year, month);
    }
  }
  const parsed = Date.parse(dateStr);
  return isNaN(parsed) ? new Date(0) : new Date(parsed);
}
