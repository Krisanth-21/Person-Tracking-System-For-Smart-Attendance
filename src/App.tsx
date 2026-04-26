import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './contexts/AppContext';
import Navigation from './components/ui/Navigation';
import Dashboard from './pages/Dashboard';
import StudentRegistration from './pages/StudentRegistration';
import LiveAttendance from './pages/LiveAttendance';
import Reports from './pages/Reports';
import AdminPanel from './pages/AdminPanel';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Router>
          <div className="min-h-screen">
            <Navigation />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/register" element={<StudentRegistration />} />
              <Route path="/attendance" element={<LiveAttendance />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
            
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                },
              }}
            />
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
        </Router>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;