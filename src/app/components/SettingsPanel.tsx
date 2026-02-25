import { motion, AnimatePresence } from 'motion/react';
import { X, Settings, Upload, Palette, Film, Sparkles } from 'lucide-react';
import { useRef } from 'react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  onAccentColorChange: (color: string) => void;
  videoEnabled: boolean;
  onVideoEnabledChange: (enabled: boolean) => void;
  overlayOpacity: number;
  onOverlayOpacityChange: (opacity: number) => void;
  animationsEnabled: boolean;
  onAnimationsEnabledChange: (enabled: boolean) => void;
  onVideoUpload: (file: File) => void;
}

const PRESET_COLORS = [
  { name: 'Purple', value: '#a855f7' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Green', value: '#10b981' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Indigo', value: '#6366f1' },
];

export function SettingsPanel({
  isOpen,
  onClose,
  accentColor,
  onAccentColorChange,
  videoEnabled,
  onVideoEnabledChange,
  overlayOpacity,
  onOverlayOpacityChange,
  animationsEnabled,
  onAnimationsEnabledChange,
  onVideoUpload,
}: SettingsPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onVideoUpload(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-black/80 backdrop-blur-2xl border-l border-white/10 z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}10)`,
                    }}
                  >
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl text-white">Settings</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Accent Color Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="w-5 h-5 text-white/70" />
                  <h3 className="text-lg text-white">Accent Color</h3>
                </div>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => onAccentColorChange(color.value)}
                      className="relative aspect-square rounded-xl transition-all duration-200 hover:scale-110"
                      style={{
                        background: color.value,
                        boxShadow:
                          accentColor === color.value
                            ? `0 0 0 3px rgba(255, 255, 255, 0.3), 0 4px 12px ${color.value}60`
                            : `0 2px 8px ${color.value}40`,
                      }}
                    >
                      {accentColor === color.value && (
                        <motion.div
                          className="absolute inset-0 rounded-xl border-2 border-white"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => onAccentColorChange(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={accentColor}
                    onChange={(e) => onAccentColorChange(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/20"
                    placeholder="#000000"
                  />
                </div>
              </div>

              {/* Video Background Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Film className="w-5 h-5 text-white/70" />
                  <h3 className="text-lg text-white">Video Background</h3>
                </div>
                <div className="space-y-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Video
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-white">Enable Video</span>
                    <button
                      onClick={() => onVideoEnabledChange(!videoEnabled)}
                      className={`relative w-14 h-8 rounded-full transition-colors ${
                        videoEnabled ? 'bg-opacity-100' : 'bg-white/20'
                      }`}
                      style={{
                        backgroundColor: videoEnabled ? accentColor : undefined,
                      }}
                    >
                      <motion.div
                        className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full"
                        animate={{ x: videoEnabled ? 24 : 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>

                  {videoEnabled && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="p-4 bg-white/5 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm">Overlay Opacity</span>
                          <span className="text-white/70 text-sm">
                            {Math.round(overlayOpacity * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={overlayOpacity}
                          onChange={(e) => onOverlayOpacityChange(parseFloat(e.target.value))}
                          className="w-full accent-current"
                          style={{ accentColor }}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Animations Section */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-white/70" />
                  <h3 className="text-lg text-white">Animations</h3>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <span className="text-white">Enable Animations</span>
                  <button
                    onClick={() => onAnimationsEnabledChange(!animationsEnabled)}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      animationsEnabled ? 'bg-opacity-100' : 'bg-white/20'
                    }`}
                    style={{
                      backgroundColor: animationsEnabled ? accentColor : undefined,
                    }}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full"
                      animate={{ x: animationsEnabled ? 24 : 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <p className="text-white/70 text-sm mb-3">Accent Color Preview</p>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded-lg text-white transition-all hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
                      boxShadow: `0 4px 12px ${accentColor}40`,
                    }}
                  >
                    Button
                  </button>
                  <div
                    className="flex-1 h-10 rounded-lg"
                    style={{
                      background: `linear-gradient(90deg, ${accentColor}20, ${accentColor}40, ${accentColor}20)`,
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
