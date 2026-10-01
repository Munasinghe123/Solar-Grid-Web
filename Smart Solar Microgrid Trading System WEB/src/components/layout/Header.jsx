import { useAuth } from '../../context/AuthContext';
import { MenuIcon, SunIcon } from '../common/Icons';

function Header({ onMenuClick, title }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-offWhite px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-offWhite text-deepGreen"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>
        <div className="min-w-0">
          <h1 className="text-lg font-semibold text-deepGreen truncate">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <SunIcon className="w-5 h-5 text-solar hidden sm:block" />
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-deepGreen">{user?.name}</p>
          <p className="text-xs text-gray-500">
            {user?.role === 'GridOperator' ? 'Grid Operator' : user?.role}
          </p>
        </div>
        <div className="w-9 h-9 rounded-full bg-leaf text-white flex items-center justify-center text-sm font-semibold">
          {user?.name?.charAt(0) || 'U'}
        </div>
      </div>
    </header>
  );
}

export default Header;
