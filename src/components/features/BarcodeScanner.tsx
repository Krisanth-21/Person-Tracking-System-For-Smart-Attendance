import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Upload, Scan } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface BarcodeScannerProps {
  onScan?: (code: string) => void;
  isScanning: boolean;
  onToggleScanning: () => void;
  className?: string;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onScan,
  isScanning,
  onToggleScanning,
  className = '',
}) => {
  const [lastScannedCode, setLastScannedCode] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real implementation, you'd process the image to extract barcode
      const mockBarcode = `SCAN_${Date.now()}`;
      setLastScannedCode(mockBarcode);
      if (onScan) {
        onScan(mockBarcode);
      }
    }
  };

  const handleManualEntry = () => {
    const code = prompt('Enter barcode manually:');
    if (code) {
      setLastScannedCode(code);
      if (onScan) {
        onScan(code);
      }
    }
  };

  return (
    <GlassCard className={`${className}`} hover={false}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <QrCode className="w-5 h-5" />
            <span>Barcode Scanner</span>
          </h3>
          {isScanning && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-white/80">Scanning</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Scanner Display */}
          <div className="relative h-64 bg-black/30 rounded-lg border-2 border-dashed border-white/30 flex items-center justify-center">
            {isScanning ? (
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-32 h-32 border-4 border-white/50 rounded-lg mx-auto mb-4 relative"
                >
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-green-400"></div>
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-green-400"></div>
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-green-400"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-green-400"></div>
                </motion.div>
                <p className="text-white/80">Scanning for barcodes...</p>
              </div>
            ) : (
              <div className="text-center text-white/60">
                <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Scanner ready</p>
                <p className="text-sm">Click start to begin scanning</p>
              </div>
            )}
          </div>

          {/* Control Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <motion.button
              onClick={onToggleScanning}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                isScanning
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <Scan className="w-4 h-4" />
              <span>{isScanning ? 'Stop' : 'Start'} Scan</span>
            </motion.button>

            <motion.button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              <Upload className="w-4 h-4" />
              <span>Upload Image</span>
            </motion.button>

            <motion.button
              onClick={handleManualEntry}
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              <span>Manual Entry</span>
            </motion.button>
          </div>

          {/* Last Scanned */}
          {lastScannedCode && (
            <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-3">
              <div className="text-sm text-white/80 mb-1">Last Scanned:</div>
              <div className="font-mono text-green-400 font-semibold">{lastScannedCode}</div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    </GlassCard>
  );
};