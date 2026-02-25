import { motion } from 'motion/react';
import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';

interface ShortcutCardProps {
  id: string;
  title: string;
  url: string;
  accentColor: string;
  onEdit: (id: string, title: string, url: string) => void;
  onDelete: (id: string) => void;
}

export function ShortcutCard({ id, title, url, accentColor, onEdit, onDelete }: ShortcutCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editUrl, setEditUrl] = useState(url);
  const [showActions, setShowActions] = useState(false);

  const getFaviconUrl = (websiteUrl: string) => {
    try {
      const domain = new URL(websiteUrl).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return `https://www.google.com/s2/favicons?domain=${websiteUrl}&sz=64`;
    }
  };

  const handleSave = () => {
    if (editTitle.trim() && editUrl.trim()) {
      onEdit(id, editTitle, editUrl);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditUrl(url);
    setIsEditing(false);
  };

  const handleClick = () => {
    if (!isEditing) {
      window.open(url, '_blank');
    }
  };

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <motion.div
        className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 cursor-pointer overflow-hidden"
        onClick={handleClick}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)`,
        }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${accentColor}30, transparent 70%)`,
            filter: 'blur(20px)',
          }}
        />

        {/* Accent border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: `inset 0 0 0 1px ${accentColor}40`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          {!isEditing ? (
            <>
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
                  boxShadow: `0 4px 12px ${accentColor}30`,
                }}
              >
                <img
                  src={getFaviconUrl(url)}
                  alt={title}
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"%3E%3Ccircle cx="12" cy="12" r="10"%3E%3C/circle%3E%3Cpath d="M12 8v4M12 16h.01"%3E%3C/path%3E%3C/svg%3E';
                  }}
                />
              </div>
              <h3 className="text-white text-center min-h-[24px]">{title}</h3>
            </>
          ) : (
            <div className="w-full space-y-3" onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                placeholder="Title"
                autoFocus
              />
              <input
                type="text"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                placeholder="URL"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white rounded-lg px-3 py-2 transition-colors"
                >
                  Save
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
        </div>
      </motion.div>

      {/* Action buttons */}
      {!isEditing && (
        <motion.div
          className="absolute top-3 right-3 flex gap-2 z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: showActions ? 1 : 0, scale: showActions ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-xl rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-2 bg-white/20 hover:bg-red-500/50 backdrop-blur-xl rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}