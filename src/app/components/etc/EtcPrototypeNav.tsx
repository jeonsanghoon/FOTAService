import { Link, useLocation, useNavigate } from 'react-router';
import { useRef } from 'react';

const tabs = [
  { path: '/etc/prototype', label: '대시보드' },
  { path: '/etc/prototype/sso', label: 'SSO 연동' },
  { path: '/etc/prototype/devices', label: '디바이스 목록' },
  { path: '/etc/prototype/updates', label: '업데이트 관리' },
  { path: '/etc/prototype/logs', label: '실시간 로그' },
] as const;

export function EtcPrototypeNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentIndex = tabs.findIndex((tab) =>
    currentPath === tab.path || currentPath.startsWith(`${tab.path}/`),
  );

  const goToIndex = (nextIndex: number) => {
    if (nextIndex < 0 || nextIndex >= tabs.length || nextIndex === currentIndex) return;
    navigate(tabs[nextIndex].path);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (currentIndex === -1) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToIndex(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToIndex(currentIndex - 1);
    }
  };

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (currentIndex === -1) return;
    if (touchStartX.current == null || touchStartY.current == null) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartX.current;
    const dy = touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) {
      return;
    }

    if (dx < 0) {
      goToIndex(currentIndex + 1);
    } else {
      goToIndex(currentIndex - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-white border-b border-gray-200 -mx-4 -mt-6 sm:-mt-8 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="/etc 프로토타입 화면 탭 내비게이션"
    >
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
