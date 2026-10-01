import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  DashboardIcon,
  UsersIcon,
  ProsumerIcon,
  NodeIcon,
  BookingIcon,
  LogoutIcon,
  SunIcon,
  CloseIcon,
} from '../common/Icons';
import Button from '../common/Button';

const backofficeLinks = [
  { to: '/backoffice/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { to: '/backoffice/users', label: 'Users', icon: UsersIcon },
  { to: '/backoffice/prosumers', label: 'Prosumers', icon: ProsumerIcon },
  { to: '/backoffice/nodes', label: 'Microgrid Nodes', icon: NodeIcon },
  { to: '/backoffice/reservations', label: 'Reservations', icon: BookingIcon },
];

const operatorLinks = [
  { to: '/operator/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { to: '/operator/bookings', label: 'Bookings', icon: BookingIcon },
  { to: '/operator/nodes', label: 'Microgrid Nodes', icon: NodeIcon },
];

function Sidebar({ open, onClose }) {
  const { user, logout, isBackoffice } = useAuth();
  const links = isBackoffice ? backofficeLinks : operatorLinks;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-deepGreen text-white
          flex flex-col transition-transform duration-200
          lg:translate-x-0 lg:static lg:z-auto
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <SunIcon className="w-7 h-7 text-solar" />
            <div>
              <p className="font-bold text-sm leading-tight">Smart Solar</p>
              <p className="text-xs text-white/70">Microgrid Trading</p>
            </div>
          </div>
          <button type="button" className="lg:hidden p-1" onClick={onClose} aria-label="Close menu">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive ? 'bg-leaf text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <div className="mb-3">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-solar mt-0.5">
              {user?.role === 'GridOperator' ? 'Grid Operator' : user?.role}
            </p>
          </div>
          <Button variant="outline" size="sm" className="w-full !border-white/30 !text-white hover:!bg-white/10" onClick={logout}>
            <LogoutIcon className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
