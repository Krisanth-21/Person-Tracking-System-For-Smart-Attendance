import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { UserPlus, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/ui/GlassCard';
import { FileUpload } from '../components/features/FileUpload';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useRegisterStudent } from '../hooks/useApi';

interface StudentFormData {
  registerNumber: string;
  fullName: string;
  email?: string;
  phone?: string;
  department?: string;
}

const schema = yup.object({
  registerNumber: yup
    .string()
    .required('Register number is required')
    .min(3, 'Register number must be at least 3 characters'),
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters'),
  email: yup.string().email('Invalid email format'),
  phone: yup
    .string()
    .matches(/^\d{10,15}$/, 'Phone number must be 10-15 digits'),
  department: yup.string(),
});

const StudentRegistration: React.FC = () => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const registerStudent = useRegisterStudent();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<StudentFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: StudentFormData) => {
    const formData = new FormData();
    formData.append('registerNumber', data.registerNumber);
    formData.append('fullName', data.fullName);
    if (data.email) formData.append('email', data.email);
    if (data.phone) formData.append('phone', data.phone);
    if (data.department) formData.append('department', data.department);
    if (photoFile) formData.append('photo', photoFile);

    try {
      await registerStudent.mutateAsync(formData);
      reset();
      setPhotoFile(null);
      setPhotoPreview('');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handlePhotoSelect = (file: File) => {
    setPhotoFile(file);
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  const handlePhotoClear = () => {
    setPhotoFile(null);
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
      setPhotoPreview('');
    }
  };

  const departments = [
    'Computer Science',
    'Information Technology',
    'Electronics',
    'Mechanical',
    'Civil',
    'Electrical',
    'Chemical',
    'Other',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
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
              <UserPlus className="w-8 h-8" />
              <span>Student Registration</span>
            </h1>
            <p className="text-white/70 mt-1">Register a new student in the system</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard>
              <h2 className="text-xl font-semibold text-white mb-6">
                Student Information
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Register Number */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Register Number *
                  </label>
                  <input
                    {...register('registerNumber')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter student register number"
                  />
                  {errors.registerNumber && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.registerNumber.message}
                    </p>
                  )}
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Full Name *
                  </label>
                  <input
                    {...register('fullName')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter student full name"
                  />
                  {errors.fullName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Email Address
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register('phone')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">
                    Department
                  </label>
                  <select
                    {...register('department')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  >
                    <option value="" className="bg-gray-800">
                      Select Department
                    </option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept} className="bg-gray-800">
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || registerStudent.isPending}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-200"
                  whileTap={{ scale: 0.98 }}
                >
                  {registerStudent.isPending ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Register Student</span>
                    </>
                  )}
                </motion.button>
              </form>
            </GlassCard>
          </motion.div>

          {/* Photo Upload */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard>
              <h2 className="text-xl font-semibold text-white mb-6">
                Student Photo
              </h2>
              
              <FileUpload
                onFileSelect={handlePhotoSelect}
                preview={photoPreview}
                onClear={handlePhotoClear}
              />

              <div className="mt-4 text-sm text-white/70">
                <ul className="space-y-1">
                  <li>• Upload a clear photo of the student</li>
                  <li>• Recommended size: 400x400 pixels</li>
                  <li>• Supported formats: PNG, JPG, JPEG</li>
                  <li>• Maximum file size: 5MB</li>
                </ul>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;