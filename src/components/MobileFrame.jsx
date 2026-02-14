import React, { useRef, useEffect } from 'react';
import { X, Play, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MobileFrame = ({ isOpen, onClose, videoUrl, title = "App Demo" }) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    if (isOpen && videoRef.current) {
        setLoading(true);
      videoRef.current.play().catch(e => console.log('Autoplay prevented:', e));
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isOpen]);

  const handleLoadedData = () => {
      setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="relative max-w-[350px] w-full aspect-[9/19] rounded-[3rem] border-8 border-gray-900 bg-black shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          style={{boxShadow: '0 0 50px rgba(139, 92, 246, 0.3)'}}
        >
          {/* Dynamic Island / Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20 flex justify-center items-center">
             <div className="w-16 h-1 bg-gray-800 rounded-full"></div>
          </div>

          {/* Close Button */}
           <button 
            onClick={onClose}
            className="absolute top-10 right-4 z-30 p-2 bg-black/50 text-white rounded-full hover:bg-red-500/80 transition-colors backdrop-blur-sm"
          >
            <X size={20} />
          </button>

          {/* Screen Content */}
          <div className="relative w-full h-full bg-gray-900">
             {/* Loading State */}
             {loading && (
                 <div className="absolute inset-0 flex items-center justify-center z-10 text-purple-500">
                     <Loader2 className="animate-spin w-10 h-10" />
                 </div>
             )}
             
            {videoUrl ? (
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                controls={false}
                onLoadedData={handleLoadedData}
              />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
                    <div className="bg-gray-800/50 p-4 rounded-full mb-4">
                        <Play className="w-8 h-8 opacity-50" />
                    </div>
                    <p className="text-sm">No demo video available for</p>
                    <p className="font-bold text-white mt-1">{title}</p>
                </div>
            )}
            
            {/* Phone Overlay Gradient for realism */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-purple-500/10 to-transparent mix-blend-overlay"></div>
          </div>
        </motion.div>
        
        {/* Helper Text */}
        <motion.div 
            initial={{ opacity: 0, y: 10}}
            animate={{ opacity: 1, y: 0}}
            transition={{ delay: 0.3 }}
            className="absolute bottom-10 left-0 right-0 text-center text-white/50 text-sm pointer-events-none"
        >
            Click outside to close
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileFrame;
