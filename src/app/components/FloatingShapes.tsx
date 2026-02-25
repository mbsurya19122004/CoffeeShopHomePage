import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function FloatingShapes() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const shapes = [
    {
      id: 1,
      size: 400,
      x: '10%',
      y: '10%',
      gradient: 'from-purple-500/20 via-pink-500/20 to-transparent',
      duration: 20,
      delay: 0,
    },
    {
      id: 2,
      size: 500,
      x: '70%',
      y: '20%',
      gradient: 'from-blue-500/15 via-cyan-500/15 to-transparent',
      duration: 25,
      delay: 2,
    },
    {
      id: 3,
      size: 350,
      x: '50%',
      y: '60%',
      gradient: 'from-indigo-500/20 via-purple-500/20 to-transparent',
      duration: 22,
      delay: 1,
    },
    {
      id: 4,
      size: 450,
      x: '20%',
      y: '70%',
      gradient: 'from-violet-500/15 via-fuchsia-500/15 to-transparent',
      duration: 28,
      delay: 3,
    },
    {
      id: 5,
      size: 300,
      x: '80%',
      y: '75%',
      gradient: 'from-cyan-500/20 via-blue-500/20 to-transparent',
      duration: 18,
      delay: 1.5,
    },
    {
      id: 6,
      size: 380,
      x: '40%',
      y: '30%',
      gradient: 'from-rose-500/15 via-pink-500/15 to-transparent',
      duration: 24,
      delay: 2.5,
    },
    {
      id: 7,
      size: 320,
      x: '85%',
      y: '45%',
      gradient: 'from-teal-500/18 via-emerald-500/18 to-transparent',
      duration: 21,
      delay: 0.5,
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`absolute rounded-full bg-gradient-to-br ${shape.gradient} blur-3xl`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
          }}
          transition={{
            opacity: { duration: 1, delay: shape.delay },
            scale: { duration: 1, delay: shape.delay },
            x: {
              duration: shape.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: shape.delay,
            },
            y: {
              duration: shape.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: shape.delay,
            },
          }}
        />
      ))}

      {/* Parallax sphere with glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          x: mousePosition.x,
          y: mousePosition.y,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, rgba(139, 92, 246, 0.1) 30%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 30,
        }}
      />

      {/* Additional ambient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />
    </div>
  );
}