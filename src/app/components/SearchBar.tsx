import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  accentColor: string;
  focused?: boolean;
}

export function SearchBar({ accentColor, focused = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      setQuery('');
    }
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
    >
      <form onSubmit={handleSearch} className="relative">
        <motion.div
          className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
          animate={{
            borderColor: isFocused ? `${accentColor}40` : 'rgba(255, 255, 255, 0.1)',
            boxShadow: isFocused
              ? `0 0 0 1px ${accentColor}40, 0 8px 32px rgba(0, 0, 0, 0.2)`
              : '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center px-6 py-4">
            <Search
              className="w-5 h-5 mr-4 transition-colors duration-200"
              style={{ color: isFocused ? accentColor : 'rgba(255, 255, 255, 0.5)' }}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search the web..."
              className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none"
            />
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}