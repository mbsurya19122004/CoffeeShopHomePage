import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Settings } from 'lucide-react';
import { FloatingShapes } from './components/FloatingShapes';
import { VideoBackground } from './components/VideoBackground';
import { GreetingSection } from './components/GreetingSection';
import { SearchBar } from './components/SearchBar';
import { ShortcutCard } from './components/ShortcutCard';
import { AddShortcutCard } from './components/AddShortcutCard';
import { SettingsPanel } from './components/SettingsPanel';

interface Shortcut {
  id: string;
  title: string;
  url: string;
}

function App() {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([
    { id: '1', title: 'GitHub', url: 'https://github.com' },
    { id: '2', title: 'Gmail', url: 'https://mail.google.com' },
    { id: '3', title: 'YouTube', url: 'https://youtube.com' },
    { id: '4', title: 'Twitter', url: 'https://twitter.com' },
    { id: '5', title: 'LinkedIn', url: 'https://linkedin.com' },
    { id: '6', title: 'Reddit', url: 'https://reddit.com' },
  ]);

  const [accentColor, setAccentColor] = useState('#a855f7');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0.7);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchFocused(true);
      }
      // Escape to close settings or unfocus search
      if (e.key === 'Escape') {
        setSettingsOpen(false);
        setSearchFocused(false);
      }
      // Cmd/Ctrl + , to open settings
      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        e.preventDefault();
        setSettingsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Apply accent color to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accentColor);
  }, [accentColor]);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('browserHomepageSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        if (settings.accentColor) setAccentColor(settings.accentColor);
        if (settings.videoEnabled !== undefined) setVideoEnabled(settings.videoEnabled);
        if (settings.overlayOpacity !== undefined) setOverlayOpacity(settings.overlayOpacity);
        if (settings.animationsEnabled !== undefined) setAnimationsEnabled(settings.animationsEnabled);
        if (settings.shortcuts) setShortcuts(settings.shortcuts);
      } catch (e) {
        console.error('Failed to load settings:', e);
      }
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    const settings = {
      accentColor,
      videoEnabled,
      overlayOpacity,
      animationsEnabled,
      shortcuts,
    };
    localStorage.setItem('browserHomepageSettings', JSON.stringify(settings));
  }, [accentColor, videoEnabled, overlayOpacity, animationsEnabled, shortcuts]);

  const handleAddShortcut = (title: string, url: string) => {
    const newShortcut: Shortcut = {
      id: Date.now().toString(),
      title,
      url: url.startsWith('http') ? url : `https://${url}`,
    };
    setShortcuts([...shortcuts, newShortcut]);
  };

  const handleEditShortcut = (id: string, title: string, url: string) => {
    setShortcuts(
      shortcuts.map((s) =>
        s.id === id
          ? { ...s, title, url: url.startsWith('http') ? url : `https://${url}` }
          : s
      )
    );
  };

  const handleDeleteShortcut = (id: string) => {
    setShortcuts(shortcuts.filter((s) => s.id !== id));
  };

  const handleVideoUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setVideoEnabled(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden relative">
      {/* Video Background */}
      <VideoBackground
        videoUrl={videoUrl}
        enabled={videoEnabled}
        overlayOpacity={overlayOpacity}
      />

      {/* Floating 3D Shapes */}
      {animationsEnabled && <FloatingShapes />}

      {/* Settings Button */}
      <motion.button
        className="fixed top-8 right-8 z-30 p-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300"
        onClick={() => setSettingsOpen(true)}
        whileHover={{ scale: 1.05, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        style={{
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px ${accentColor}20`,
        }}
        animate={{
          boxShadow: [
            `0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px ${accentColor}20`,
            `0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px ${accentColor}40, 0 0 20px ${accentColor}20`,
            `0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px ${accentColor}20`,
          ],
        }}
        transition={{
          boxShadow: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <Settings className="w-6 h-6 text-white" />
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 py-16">
        {/* Greeting and Clock */}
        <GreetingSection accentColor={accentColor} />

        {/* Search Bar */}
        <SearchBar accentColor={accentColor} focused={searchFocused} />

        {/* Shortcuts Grid */}
        <motion.div
          className="w-full max-w-6xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
            <div className="flex flex-col items-center justify-center gap-6">

              {/* Shortcuts grid */}
              <div className="
                flex flex-wrap
                justify-around
                w-[70%]
               
              ">
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={shortcut.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + index * 0.05,
                      ease: 'easeOut',
                    }}
                  >
                    <ShortcutCard
                      {...shortcut}
                      accentColor={accentColor}
                      onEdit={handleEditShortcut}
                      onDelete={handleDeleteShortcut}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Add button always below */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + shortcuts.length * 0.05,
                  ease: 'easeOut',
                }}
              >
                <AddShortcutCard
                  accentColor={accentColor}
                  onAdd={handleAddShortcut}
                />
              </motion.div>

            </div>
        </motion.div>


      </div>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        accentColor={accentColor}
        onAccentColorChange={setAccentColor}
        videoEnabled={videoEnabled}
        onVideoEnabledChange={setVideoEnabled}
        overlayOpacity={overlayOpacity}
        onOverlayOpacityChange={setOverlayOpacity}
        animationsEnabled={false}
        onAnimationsEnabledChange={setAnimationsEnabled}
        onVideoUpload={handleVideoUpload}
      />
    </div>
  );
}

export default App;