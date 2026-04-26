import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Search, 
  Calendar, 
  Filter, 
  ArrowLeft,
  TrendingUp,
  Users,
  Clock,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/ui/GlassCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { useAttendanceRecords } from '../hooks/useApi';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Reports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('csv');

  const { data: attendanceRecords = [], isLoading } = useAttendanceRecords({
    startDate,
    endDate,
  });

  // Mock chart data (replace with real data processing)
  const dailyStats = [
    { date: '2024-01-15', present: 45, absent: 5 },
    { date: '2024-01-16', present: 48, absent: 2 },
    { date: '2024-01-17', present: 42, absent: 8 },
    { date: '2024-01-18', present: 47, absent: 3 },
    { date: '2024-01-19', present: 44, absent: 6 },
  ];

  const monthlyTrends = [
    { month: 'Oct', rate: 88 },
    { month: 'Nov', rate: 92 },
    { month: 'Dec', rate: 85 },
    { month: 'Jan', rate: 94 },
  ];

  const filteredRecords = attendanceRecords.filter((record) =>
    record.student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.student.registerNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    // Mock export functionality
    const data = filteredRecords.map(record => ({
      'Register Number': record.student.registerNumber,
      'Student Name': record.student.fullName,
      'Date': format(new Date(record.timestamp), 'yyyy-MM-dd'),
      'Time': format(new Date(record.timestamp), 'HH:mm:ss'),
      'Method': record.method,
      'Status': record.status,
    }));

    const csvContent = [
      Object.keys(data[0] || {}).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance-report-${new Date().toISOString().split('T')[0]}.${selectedFormat}`;
    link.click();
    URL.revokeObjectURL(url);
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
              <FileText className="w-8 h-8" />
              <span>Attendance Reports</span>
            </h1>
            <p className="text-white/70 mt-1">
              View, analyze, and export attendance data
            </p>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <GlassCard className="text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">
              {filteredRecords.length}
            </div>
            <div className="text-sm text-white/70">Total Records</div>
          </GlassCard>

          <GlassCard className="text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">94%</div>
            <div className="text-sm text-white/70">Average Rate</div>
          </GlassCard>

          <GlassCard className="text-center">
            <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">24</div>
            <div className="text-sm text-white/70">Days Tracked</div>
          </GlassCard>

          <GlassCard className="text-center">
            <BarChart3 className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white mb-1">89%</div>
            <div className="text-sm text-white/70">This Month</div>
          </GlassCard>
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Daily Attendance</span>
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="present" fill="#3B82F6" />
                    <Bar dataKey="absent" fill="#EF4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Monthly Trends</span>
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Filters and Export */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Filter className="w-5 h-5" />
                <span>Filter & Export</span>
              </h3>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="csv" className="bg-gray-800">CSV Format</option>
                  <option value="xlsx" className="bg-gray-800">Excel Format</option>
                  <option value="pdf" className="bg-gray-800">PDF Format</option>
                </select>
                
                <motion.button
                  onClick={handleExport}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-200"
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white transition-colors">
                <Filter className="w-4 h-4" />
                <span>Apply Filters</span>
              </button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Attendance Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard>
            <h3 className="text-lg font-semibold text-white mb-4">
              Attendance Records ({filteredRecords.length})
            </h3>
            
            {isLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredRecords.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60">No attendance records found</p>
                <p className="text-white/40 text-sm">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Student</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Register No.</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Time</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Method</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record, index) => (
                      <motion.tr
                        key={record.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                              <span className="text-xs font-semibold text-white">
                                {record.student.fullName.charAt(0)}
                              </span>
                            </div>
                            <span className="text-white">{record.student.fullName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-white/80">{record.student.registerNumber}</td>
                        <td className="py-3 px-4 text-white/80">
                          {format(new Date(record.timestamp), 'MMM dd, yyyy')}
                        </td>
                        <td className="py-3 px-4 text-white/80">
                          {format(new Date(record.timestamp), 'HH:mm:ss')}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            record.method === 'facial'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {record.method === 'facial' ? 'Facial' : 'Barcode'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            record.status === 'present'
                              ? 'bg-green-500/20 text-green-400'
                              : record.status === 'late'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;