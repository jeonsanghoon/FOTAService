import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router';
import { FileText, Code, Home, Monitor, Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', label: '홈', icon: Home },
  { to: '/customer', label: '고객 홍보용', icon: FileText },
  { to: '/developer', label: '내부 개발 정보', icon: Code },
  { to: '/prototype/dashboard', label: '프로토타입', icon: Monitor },
] as const;

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const linkClass = (path: string) =>
    `inline-flex items-center px-1 pt-1 border-b-2 ${
      isActive(path) ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16">
            <div className="flex items-center min-w-0">
              <Link to="/" className="flex-shrink-0">
                <h1 className="text-base sm:text-xl font-semibold text-gray-900 truncate">FOTA 업데이트 서비스</h1>
              </Link>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-6 lg:space-x-8">
                {navItems.map(({ to, label, icon: Icon }) => (
                  <Link key={to} to={to} className={`${linkClass(to)} text-sm`}>
                    <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((o) => !o)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-lg text-base font-medium ${isActive(to) ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}