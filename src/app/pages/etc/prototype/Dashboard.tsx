import { Activity, Upload, CheckCircle, AlertCircle } from 'lucide-react';

export function EtcPrototypeDashboard() {
  const cards = [
    { label: '전체 디바이스', value: '12,458', icon: Activity, className: 'bg-blue-50 border-blue-200 text-blue-900' },
    { label: '업데이트 진행 중', value: '3', icon: Upload, className: 'bg-purple-50 border-purple-200 text-purple-900' },
    { label: '완료 (오늘)', value: '1,847', icon: CheckCircle, className: 'bg-green-50 border-green-200 text-green-900' },
    { label: '실패 (오늘)', value: '23', icon: AlertCircle, className: 'bg-red-50 border-red-200 text-red-900' },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">대시보드</h1>
        <p className="text-gray-600 text-sm">/etc 전용 프로토타입입니다. (메뉴는 /etc용으로만 표시됩니다)</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className={`rounded-lg border p-4 ${c.className}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">{c.label}</div>
                <Icon className="w-5 h-5 opacity-80" />
              </div>
              <div className="text-2xl font-bold">{c.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

