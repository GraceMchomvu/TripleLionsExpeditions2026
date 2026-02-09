import { useState } from 'react';
import { useAdminStore } from '../store/adminStore';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminApp() {
  const isAuthenticated = useAdminStore((state) => state.isAuthenticated);
  const [showDashboard, setShowDashboard] = useState(isAuthenticated);

  const handleLogin = () => {
    setShowDashboard(true);
  };

  if (!isAuthenticated || !showDashboard) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard />;
}
