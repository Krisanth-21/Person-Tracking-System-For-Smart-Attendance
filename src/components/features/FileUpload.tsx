import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  preview?: string;
  onClear?: () => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  preview,
  onClear,
  accept = { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] },
  maxSize = 5 * 1024 * 1024, // 5MB
  className = '',
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  return (
    <div className={className}>
      {!preview ? (
        <motion.div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
            ${
              isDragActive
                ? 'border-blue-400 bg-blue-50/10'
                : 'border-white/30 hover:border-white/50 bg-white/5 hover:bg-white/10'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-white text-lg mb-2">Drop the file here...</p>
          ) : (
            <div>
              <p className="text-white text-lg mb-2">
                Drag & drop a photo here, or click to select
              </p>
              <p className="text-white/60 text-sm">
                Supports: PNG, JPG, JPEG, GIF (max 5MB)
              </p>
            </div>
          )}
        </motion.div>
      ) : (
        <div className="relative">
          <div className="relative rounded-xl overflow-hidden bg-white/10 border border-white/20">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-white">
                  <ImageIcon className="w-4 h-4" />
                  <span className="text-sm">Image uploaded</span>
                </div>
                {onClear && (
                  <motion.button
                    onClick={onClear}
                    className="p-2 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4 text-white" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {fileRejections.length > 0 && (
        <div className="mt-2 text-red-400 text-sm">
          {fileRejections[0].errors[0].message}
        </div>
      )}
    </div>
  );
};