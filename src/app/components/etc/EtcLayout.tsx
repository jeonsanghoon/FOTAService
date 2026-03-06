import { Outlet, Link, useLocation } from 'react-router';
import { FileText, Monitor } from 'lucide-react';

const navItems = [
  { to: '/etc', label: '관련 내용', icon: FileText },
  { to: '/etc/prototype', label: '프로토타입', icon: Monitor },
] as const;

export function EtcLayout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/etc') return location.pathname === '/etc' || location.pathname === '/etc/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-6 min-w-0">
              <Link to="/etc" className="flex-shrink-0">
                <h1 className="text-base sm:text-xl font-semibold text-gray-900 truncate">FOTA Lite</h1>
              </Link>
              <div className="flex items-center gap-4">
                {navItems.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm ${
                      isActive(to)
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
              기존 화면으로
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}
