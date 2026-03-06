import { Link, useLocation } from 'react-router';

const tabs = [
  { path: '/prototype/dashboard', label: '대시보드' },
  { path: '/prototype/sso', label: 'SSO 연동' },
  { path: '/prototype/customers', label: '고객 관리' },
  { path: '/prototype/branches', label: '지사 관리' },
  { path: '/prototype/users', label: '사용자 관리' },
  { path: '/prototype/devices', label: '디바이스 목록' },
  { path: '/prototype/updates', label: '업데이트 관리' },
  { path: '/prototype/logs', label: '실시간 로그' },
] as const;

export function PrototypeNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="bg-white border-b border-gray-200 -mx-4 -mt-6 sm:-mt-8 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      {/* 모바일: 한 줄 가로 스크롤 칩 (요즘 스타일) */}
      <div className="md:hidden pt-3 pb-3 -mx-4 px-4 overflow-x-auto scrollbar-none">
        <div className="flex gap-2 min-w-0">
          {tabs.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                currentPath === path ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* 데스크톱: 가로 탭 */}
      <div className="hidden md:block overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-x-4 sm:gap-x-6 gap-y-2 pt-4 sm:pt-6 min-w-0 flex-nowrap lg:flex-wrap">
          {tabs.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`pb-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex-shrink-0 ${
                currentPath === path
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
