import { SafeDimensions } from '../types/safe';

export function generateSizeCode(dimensions: SafeDimensions): string {
  const { width, height, depth } = dimensions;
  const volume = width * height * depth;
  
  // Size category based on volume
  let sizeChar = 'M';
  if (volume < 125000) sizeChar = 'S';
  if (volume > 250000) sizeChar = 'L';
  
  // Depth category
  let depthChar = 'B';
  if (depth < 30) depthChar = 'A';
  if (depth > 60) depthChar = 'C';
  
  return `${sizeChar}${depthChar}`;
}

export function generateSerialNumber(
  dimensions: SafeDimensions,
  sequence: number
): string {
  const year = new Date().getFullYear().toString().slice(-2);
  const sizeCode = generateSizeCode(dimensions);
  const sequenceStr = sequence.toString().padStart(4, '0');
  
  return `MB-${year}${sizeCode}-${sequenceStr}`;
}