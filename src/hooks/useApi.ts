import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiEndpoints } from '../utils/api';
import { useAppContext } from '../contexts/AppContext';
import toast from 'react-hot-toast';

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: () => apiEndpoints.getStudents().then(res => res.data.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAttendanceStats = () => {
  return useQuery({
    queryKey: ['attendance-stats'],
    queryFn: () => apiEndpoints.getAttendanceStats().then(res => res.data.data),
    refetchInterval: 30000, // Refresh every 30 seconds
  });
};

export const useAttendanceRecords = (params?: { startDate?: string; endDate?: string }) => {
  return useQuery({
    queryKey: ['attendance-records', params],
    queryFn: () => apiEndpoints.getAttendanceRecords(params).then(res => res.data.data),
  });
};

export const useRegisterStudent = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useAppContext();

  return useMutation({
    mutationFn: apiEndpoints.registerStudent,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-stats'] });
      addNotification({
        type: 'success',
        title: 'Student Registered',
        message: `${response.data.data.fullName} has been successfully registered.`,
      });
      toast.success('Student registered successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to register student';
      addNotification({
        type: 'error',
        title: 'Registration Failed',
        message,
      });
      toast.error(message);
    },
  });
};

export const useMarkAttendance = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useAppContext();

  return useMutation({
    mutationFn: ({ studentId, method }: { studentId: string; method: 'facial' | 'barcode' }) =>
      apiEndpoints.markAttendance(studentId, method),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['attendance-records'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-stats'] });
      addNotification({
        type: 'success',
        title: 'Attendance Marked',
        message: `Attendance marked for ${response.data.data.student.fullName}`,
      });
      toast.success('Attendance marked successfully!');
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to mark attendance';
      addNotification({
        type: 'error',
        title: 'Attendance Failed',
        message,
      });
      toast.error(message);
    },
  });
};

export const useSystemHealth = () => {
  return useQuery({
    queryKey: ['system-health'],
    queryFn: () => apiEndpoints.getSystemHealth().then(res => res.data.data),
    refetchInterval: 60000, // Check every minute
  });
};