import chroma from 'chroma-js';

export type HarmonyMethod = 
  | 'random'
  | 'analogous' 
  | 'complementary' 
  | 'triadic' 
  | 'monochromatic' 
  | 'split-complementary' 
  | 'tetradic';

export type PaletteStyle = 
  | 'any'
  | 'pastel'
  | 'warm'
  | 'neon'
  | 'vintage'
  | 'cold'
  | 'summer'
  | 'winter'
  | 'spring';

const HARMONY_METHODS: Exclude<HarmonyMethod, 'random'>[] = [
  'analogous',
  'complementary',
  'triadic',
  'monochromatic',
  'split-complementary',
  'tetradic'
];

export function getRandomHarmonyMethod(): Exclude<HarmonyMethod, 'random'> {
  return HARMONY_METHODS[Math.floor(Math.random() * HARMONY_METHODS.length)];
}

export interface MarkerWithHue {
  marker: any;
  hue: number;
  brandKey: string;
}

export function calculateHarmonyHues(baseHue: number, method: HarmonyMethod, count: number): number[] {
  const hues: number[] = [baseHue];
  
  switch (method) {
    case 'analogous':
      for (let i = 1; i < count; i++) {
        const offset = Math.ceil(i / 2) * 30 * (i % 2 === 0 ? -1 : 1);
        hues.push((baseHue + offset + 360) % 360);
      }
      break;
      
    case 'complementary':
      for (let i = 1; i < count; i++) {
        hues.push((baseHue + 180) % 360);
      }
      break;
      
    case 'triadic':
      for (let i = 1; i < count; i++) {
        hues.push((baseHue + (i * 120)) % 360);
      }
      break;
      
    case 'monochromatic':
      for (let i = 1; i < count; i++) {
        hues.push(baseHue);
      }
      break;
      
    case 'split-complementary':
      const angles = [150, 210, 30, 330];
      for (let i = 1; i < count; i++) {
        hues.push((baseHue + angles[(i - 1) % angles.length]) % 360);
      }
      break;
      
    case 'tetradic':
      const tetAngles = [60, 180, 240, 90, 270];
      for (let i = 1; i < count; i++) {
        hues.push((baseHue + tetAngles[(i - 1) % tetAngles.length]) % 360);
      }
      break;
  }
  
  return hues;
}

export function filterMarkersByStyle(markers: MarkerWithHue[], style: PaletteStyle): MarkerWithHue[] {
  if (style === 'any') return markers;
  
  return markers.filter(({ marker }) => {
    try {
      const color = chroma(marker.hex);
      const [h, s, l] = color.hsl();
      
      switch (style) {
        case 'pastel':
          return s < 0.5 && l > 0.6;
        case 'warm':
          return (h >= 0 && h <= 60) || h >= 330;
        case 'neon':
          return s > 0.6 && l > 0.4 && l < 0.8;
        case 'vintage':
          return s < 0.6 && l > 0.3 && l < 0.7;
        case 'cold':
          return h >= 180 && h <= 270;
        case 'summer':
          return s > 0.4 && l > 0.5 && l < 0.8;
        case 'winter':
          return l < 0.5 || (s < 0.3 && l < 0.7);
        case 'spring':
          return s > 0.5 && l > 0.5 && ((h >= 60 && h <= 150) || (h >= 300 && h <= 360));
        default:
          return true;
      }
    } catch {
      return true;
    }
  });
}

export function findClosestMarkerByHue(
  targetHue: number,
  availableMarkers: MarkerWithHue[],
  usedHexes: Set<string>
): MarkerWithHue | null {
  const HUE_THRESHOLD = 30;
  const FALLBACK_POOL_SIZE = 5;
  
  const markersWithDistance = availableMarkers
    .filter(markerData => !usedHexes.has(markerData.marker.hex))
    .map(markerData => {
      const hueDiff = Math.abs(markerData.hue - targetHue);
      const distance = Math.min(hueDiff, 360 - hueDiff);
      return { markerData, distance };
    })
    .sort((a, b) => a.distance - b.distance);
  
  if (markersWithDistance.length === 0) return null;
  
  const pool = markersWithDistance.filter(m => m.distance < HUE_THRESHOLD);
  const finalPool = pool.length > 0 ? pool : markersWithDistance.slice(0, FALLBACK_POOL_SIZE);
  
  const randomIndex = Math.floor(Math.random() * finalPool.length);
  return finalPool[randomIndex].markerData;
}

export function preprocessMarkersWithHue(markers: any[], brandKey: string): MarkerWithHue[] {
  return markers.map(marker => {
    try {
      const color = chroma(marker.hex);
      const hue = color.get('hsl.h') || 0;
      return { marker, hue, brandKey };
    } catch {
      return { marker, hue: 0, brandKey };
    }
  });
}

export function generateHarmoniousPalette(
  size: number,
  currentPalette: any[],
  markers: any[],
  brandKey: string,
  harmonyMethod: HarmonyMethod,
  method?: HarmonyMethod,
  paletteStyle: PaletteStyle = 'any'
): any[] {
  const effectiveMethod = method ?? harmonyMethod;
  const actualMethod = effectiveMethod === 'random' ? getRandomHarmonyMethod() : effectiveMethod;
  let markersWithHue = preprocessMarkersWithHue(markers, brandKey);
  
  // Apply palette style filter
  markersWithHue = filterMarkersByStyle(markersWithHue, paletteStyle);
  
  if (markersWithHue.length === 0) {
    return [];
  }
  
  const usedHexes = new Set<string>();
  const newPalette: any[] = [];
  
  // Initialize palette with locked colors preserved
  for (let i = 0; i < size; i++) {
    if (currentPalette[i]?.locked) {
      newPalette.push(currentPalette[i]);
      usedHexes.add(currentPalette[i].marker.hex);
    } else {
      newPalette.push(null);
    }
  }
  
  {
    const randomMarker = markersWithHue[Math.floor(Math.random() * markersWithHue.length)];
    const baseHue = randomMarker.hue;
    const targetHues = calculateHarmonyHues(baseHue, actualMethod, size);
    
    for (let i = 0; i < size; i++) {
      // Skip locked colors
      if (newPalette[i] !== null) continue;
      
      const closestMarker = findClosestMarkerByHue(targetHues[i], markersWithHue, usedHexes);
      if (closestMarker) {
        newPalette[i] = {
          id: currentPalette[i]?.id || Math.random().toString(36).substring(7),
          marker: closestMarker.marker,
          brandKey: closestMarker.brandKey,
          locked: false
        };
        usedHexes.add(closestMarker.marker.hex);
      }
    }
  }
  
  for (let i = 0; i < newPalette.length; i++) {
    if (newPalette[i] === null) {
      const unusedMarker = markersWithHue.find(m => !usedHexes.has(m.marker.hex));
      if (unusedMarker) {
        newPalette[i] = {
          id: currentPalette[i]?.id || Math.random().toString(36).substring(7),
          marker: unusedMarker.marker,
          brandKey: unusedMarker.brandKey,
          locked: false
        };
        usedHexes.add(unusedMarker.marker.hex);
      }
    }
  }
  
  return newPalette.filter(p => p !== null);
}
