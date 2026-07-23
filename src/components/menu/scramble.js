const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

export function scrambleElement(element, options = {}) {
  if (!element) return;
  
  const originalText = element.dataset.originalText || element.textContent.trim();
  element.dataset.originalText = originalText;
  
  const length = originalText.length;
  let iterations = 0;
  const maxIterations = options.maxIterations || 10;
  const charDelay = options.charDelay || 35;
  
  if (element.scrambleInterval) {
    clearInterval(element.scrambleInterval);
  }
  
  element.scrambleInterval = setInterval(() => {
    let output = "";
    const progress = iterations / maxIterations;
    
    for (let i = 0; i < length; i++) {
      if (originalText[i] === " " || originalText[i] === "\n") {
        output += originalText[i];
      } else if (i < progress * length) {
        output += originalText[i];
      } else {
        output += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    
    element.textContent = output;
    iterations++;
    
    if (iterations > maxIterations) {
      clearInterval(element.scrambleInterval);
      element.scrambleInterval = null;
      element.textContent = originalText;
    }
  }, charDelay);
}
