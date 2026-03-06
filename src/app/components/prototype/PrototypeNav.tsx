import { Link, useLocation } from 'react-router';

const tabs = [
  { path: '/prototype/dashboard', label: '대시보드' },
  { path: '/prototype/customers', label: '고객 관리' },
  { path: '/prototype/branches', label: '지사 관리' },
  { path: '/prototype/users', label: '사용자 관리' },
  { path: '/prototype/devices', label: '디바이스 목록' },
  { path: '/prototype/updates', label: '업데이트 관리' },
  { path: '/prototype/logs', label: '실시간 로그' },
] as const;

export function PrototypeNav() {
  const location = useLocation();

  return (
    <div className="bg-white border-b border-gray-200 -mx-4 -mt-8 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex flex-wrap gap-x-6 gap-y-2 pt-6">
        {tabs.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`pb-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              location.pathname === path
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
