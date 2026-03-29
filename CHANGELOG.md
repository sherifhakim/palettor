# Changelog

## [1.1.0] - Random Harmony Feature

### Added
- **Random harmony option** - Automatically picks a different harmony method each time Generate is clicked
- Set Random as the default harmony method for better user experience
- `getRandomHarmonyMethod()` helper function to randomly select from 6 harmony methods

### Changed
- Updated `HarmonyMethod` type to include 'random' option
- Modified `generateHarmoniousPalette()` to handle random selection
- Updated default harmony state from 'analogous' to 'random'
- Added "Random" as first option in harmony dropdown

### Documentation
- Updated `README_HARMONY.md` with Random feature
- Updated `QUICK_START.md` with Random instructions
- Created `RANDOM_HARMONY_UPDATE.md` with detailed implementation notes

### Benefits
- Users can explore different harmonies without understanding color theory
- Each generation provides variety and inspiration
- Still allows manual selection of specific harmony methods
- Perfect for beginners and quick experimentation

---

## [1.0.0] - Initial Color Harmony Implementation

### Added
- **6 harmony methods** based on color theory:
  - Analogous (neighboring colors)
  - Complementary (opposite colors)
  - Triadic (evenly spaced)
  - Monochromatic (same color family)
  - Split Complementary (balanced contrast)
  - Tetradic (four-color harmony)
- Hue-based marker matching using chroma.js
- Locked color support as harmony base
- Real markers only (no color generation)
- No duplicate markers in palette

### Core Files
- `lib/color-harmony.ts` - Core harmony calculation logic
- Updated `app/page.tsx` - Added harmony selector UI

### Documentation
- `README_HARMONY.md` - Main documentation hub
- `QUICK_START.md` - User-friendly guide
- `HARMONY_FEATURE.md` - Comprehensive feature docs
- `IMPLEMENTATION_SUMMARY.md` - Technical overview
- `ARCHITECTURE.md` - System architecture
- `HARMONY_EXAMPLES.md` - Detailed examples
- `TESTING_CHECKLIST.md` - Testing guide
- `VISUAL_GUIDE.md` - Visual diagrams
- `FILES_SUMMARY.md` - File inventory

### Technical Details
- Uses HSL color space for hue calculations
- Circular hue math (0° = 360°)
- O(n*m) complexity where n=palette size, m=marker count
- No new dependencies (uses existing chroma-js)
- TypeScript with full type safety
- Mobile and desktop responsive

### Features
- Works with all 3 marker brands (Ohuhu, Decotime, ChenRui)
- Instant generation (< 100ms)
- Respects locked colors
- Drag to reorder colors
- Copy hex codes
- Manual color selection
- Search markers
