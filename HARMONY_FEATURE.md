# Color Harmony Feature

## Overview

The palette generator now uses color harmony theory to create aesthetically pleasing color combinations using real markers from your selected brand (Ohuhu, Decotime, or ChenRui).

## How It Works

### 1. Base Color Selection
- If you have **locked colors**, the first locked color becomes the base hue
- If no colors are locked, a random marker is selected as the base

### 2. Harmony Calculation
Based on the selected harmony method, target hue angles are calculated:

#### Analogous
Colors adjacent on the color wheel (±30° intervals)
- Creates harmonious, cohesive palettes
- Best for: Calm, unified designs

#### Complementary
Opposite colors on the wheel (180° apart)
- Creates high contrast, vibrant palettes
- Best for: Bold, eye-catching designs

#### Triadic
Three colors evenly spaced (120° apart)
- Creates balanced, vibrant palettes
- Best for: Playful, energetic designs

#### Monochromatic
Same hue with variations in saturation/lightness
- Creates subtle, sophisticated palettes
- Best for: Elegant, minimalist designs

#### Split Complementary
Base color + two colors adjacent to its complement (150° and 210°)
- Creates contrast with less tension than complementary
- Best for: Balanced yet dynamic designs

#### Tetradic (Rectangle)
Four colors forming a rectangle on the wheel (60°, 180°, 240°)
- Creates rich, diverse palettes
- Best for: Complex, varied designs

### 3. Marker Matching
For each target hue, the algorithm:
1. Searches through all available markers in the selected brand
2. Calculates the hue distance (accounting for the circular nature of hue: 0° = 360°)
3. Selects the closest real marker to the target hue
4. Ensures no duplicate markers are used

### 4. Locked Colors
- Locked colors are always preserved in their positions
- The first locked color determines the base hue for harmony calculations
- Other palette positions are filled with harmonious markers

## Usage

1. **Select a Brand**: Choose Ohuhu, Decotime, or ChenRui
2. **Select Harmony Method**: Pick from the dropdown (Analogous, Complementary, etc.)
3. **Lock Colors** (optional): Click the lock icon on any color to keep it
4. **Generate**: Click the "Generate" button to create a harmonious palette

## Technical Details

### Files Modified
- `app/page.tsx` - Main component with harmony selector UI
- `lib/color-harmony.ts` - Core harmony calculation logic

### Key Functions

#### `calculateHarmonyHues(baseHue, method, count)`
Calculates target hue angles based on the harmony method.

#### `findClosestMarkerByHue(targetHue, availableMarkers, usedHexes)`
Finds the real marker closest to a target hue value.

#### `preprocessMarkersWithHue(markers, brandKey)`
Converts marker hex values to HSL and extracts hue for efficient searching.

#### `generateHarmoniousPalette(size, currentPalette, markers, brandKey, harmonyMethod)`
Main function that orchestrates the harmony generation process.

### Color Space
- Uses **HSL (Hue, Saturation, Lightness)** color space
- Hue is measured in degrees (0-360°)
- Leverages `chroma-js` for color conversions

## Examples

### Analogous Palette (Base: Red at 0°)
- 0° (Red)
- 30° (Red-Orange)
- 330° (Red-Violet)
- 60° (Orange)
- 300° (Violet)

### Triadic Palette (Base: Red at 0°)
- 0° (Red)
- 120° (Green)
- 240° (Blue)

### Complementary Palette (Base: Blue at 240°)
- 240° (Blue)
- 60° (Yellow)
- 60° (Yellow)
- 60° (Yellow)

## Benefits

1. **Real Markers Only**: All colors in the palette are actual markers you can purchase
2. **Harmonious Results**: Based on proven color theory principles
3. **Flexible**: Multiple harmony methods for different design needs
4. **Respects Locks**: Your locked colors are preserved and used as harmony anchors
5. **No Duplicates**: Each marker appears only once in the palette

## Future Enhancements

Potential improvements:
- Custom harmony angles
- Saturation/lightness matching
- Color temperature preferences
- Save favorite harmony combinations
- Export palette with marker codes
