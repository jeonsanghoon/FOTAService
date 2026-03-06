import { Outlet, Link, useLocation } from 'react-router';
import { FileText, Code, Home, Monitor } from 'lucide-react';

export function Layout() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">FOTA 업데이트 서비스</h1>
              </div>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                    isActive('/') && location.pathname === '/'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  홈
                </Link>
                <Link
                  to="/customer"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                    isActive('/customer')
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  고객 홍보용
                </Link>
                <Link
                  to="/developer"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                    isActive('/developer')
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Code className="w-4 h-4 mr-2" />
                  내부 개발 정보
                </Link>
                <Link
                  to="/prototype/dashboard"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 ${
                    isActive('/prototype')
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <Monitor className="w-4 h-4 mr-2" />
                  프로토타입
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}