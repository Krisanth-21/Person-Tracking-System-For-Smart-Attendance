import axios from 'axios';
import { ApiResponse, Student, AttendanceRecord, AttendanceStats } from '../types';

const API_BASE = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const apiEndpoints = {
  // Student endpoints
  registerStudent: (data: FormData) => 
    api.post<ApiResponse<Student>>('/register', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  getStudents: () => api.get<ApiResponse<Student[]>>('/students'),
  getStudent: (id: string) => api.get<ApiResponse<Student>>(`/students/${id}`),
  updateStudent: (id: string, data: Partial<Student>) => 
    api.put<ApiResponse<Student>>(`/students/${id}`, data),
  deleteStudent: (id: string) => api.delete<ApiResponse<void>>(`/students/${id}`),

  // Attendance endpoints
  getAttendanceRecords: (params?: { startDate?: string; endDate?: string }) =>
    api.get<ApiResponse<AttendanceRecord[]>>('/attendance', { params }),
  markAttendance: (studentId: string, method: 'facial' | 'barcode') =>
    api.post<ApiResponse<AttendanceRecord>>('/attendance', { studentId, method }),
  getAttendanceStats: () => api.get<ApiResponse<AttendanceStats>>('/attendance/stats'),

  // Reports endpoints
  downloadAttendance: (params: { startDate: string; endDate: string; format: string }) =>
    api.get('/download_attendance', { 
      params,
      responseType: 'blob'
    }),
  getAttendanceReport: (params: { startDate: string; endDate: string }) =>
    api.get<ApiResponse<any[]>>('/reports/attendance', { params }),

  // System endpoints
  getSystemHealth: () => api.get<ApiResponse<{ status: string }>>('/health'),
};

export default api;