import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp, 
  Calendar, 
  Clock,
  BarChart3,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/ui/GlassCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useAttendanceStats } from '../hooks/useApi';

const Dashboard: React.FC = () => {
  const { data: stats, isLoading } = useAttendanceStats();

  const quickActions = [
    {
      title: 'Register Student',
      description: 'Add new student to the system',
      icon: Plus,
      path: '/register',
      color: 'from-green-400 to-green-600',
    },
    {
      title: 'Take Attendance',
      description: 'Mark attendance using camera or barcode',
      icon: UserCheck,
      path: '/attendance',
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'View Reports',
      description: 'Download and analyze attendance data',
      icon: BarChart3,
      path: '/reports',
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Admin Panel',
      description: 'Manage system settings and users',
      icon: Clock,
      path: '/admin',
      color: 'from-orange-400 to-orange-600',
    },
  ];

  const statCards = [
    {
      title: 'Total Students',
      value: stats?.totalStudents || 0,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      title: 'Present Today',
      value: stats?.todayPresent || 0,
      icon: UserCheck,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
    {
      title: 'Absent Today',
      value: stats?.todayAbsent || 0,
      icon: UserX,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
    },
    {
      title: 'Attendance Rate',
      value: `${stats?.attendanceRate || 0}%`,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Smart Attendance System
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Modern facial recognition and barcode-based attendance management
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="text-center">
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <LoadingSpinner />
                    </div>
                  ) : (
                    <>
                      <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/70">{stat.title}</div>
                    </>
                  )}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Link to={action.path}>
                    <GlassCard clickable className="h-full group">
                      <div className="text-center space-y-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            {action.title}
                          </h3>
                          <p className="text-sm text-white/70">{action.description}</p>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Today's Activity Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Today's Summary</span>
              </h2>
              <div className="text-sm text-white/70">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">
                  {stats?.todayPresent || 0}
                </div>
                <div className="text-white/70">Students Present</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  {stats?.attendanceRate || 0}%
                </div>
                <div className="text-white/70">Attendance Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">
                  {stats?.totalStudents || 0}
                </div>
                <div className="text-white/70">Total Enrolled</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;