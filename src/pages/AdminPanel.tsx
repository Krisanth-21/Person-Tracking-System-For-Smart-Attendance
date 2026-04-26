import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Users, 
  Database, 
  ArrowLeft,
  Trash2,
  Edit3,
  Plus,
  Activity,
  Shield,
  Server
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/ui/GlassCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useStudents, useSystemHealth } from '../hooks/useApi';
import { format } from 'date-fns';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'students' | 'system' | 'logs'>('students');
  const { data: students = [], isLoading: studentsLoading } = useStudents();
  const { data: systemHealth, isLoading: systemLoading } = useSystemHealth();

  const tabs = [
    { id: 'students', label: 'Student Management', icon: Users },
    { id: 'system', label: 'System Status', icon: Server },
    { id: 'logs', label: 'Activity Logs', icon: Activity },
  ];

  const mockLogs = [
    { id: '1', action: 'Student registered', user: 'Admin', timestamp: new Date().toISOString(), details: 'John Doe (REG001)' },
    { id: '2', action: 'Attendance marked', user: 'System', timestamp: new Date(Date.now() - 3600000).toISOString(), details: 'Facial recognition' },
    { id: '3', action: 'Report exported', user: 'Admin', timestamp: new Date(Date.now() - 7200000).toISOString(), details: 'Monthly report CSV' },
  ];

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
              <Settings className="w-8 h-8" />
              <span>Admin Panel</span>
            </h1>
            <p className="text-white/70 mt-1">
              Manage students, monitor system health, and view activity logs
            </p>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard className="p-4">
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Students Tab */}
          {activeTab === 'students' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">
                  Student Management ({students.length})
                </h2>
                <Link to="/register">
                  <motion.button
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200"
                    whileTap={{ scale: 0.98 }}
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Student</span>
                  </motion.button>
                </Link>
              </div>

              <GlassCard>
                {studentsLoading ? (
                  <div className="flex justify-center py-12">
                    <LoadingSpinner size="lg" />
                  </div>
                ) : students.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">No students registered yet</p>
                    <Link
                      to="/register"
                      className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
                    >
                      Register your first student →
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left py-3 px-4 text-white/80 font-medium">Student</th>
                          <th className="text-left py-3 px-4 text-white/80 font-medium">Register No.</th>
                          <th className="text-left py-3 px-4 text-white/80 font-medium">Department</th>
                          <th className="text-left py-3 px-4 text-white/80 font-medium">Registered</th>
                          <th className="text-left py-3 px-4 text-white/80 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student, index) => (
                          <motion.tr
                            key={student.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="border-b border-white/10 hover:bg-white/5 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                                  {student.photoUrl ? (
                                    <img
                                      src={student.photoUrl}
                                      alt={student.fullName}
                                      className="w-full h-full object-cover rounded-full"
                                    />
                                  ) : (
                                    <span className="text-sm font-semibold text-white">
                                      {student.fullName.charAt(0)}
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <div className="text-white font-medium">{student.fullName}</div>
                                  {student.email && (
                                    <div className="text-white/60 text-sm">{student.email}</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-white/80">{student.registerNumber}</td>
                            <td className="py-3 px-4 text-white/80">{student.department || 'N/A'}</td>
                            <td className="py-3 px-4 text-white/80">
                              {format(new Date(student.createdAt), 'MMM dd, yyyy')}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          )}

          {/* System Status Tab */}
          {activeTab === 'system' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-white">System Health & Status</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Database className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-lg font-semibold text-white mb-1">Database</div>
                  <div className="text-sm text-green-400">Operational</div>
                </GlassCard>

                <GlassCard className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-lg font-semibold text-white mb-1">API Status</div>
                  <div className="text-sm text-blue-400">Running</div>
                </GlassCard>

                <GlassCard className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-lg font-semibold text-white mb-1">Security</div>
                  <div className="text-sm text-purple-400">Protected</div>
                </GlassCard>
              </div>

              <GlassCard>
                <h3 className="text-lg font-semibold text-white mb-4">System Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">System Version:</span>
                      <span className="text-white">v2.1.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Last Update:</span>
                      <span className="text-white">Jan 15, 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Uptime:</span>
                      <span className="text-white">15 days, 4 hours</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">Total Students:</span>
                      <span className="text-white">{students.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Active Sessions:</span>
                      <span className="text-white">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Storage Used:</span>
                      <span className="text-white">2.4 GB</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* Activity Logs Tab */}
          {activeTab === 'logs' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-white">Recent Activity Logs</h2>

              <GlassCard>
                <div className="space-y-4">
                  {mockLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                          <Activity className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{log.action}</div>
                          <div className="text-white/60 text-sm">{log.details}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white/80 text-sm">{log.user}</div>
                        <div className="text-white/60 text-xs">
                          {format(new Date(log.timestamp), 'MMM dd, HH:mm')}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;