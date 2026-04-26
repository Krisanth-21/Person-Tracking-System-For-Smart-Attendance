export interface Student {
  id: string;
  registerNumber: string;
  fullName: string;
  email?: string;
  phone?: string;
  department?: string;
  photoUrl?: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  student: Student;
  timestamp: string;
  method: 'facial' | 'barcode';
  status: 'present' | 'absent' | 'late';
}

export interface AttendanceStats {
  totalStudents: number;
  todayPresent: number;
  todayAbsent: number;
  attendanceRate: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface AttendanceReport {
  date: string;
  present: number;
  absent: number;
  total: number;
}