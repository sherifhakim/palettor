'use client';

import { useState, useEffect, useCallback } from 'react';
import { ohuhuMarkers, MarkerData as OhuhuMarkerData } from '@/lib/ohuhu-markers';
import { decotimeMarkers, MarkerData as DecotimeMarkerData } from '@/lib/decotime-markers';
import { chenRuiMarkers, MarkerData as ChenRuiMarkerData } from '@/lib/chenRui-markers';
import chroma from 'chroma-js';
import { Plus, Minus, Lock, Unlock, Copy, Check, Palette, X, WandSparkles } from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Header } from '@/components/Header';

type StyleType = 'pastel' | 'warm' | 'neon' | 'vintage' | 'summer' | 'winter' | 'cold' | 'autumn' | 'All style';
type CodeType = 'old' | 'new';

type AnyMarker = OhuhuMarkerData | DecotimeMarkerData | ChenRuiMarkerData;

const BRANDS: Record<string, { label: string; markers: AnyMarker[]; hasCodes: boolean }> = {
  ohuhu: { label: 'Ohuhu', markers: ohuhuMarkers, hasCodes: true },
  decotime: { label: 'Decotime', markers: decotimeMarkers, hasCodes: false },
  chenrui: { label: 'ChenRui', markers: chenRuiMarkers, hasCodes: false },
};

interface PaletteColor {
  id: string;
  marker: AnyMarker;
  locked: boolean;
  brandKey: string;
}

const filterMarkersByStyle = (markers: AnyMarker[], style: StyleType): AnyMarker[] => {
  return markers.filter(marker => {
    if (marker.hex === '#ffffff' || marker.hex === '#000000') return false;

    const color = chroma(marker.hex);
    const hsl = color.hsl();
    const h = isNaN(hsl[0]) ? 0 : hsl[0];
    const s = hsl[1];
    const l = hsl[2];

    switch (style) {
      case 'pastel':
        return l > 0.75 && s > 0.2 && s < 0.8;
      case 'warm':
        return (h >= 0 && h <= 60) || (h >= 300 && h <= 360);
      case 'neon':
        return s > 0.8 && l > 0.4 && l < 0.7;
      case 'vintage':
        return s < 0.4 && l > 0.3 && l < 0.7;
      case 'summer':
        return s > 0.6 && l > 0.5 && (h > 30 && h < 240);
      case 'winter':
        return l > 0.8 || l < 0.3 || (h > 180 && h < 280 && s < 0.5);
      case 'cold':
        return h >= 150 && h <= 300;
      case 'autumn':
        return (h >= 0 && h <= 50) && l < 0.6 && s > 0.3;
      case 'All style':
        return true;
      default:
        return true;
    }
  });
};

