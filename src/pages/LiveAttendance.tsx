import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, QrCode, ArrowLeft, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/ui/GlassCard';
import { WebcamCapture } from '../components/features/WebcamCapture';
import { BarcodeScanner } from '../components/features/BarcodeScanner';
import { useAttendanceRecords, useMarkAttendance } from '../hooks/useApi';
import { format } from 'date-fns';

const LiveAttendance: React.FC = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScannerActive, setIsScannerActive] = useState(false);
  const markAttendance = useMarkAttendance();

  const { data: recentAttendance = [] } = useAttendanceRecords({
    startDate: new Date().toISOString().split('T')[0],
  });

  const handleCameraCapture = async (imageSrc: string) => {
    // In a real implementation, you'd send the image to your facial recognition API
    console.log('Captured image:', imageSrc);
    // Mock student ID for demonstration
    const mockStudentId = 'student_123';
    await markAttendance.mutateAsync({ studentId: mockStudentId, method: 'facial' });
  };

  const handleBarcodeScanned = async (code: string) => {
    console.log('Scanned barcode:', code);
    // Extract student ID from barcode or look up by barcode
    const studentId = code; // Assuming the barcode contains the student ID
    await markAttendance.mutateAsync({ studentId, method: 'barcode' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-4"
        >
          <Link
            to="/"
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
              <Camera className="w-8 h-8" />
              <span>Live Attendance</span>
            </h1>
            <p className="text-white/70 mt-1">
              Mark attendance using facial recognition or barcode scanning
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Camera Feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="xl:col-span-1"
          >
            <WebcamCapture
              onCapture={handleCameraCapture}
              isRecording={isCameraActive}
              onToggleRecording={() => setIsCameraActive(!isCameraActive)}
            />
          </motion.div>

          {/* Barcode Scanner */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="xl:col-span-1"
          >
            <BarcodeScanner
              onScan={handleBarcodeScanned}
              isScanning={isScannerActive}
              onToggleScanning={() => setIsScannerActive(!isScannerActive)}
            />
          </motion.div>

          {/* Recent Attendance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="xl:col-span-1"
          >
            <GlassCard className="h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Today's Attendance</span>
                </h3>
                <div className="text-sm text-white/70 flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Live</span>
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentAttendance.length === 0 ? (
                  <div className="text-center text-white/60 py-8">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No attendance records today</p>
                    <p className="text-sm">Start marking attendance above</p>
                  </div>
                ) : (
                  recentAttendance.slice(0, 10).map((record, index) => (
                    <motion.div
                      key={record.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-white">
                            {record.student.fullName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-white text-sm font-medium">
                            {record.student.fullName}
                          </div>
                          <div className="text-white/60 text-xs">
                            {record.student.registerNumber}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white/80 text-xs">
                          {format(new Date(record.timestamp), 'HH:mm')}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          record.method === 'facial'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          {record.method === 'facial' ? 'Face' : 'QR'}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {recentAttendance.length > 10 && (
                <div className="text-center mt-4">
                  <Link
                    to="/reports"
                    className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                  >
                    View all records →
                  </Link>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>

        {/* Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <GlassCard className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <Camera className="w-6 h-6 text-blue-400" />
              <span className="text-white font-medium">Facial Recognition</span>
            </div>
            <div className={`text-sm px-3 py-1 rounded-full inline-block ${
              isCameraActive
                ? 'bg-green-500/20 text-green-400'
                : 'bg-gray-500/20 text-gray-400'
            }`}>
              {isCameraActive ? 'Active' : 'Inactive'}
            </div>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <QrCode className="w-6 h-6 text-green-400" />
              <span className="text-white font-medium">Barcode Scanner</span>
            </div>
            <div className={`text-sm px-3 py-1 rounded-full inline-block ${
              isScannerActive
                ? 'bg-green-500/20 text-green-400'
                : 'bg-gray-500/20 text-gray-400'
            }`}>
              {isScannerActive ? 'Scanning' : 'Ready'}
            </div>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <Users className="w-6 h-6 text-purple-400" />
              <span className="text-white font-medium">Today's Total</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {recentAttendance.length}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default LiveAttendance;