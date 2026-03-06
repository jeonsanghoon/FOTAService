import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Search } from 'lucide-react';

type UpdateState = 'none' | 'queued' | 'in_progress' | 'completed' | 'failed';

interface DeviceRow {
  product: string;
  deviceId: string;
  name: string;
  firmware: string;
  status: 'online' | 'offline';
  updateState: UpdateState;
  lastSeen: string;
}

const devices: DeviceRow[] = [
  { product: 'IoT Sensor Pro', deviceId: 'DEV-2024-001247', name: 'Smart Sensor A', firmware: 'v2.4.1', status: 'online', updateState: 'completed', lastSeen: '2026-03-06 14:23:15' },
  { product: 'IoT Sensor Pro', deviceId: 'DEV-2024-001248', name: 'Smart Sensor B', firmware: 'v2.3.5', status: 'online', updateState: 'in_progress', lastSeen: '2026-03-06 14:23:18' },
  { product: 'Gateway V2', deviceId: 'DEV-2024-001249', name: 'Gateway Unit C', firmware: 'v2.4.0', status: 'online', updateState: 'queued', lastSeen: '2026-03-06 14:22:45' },
  { product: 'Smart Controller', deviceId: 'DEV-2024-001250', name: 'Controller D', firmware: 'v2.3.0', status: 'offline', updateState: 'failed', lastSeen: '2026-03-06 11:15:30' },
];

const updateBadge: Record<UpdateState, { label: string; className: string }> = {
  none: { label: '—', className: 'bg-gray-100 text-gray-700' },
  queued: { label: '대기', className: 'bg-yellow-100 text-yellow-800' },
  in_progress: { label: '진행 중', className: 'bg-blue-100 text-blue-800' },
  completed: { label: '완료', className: 'bg-green-100 text-green-800' },
  failed: { label: '실패', className: 'bg-red-100 text-red-800' },
};

export function EtcPrototypeDeviceList() {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return devices;
    return devices.filter((d) => `${d.product} ${d.deviceId} ${d.name}`.toLowerCase().includes(qq));
  }, [q]);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">디바이스 목록</h1>
          <p className="text-sm text-gray-600">/etc 범위에 맞게 제품·디바이스 기준으로만 간단 조회합니다.</p>
        </div>
        <Link to="/etc/prototype/updates" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          업데이트 관리 →
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="제품명, 디바이스 ID, 이름으로 검색"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">제품정보</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">디바이스</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">펌웨어</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">접속</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">업데이트</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">마지막 확인</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((d) => (
                <tr key={d.deviceId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{d.product}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{d.name}</div>
                    <div className="font-mono text-xs text-gray-500">{d.deviceId}</div>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{d.firmware}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${d.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {d.status === 'online' ? '온라인' : '오프라인'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${updateBadge[d.updateState].className}`}>
                      {updateBadge[d.updateState].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{d.lastSeen}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-sm">
        실시간 로우 확인은{' '}
        <Link to="/etc/prototype/logs" className="text-blue-600 hover:text-blue-700 font-medium underline">
          실시간 로그
        </Link>
        에서 디바이스 ID로 검색하세요.
      </div>
    </div>
  );
}