export default function OhuhuPaletteGenerator() {
  const [palette, setPalette] = useState<PaletteColor[]>([]);
  const [size, setSize] = useState(5);
  const [style, setStyle] = useState<StyleType>('All style');
  const [brand, setBrand] = useState<string>('ohuhu');
  const [codeType, setCodeType] = useState<CodeType>('new');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [colorToEditId, setColorToEditId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const generatePalette = useCallback((currentSize: number, currentStyle: StyleType, currentPalette: PaletteColor[], currentBrand: string, generateOnlyNew: boolean = false) => {
    const brandData = BRANDS[currentBrand] || BRANDS.ohuhu;
    let availableMarkers = filterMarkersByStyle(brandData.markers, currentStyle);

    if (availableMarkers.length < currentSize) {
      availableMarkers = brandData.markers;
    }

    let newPalette = [...currentPalette];

    if (newPalette.length < currentSize) {
      const toAdd = currentSize - newPalette.length;
      for (let i = 0; i < toAdd; i++) {
        newPalette.push({
          id: Math.random().toString(36).substring(7),
          marker: brandData.markers[0],
          locked: false,
          brandKey: currentBrand
        });
      }
    } else if (newPalette.length > currentSize) {
      newPalette = newPalette.slice(0, currentSize);
    }

    const usedHexes = new Set(
      newPalette
        .filter((p, index) => p.locked || (generateOnlyNew && index < currentPalette.length))
        .map(p => p.marker.hex)
    );

    const finalPalette = newPalette.map((item, index) => {
      const isKept = item.locked || (generateOnlyNew && index < currentPalette.length);
      if (isKept) return item;

      let pool = availableMarkers.filter(m => !usedHexes.has(m.hex));
      if (pool.length === 0) pool = availableMarkers;

      const randomMarker = pool[Math.floor(Math.random() * pool.length)];
      usedHexes.add(randomMarker.hex);

      return { ...item, marker: randomMarker, brandKey: currentBrand };
    });

    setPalette(finalPalette);
  }, []);

  useEffect(() => {
    if (isClient && palette.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      generatePalette(size, style, [], brand);
    }
  }, [isClient, size, style, brand, generatePalette, palette.length]);

  const handleGenerate = () => {
    generatePalette(size, style, palette, brand);
  };

  const toggleLock = (id: string) => {
    setPalette(prev => prev.map(p => p.id === id ? { ...p, locked: !p.locked } : p));
  };

  const copyHex = (hex: string, id: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSizeChange = (newSize: number) => {
    if (newSize >= 2 && newSize <= 7) {
      setSize(newSize);
      generatePalette(newSize, style, palette, brand, true);
    }
  };

  if (!isClient) return null;

  return (
    <div className="h-[100dvh] flex flex-col overflow-hidden bg-zinc-50">
      <Header />
      {/* Main Content (Palette) */}
      <Reorder.Group
        as="main"
        axis={isMobile ? 'y' : 'x'}
        values={palette}
        onReorder={setPalette}
        className="flex-1 flex flex-col sm:flex-row p-2 sm:p-4 gap-2 sm:gap-4 overflow-hidden w-full max-w-[2400px] mx-auto m-0 outline-none"
      >
        <AnimatePresence mode="popLayout">
          {palette.map((color) => {
            const textColor = chroma(color.marker.hex).luminance() > 0.5 ? 'text-zinc-900' : 'text-white';
            const iconColor = chroma(color.marker.hex).luminance() > 0.5 ? 'text-zinc-900/50 hover:text-zinc-900' : 'text-white/50 hover:text-white';

            return (
              <Reorder.Item
                key={color.id}
                value={color}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                className="relative flex-1 min-h-[0px] min-w-[0px] group rounded-xl sm:rounded-2xl overflow-hidden flex flex-col cursor-grab active:cursor-grabbing w-full h-full list-none"
                style={{ backgroundColor: color.marker.hex }}
              >
                <div className="w-full h-full p-3 sm:p-6 flex flex-row sm:flex-col justify-between sm:justify-end items-center sm:items-start relative pointer-events-none">

                  {/* Color Info */}
                  <div className="flex flex-col items-start min-w-0 flex-1 sm:w-auto sm:mt-auto pointer-events-auto">
                    <button
                      onClick={() => copyHex(color.marker.hex, color.id)}
                      className={`text-left text-sm sm:text-xl tracking-tight flex items-center gap-1.5 sm:gap-2 ${textColor} group/copy`}
                      style={{ fontFamily: 'var(--font-fredoka, Fredoka, sans-serif)', fontWeight: 600 }}
                    >
                      {color.marker.hex.replace('#', '').toUpperCase()}
                      <span className="opacity-100 sm:opacity-0 sm:group-hover/copy:opacity-100 transition-opacity">
                        {copiedId === color.id ? <Check className="w-3 h-3 sm:w-4 sm:h-4" /> : <Copy className="w-3 h-3 sm:w-4 sm:h-4" />}
                      </span>
                    </button>

                    <div className={`font-display font-bold text-lg sm:text-3xl tracking-tight leading-none truncate w-full ${textColor} mt-0.5 sm:mt-1`}>
                      {'newName' in color.marker
                        ? (codeType === 'new' ? color.marker.newName : (color.marker as any).oldName)
                        : color.marker.code}
                    </div>

                    {'newName' in color.marker && (
                      <div className={`text-xs sm:text-sm font-medium opacity-70 mt-0.5 sm:mt-1 ${textColor}`}>
                        {codeType === 'new' ? color.marker.newCode : color.marker.oldCode}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className={`
                    flex flex-row sm:flex-col gap-2 shrink-0
                    sm:absolute sm:top-4 sm:right-4 sm:opacity-0 sm:group-hover:opacity-100
                    ml-2 sm:ml-0 pointer-events-auto
                  `}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setColorToEditId(color.id);
                        setIsManualModalOpen(true);
                      }}
                      className={`p-2 rounded-full backdrop-blur-md bg-white/10 transition-all duration-200 ${iconColor} hover:bg-white/20`}
                      aria-label="Change color manually"
                      title="Change color manually"
                    >
                      <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLock(color.id);
                      }}
                      className={`p-2 rounded-full backdrop-blur-md bg-white/10 transition-all duration-200 ${iconColor} hover:bg-white/20`}
                      aria-label={color.locked ? "Unlock color" : "Lock color"}
                      title={color.locked ? "Unlock color" : "Lock color"}
                    >
                      {color.locked ? <Lock className="w-4 h-4 sm:w-5 sm:h-5" /> : <Unlock className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>
                  </div>
                </div>

                {/* Copied Tooltip */}
                <AnimatePresence>
                  {copiedId === color.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 sm:px-4 sm:py-2 bg-zinc-900 text-white text-xs sm:text-sm font-medium rounded-full shadow-lg z-10"
                    >
                      Copied!
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reorder.Item>
            );
          })}
        </AnimatePresence>
      </Reorder.Group>

      {/* Bottom Controls Bar */}
      <div className="bg-white/90 backdrop-blur-xl border-t border-zinc-200 p-2 sm:p-4 shrink-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-nowrap items-center justify-between gap-1.5 sm:gap-3">

          {/* Size Controls */}
          <div className="flex items-center gap-0.5 sm:gap-3 bg-zinc-100 p-1 rounded-full shrink-0">
            <button
              onClick={() => handleSizeChange(size - 1)}
              disabled={size <= 2}
              className="p-1 sm:p-2 rounded-full hover:bg-white disabled:opacity-50 disabled:hover:bg-transparent transition-colors text-zinc-700"
            >
              <Minus className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </button>
            <span className="font-mono font-medium text-zinc-900 w-3 sm:w-4 text-center text-xs sm:text-base">{size}</span>
            <button
              onClick={() => handleSizeChange(size + 1)}
              disabled={size >= 7}
              className="p-1 sm:p-2 rounded-full hover:bg-white disabled:opacity-50 disabled:hover:bg-transparent transition-colors text-zinc-700"
            >
              <Plus className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Dropdowns */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-1 sm:flex-none min-w-0 sm:justify-center">
            <Select
              value={style}
              onValueChange={(value) => {
                setStyle(value as StyleType);
                generatePalette(size, value as StyleType, palette, brand);
              }}
            >
              <SelectTrigger className="flex-1 min-w-0 sm:flex-none sm:w-40 bg-zinc-100 border-0 text-zinc-900 font-medium px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full hover:bg-zinc-200/50 focus:ring-2 focus:ring-zinc-900/20 cursor-pointer text-xs sm:text-base h-auto shadow-none transition-all duration-300">
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-zinc-200 shadow-xl bg-white/95 backdrop-blur-xl duration-300 ease-out data-open:zoom-in-90 data-closed:zoom-out-90">
                <SelectItem value="All style" className="rounded-lg cursor-pointer text-sm sm:text-base font-medium">All style</SelectItem>
                <SelectItem value="pastel" className="rounded-lg cursor-pointer text-sm sm:text-base font-medium">Pastel</SelectItem>
                <SelectItem value="warm" className="rounded-lg cursor-pointer text-sm sm:text-base font-medium">Warm</SelectItem>
                <SelectItem value="neon" className="rounded-lg cursor-pointer text-sm sm:text-base font-medium">Neon</SelectItem>
                <SelectItem value="vintage" className="rounded-lg cursor-pointer text-sm sm:text-base font-medium">Vintage</SelectItem>
                <SelectItem value="summer" className="rounded-lg cursor-pointer text-sm sm:text-base font-medium">Summer</SelectItem>
                <SelectItem value="winter" className="rounded-lg cursor-pointer text-sm sm:text-base font-medium">Winter</SelectItem>
                <SelectItem value="cold" className="rounded-lg cursor-pointer text-sm sm:text-base font-medium">Cold</SelectItem>
                <SelectItem value="autumn" className="rounded-lg cursor-pointer text-sm sm:text-base font-medium">Autumn</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={brand}
              onValueChange={(val) => {
                const value = val as string;
                if (!value) return;
                setBrand(value);
                if (BRANDS[value]?.hasCodes) {
                  setIsDialogOpen(true);
                }
                generatePalette(size, style, palette, value);
              }}
            >
              <SelectTrigger className="flex-1 min-w-0 sm:flex-none sm:w-40 bg-zinc-100 border-0 text-zinc-900 font-medium px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full hover:bg-zinc-200/50 focus:ring-2 focus:ring-zinc-900/20 cursor-pointer text-xs sm:text-base h-auto shadow-none transition-all duration-300">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-zinc-200 shadow-xl bg-white/95 backdrop-blur-xl duration-300 ease-out data-open:zoom-in-90 data-closed:zoom-out-90">
                {Object.entries(BRANDS).map(([key, data]) => (
                  <SelectItem key={key} value={key} className="rounded-lg cursor-pointer text-sm sm:text-base font-medium">
                    {data.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            className="flex items-center justify-center gap-1 sm:gap-2 bg-brand-gradient text-white px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg shadow-zinc-900/20 shrink-0 text-xs sm:text-base"
          >
            <WandSparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
            <span>Generate</span>
          </button>
        </div>
      </div>

      {/* Manual Color Selection Dialog */}
      <Dialog open={isManualModalOpen} onOpenChange={setIsManualModalOpen}>
        <DialogContent className="sm:max-w-4xl h-[85vh] flex flex-col rounded-3xl overflow-hidden p-0 gap-0 border-0 bg-white shadow-2xl">
          <DialogHeader className="p-4 sm:p-6 pb-4 border-b border-zinc-100 shrink-0 bg-white z-10 text-left relative">
            <button
              onClick={() => setIsManualModalOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-zinc-100 transition-colors text-zinc-500 hover:text-zinc-900 z-[100]"
              aria-label="Close"
              type="button"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 pr-10 sm:pr-12">Select Color</DialogTitle>
            <DialogDescription className="text-zinc-500 font-medium pr-10 sm:pr-12">
              Choose a specific {BRANDS[brand]?.label} marker. It will be locked automatically.
            </DialogDescription>
            <div className="pt-4">
              <input
                type="text"
                placeholder="Search by name or code..."
                className="w-full px-4 py-3 bg-zinc-100/80 rounded-xl text-sm sm:text-base outline-none focus:ring-2 focus:ring-zinc-900/20 border border-zinc-200/50 transition-all placeholder:text-zinc-400 font-medium text-zinc-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 bg-zinc-50/50">
            {(() => {
              const allMarkers = BRANDS[brand]?.markers || [];
              const filtered = allMarkers.filter(m => {
                const search = searchQuery.toLowerCase();
                const code = ('newName' in m ? (codeType === 'new' ? m.newCode : m.oldCode) : (m as any).code || '').toLowerCase();
                const name = ('newName' in m ? m.newName : ((m as any).name || '')).toLowerCase();
                return code.includes(search) || name.includes(search);
              });

              if (filtered.length === 0) {
                return (
                  <div className="col-span-full py-12 text-center text-zinc-400 font-medium">
                    No colors found matching "{searchQuery}"
                  </div>
                );
              }

              return filtered.map((m, i) => {
                const code = 'newName' in m ? (codeType === 'new' ? m.newCode : m.oldCode) : (m as any).code;
                const name = 'newName' in m
                  ? (codeType === 'new' ? m.newName : (m as any).oldName)
                  : ((m as any).name || '');
                const textColor = chroma(m.hex).luminance() > 0.5 ? 'text-zinc-900' : 'text-white';

                return (
                  <button
                    key={`${m.hex}-${i}`}
                    onClick={() => {
                      if (colorToEditId) {
                        setPalette(prev => prev.map(p => p.id === colorToEditId ? { ...p, marker: m, locked: true } : p));
                      }
                      setIsManualModalOpen(false);
                      setSearchQuery('');
                    }}
                    className="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl transition-all duration-300 hover:scale-[1.15] hover:shadow-xl hover:z-10 focus:outline-none focus:ring-4 focus:ring-zinc-900/20 border border-black/5 aspect-square"
                    style={{ backgroundColor: m.hex }}
                    title={name ? `${code} - ${name}` : code}
                  >
                    <span className={`text-sm sm:text-base font-bold tracking-tight ${textColor} transition-transform group-hover:-translate-y-0.5`} style={{ fontFamily: 'var(--font-fredoka, Fredoka, sans-serif)' }}>
                      {code}
                    </span>
                    {name && (
                      <span className={`text-[10px] sm:text-xs truncate w-full px-1 text-center mt-1 sm:mt-1.5 opacity-90 font-medium ${textColor} transition-transform group-hover:translate-y-0.5`}>
                        {name}
                      </span>
                    )}
                  </button>
                );
              });
            })()}
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{BRANDS[brand]?.label} Marker Settings</DialogTitle>
            <DialogDescription>
              Choose which marker codes to display for your {BRANDS[brand]?.label} markers.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 py-4">
            <button
              onClick={() => {
                setCodeType('new');
                setIsDialogOpen(false);
              }}
              className={`flex-1 flex flex-col items-start p-4 py-3 px-4 rounded-xl border-2 transition-all text-left ${codeType === 'new'
                ? 'border-transparent bg-brand-gradient text-white shadow-md'
                : 'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300'
                }`}
            >
              <div className="font-semibold mb-1">New Codes</div>
              <div className="text-xs opacity-70">Latest numbering</div>
            </button>
            <button
              onClick={() => {
                setCodeType('old');
                setIsDialogOpen(false);
              }}
              className={`flex-1 flex flex-col items-start p-4 py-3 px-4 rounded-xl border-2 transition-all text-left ${codeType === 'old'
                ? 'border-transparent bg-brand-gradient text-white shadow-md'
                : 'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300'
                }`}
            >
              <div className="font-semibold mb-1">Old Codes</div>
              <div className="text-xs opacity-70">Original numbering</div>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
