import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { Camera, Play, Square, RotateCcw } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface WebcamCaptureProps {
  onCapture?: (imageSrc: string) => void;
  isRecording: boolean;
  onToggleRecording: () => void;
  className?: string;
}

export const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  onCapture,
  isRecording,
  onToggleRecording,
  className = '',
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode,
  };

  const handleCapture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc && onCapture) {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  return (
    <GlassCard className={`${className}`} hover={false}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>Live Camera Feed</span>
          </h3>
          <div className="flex items-center space-x-2">
            {isRecording && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-white/80">Recording</span>
              </div>
            )}
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden bg-black/20">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <LoadingSpinner size="lg" />
            </div>
          )}
          
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMedia={() => setIsLoading(false)}
            onUserMediaError={() => setIsLoading(false)}
            className="w-full h-auto rounded-lg"
          />

          {/* Overlay controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
              <button
                onClick={handleCapture}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                title="Take Screenshot"
              >
                <Camera className="w-5 h-5 text-white" />
              </button>

              <motion.button
                onClick={onToggleRecording}
                className={`p-3 rounded-full transition-colors ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                whileTap={{ scale: 0.95 }}
                title={isRecording ? 'Stop Recording' : 'Start Recording'}
              >
                {isRecording ? (
                  <Square className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </motion.button>

              <button
                onClick={toggleCamera}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                title="Switch Camera"
              >
                <RotateCcw className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-sm text-white/60 text-center">
          {isRecording 
            ? 'Facial recognition is active. Position your face in the camera.'
            : 'Click the play button to start facial recognition.'
          }
        </div>
      </div>
    </GlassCard>
  );
};