import { motion } from 'motion/react';
import { useEffect, useState, useMemo } from 'react';

interface GreetingSectionProps {
  accentColor: string;
}

export function GreetingSection({ accentColor }: GreetingSectionProps) {
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hour = time.getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, [time]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  // Memoize the gradient style to prevent recalculation on every render
  const gradientStyle = useMemo(() => ({
    backgroundImage: `linear-gradient(90deg, ${accentColor} 0%, #ffffff 50%, ${accentColor} 100%)`,
    backgroundSize: '200% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'gradient-shift 6s ease infinite',
  }), [accentColor]);

  if (!mounted) {
    return (
      <div className="text-center space-y-2 mb-12">
        <div className="h-20 w-64 mx-auto bg-white/5 rounded-lg animate-pulse" />
        <div className="h-8 w-48 mx-auto bg-white/5 rounded-lg animate-pulse" />
        <div className="h-5 w-40 mx-auto bg-white/5 rounded-lg animate-pulse" />
      </div>
    );
  }

  return (
    <motion.div
      className="text-center space-y-2 mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
      <h1
        className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
        style={gradientStyle}
      >
        {formatTime(time)}
      </h1>
      <p className="text-lg font-semibold sm:text-xl text-white/70" style={gradientStyle}>
        {greeting}, Kashi
      </p>
      <p className="text-s font-semibold sm:text-sm text-white">
        {formatDate(time)}
      </p>
    </motion.div>
  );
}
