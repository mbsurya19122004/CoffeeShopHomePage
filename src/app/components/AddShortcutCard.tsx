import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface AddShortcutCardProps {
  accentColor: string;
  onAdd: (title: string, url: string) => void;
}

export function AddShortcutCard({ accentColor, onAdd }: AddShortcutCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSave = () => {
    if (title.trim() && url.trim()) {
      onAdd(title, url);
      setTitle('');
      setUrl('');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setUrl('');
    setIsAdding(false);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.div
        className="bg-white/5 backdrop-blur-xl border border-white/10 border-dashed rounded-2xl p-1 cursor-pointer overflow-hidden"
        onClick={() => !isAdding && setIsAdding(true)}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1)`,
        }}
      >
        {!isAdding ? (
          <div className="flex flex-col items-center gap-4">
            
              <Plus className="w-8 h-8 text-white/60" />
           
          </div>
        ) : (
          <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              placeholder="Title"
              autoFocus
            />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
              placeholder="URL (e.g., https://example.com)"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white rounded-lg px-3 py-2 transition-colors"
              >
                Add
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 py-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
