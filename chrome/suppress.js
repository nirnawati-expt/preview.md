const originalWarn = console.warn;
console.warn = function (...args) {
  if (args[0] && typeof args[0] === "string" && args[0].includes("tailwind")) {
    return; // Blokir warning Tailwind
  }
  originalWarn.apply(console, args);
};
