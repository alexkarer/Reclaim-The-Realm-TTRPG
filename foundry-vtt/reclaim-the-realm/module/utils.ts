/**
 * Generates a FVTT ID by padding with 0 or truncating an id string to 16 characters.
 * @param {string} id
 * @returns {string}
 */
export function generateFvttId(id: string): string {
  if (id.length >= 16) return id.substring(0, 16);
  return id.padEnd(16, "0");
}