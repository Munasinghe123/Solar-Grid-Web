import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const pageTitles = {
  '/backoffice/dashboard': 'Backoffice Dashboard',
  '/backoffice/users': 'User Management',
  '/backoffice/prosumers': 'Prosumer Management',
  '/backoffice/nodes': 'Microgrid Node Management',
  '/backoffice/reservations': 'Reservation Management',
  '/operator/dashboard': 'Operator Dashboard',
  '/operator/bookings': 'Booking Management',
  '/operator/nodes': 'Operational Node Information',
};

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Smart Solar Microgrid';

  return (
    <div className="flex min-h-screen bg-offWhite">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
