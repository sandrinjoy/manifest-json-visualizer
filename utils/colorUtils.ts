/**
 * Calculates the luminance of a hex color to determine if text should be black or white.
 * Returns 'black' or 'white'.
 */
export const getContrastColor = (hexColor: string | undefined): 'black' | 'white' => {
  if (!hexColor) return 'black';

  // Remove hash if present
  const hex = hexColor.replace('#', '');
  
  // Parse r, g, b
  let r = 0, g = 0, b = 0;
  
  if (hex.length === 3) {
    r = parseInt(hex.substr(0, 1) + hex.substr(0, 1), 16);
    g = parseInt(hex.substr(1, 1) + hex.substr(1, 1), 16);
    b = parseInt(hex.substr(2, 1) + hex.substr(2, 1), 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substr(0, 2), 16);
    g = parseInt(hex.substr(2, 2), 16);
    b = parseInt(hex.substr(4, 2), 16);
  } else {
    return 'black'; // Fallback
  }

  // Calculate YIQ ratio
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  
  return (yiq >= 128) ? 'black' : 'white';
};