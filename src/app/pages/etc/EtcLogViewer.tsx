import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Filter, Pause, Play, AlertCircle, CheckCircle, Info } from 'lucide-react';

interface LogRow {
  id: number;
  timestamp: string;
  product: string;
  deviceId: string;
  event: string;
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
}

const initialLogs: LogRow[] = [
  { id: 1, timestamp: '2026-03-06 14:23:45.123', product: 'IoT Sensor Pro', deviceId: 'DEV-2024-001248', event: 'download_progress', level: 'info', message: '펌웨어 다운로드 진행 중: 67%' },
  { id: 2, timestamp: '2026-03-06 14:23:44.892', product: 'IoT Sensor Pro', deviceId: 'DEV-2024-001352', event: 'update_completed', level: 'success', message: '펌웨어 업데이트 완료 v2.3.5 → v2.4.1' },
  { id: 3, timestamp: '2026-03-06 14:23:43.567', product: 'Gateway V2', deviceId: 'DEV-2024-001450', event: 'download_started', level: 'info', message: '펌웨어 다운로드 시작' },
  { id: 4, timestamp: '2026-03-06 14:23:41.234', product: 'Smart Controller', deviceId: 'DEV-2024-001250', event: 'update_failed', level: 'error', message: '업데이트 실패: 체크섬 불일치' },
  { id: 5, timestamp: '2026-03-06 14:23:40.789', product: 'IoT Sensor Pro', deviceId: 'DEV-2024-001567', event: 'presigned_url_request', level: 'info', message: 'Presigned URL 재발급 요청' },
  { id: 6, timestamp: '2026-03-06 14:23:39.456', product: 'IoT Sensor Pro', deviceId: 'DEV-2024-001248', event: 'shadow_updated', level: 'info', message: 'Shadow 상태 업데이트' },
  { id: 7, timestamp: '2026-03-06 14:23:38.123', product: 'Gateway V2', deviceId: 'DEV-2024-001678', event: 'job_assigned', level: 'info', message: 'IoT Job 할당됨' },
  { id: 8, timestamp: '2026-03-06 14:23:36.890', product: 'IoT Sensor Pro', deviceId: 'DEV-2024-001789', event: 'update_completed', level: 'success', message: '펌웨어 업데이트 완료 v2.4.0 → v2.4.1' },
];

const products = ['전체', 'IoT Sensor Pro', 'Gateway V2', 'Smart Controller'];
const levels: Record<string, string> = {
  error: 'bg-red-100 text-red-800',
  success: 'bg-green-100 text-green-800',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-blue-100 text-blue-800',
};

function LevelIcon({ level }: { level: LogRow['level'] }) {
  switch (level) {
    case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
    case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    default: return <Info className="w-4 h-4 text-blue-500" />;
  }
}

export function EtcLogViewer() {
  const [isStreaming, setIsStreaming] = useState(true);
  const [logs, setLogs] = useState<LogRow[]>(initialLogs);
  const [filterProduct, setFilterProduct] = useState('전체');
  const [filterDeviceId, setFilterDeviceId] = useState('');

  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      const prods = ['IoT Sensor Pro', 'Gateway V2', 'Smart Controller'];
      const events = ['download_progress', 'update_completed', 'shadow_updated', 'job_assigned'];
      const newLog: LogRow = {
        id: Date.now(),
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, -1),
        product: prods[Math.floor(Math.random() * prods.length)],
        deviceId: `DEV-2024-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`,
        event: events[Math.floor(Math.random() * events.length)],
        level: Math.random() > 0.9 ? 'error' : Math.random() > 0.7 ? 'success' : 'info',
        message: events[Math.floor(Math.random() * events.length)] === 'update_completed'
          ? '펌웨어 업데이트 완료'
          : '펌웨어 다운로드 진행 중',
      };
      setLogs((prev) => [newLog, ...prev].slice(0, 100));
    }, 2000);
    return () => clearInterval(interval);
  }, [isStreaming]);

  const filtered = logs.filter((log) => {
    if (filterProduct !== '전체' && log.product !== filterProduct) return false;
    if (filterDeviceId.trim() && !log.deviceId.toLowerCase().includes(filterDeviceId.trim().toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">실시간 로그</h1>
          <p className="text-gray-600 text-sm">제품·디바이스 ID 기준으로 업데이트되는 실시간 로우를 확인합니다</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isStreaming ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isStreaming ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isStreaming ? '일시정지' : '재개'}
          </button>
        </div>
      </div>

      {/* 필터: 제품, 디바이스 ID */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
          >
            {products.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="디바이스 ID 검색"
            value={filterDeviceId}
            onChange={(e) => setFilterDeviceId(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-48"
          />
        </div>
      </div>

      {/* 실시간 로우 테이블 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 text-sm">실시간 로우</h2>
          {isStreaming && (
            <span className="flex items-center gap-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              스트리밍 중
            </span>
          )}
          <span className="text-xs text-gray-500">표시 {filtered.length}건</span>
        </div>
        <div className="overflow-x-auto max-h-[560px] overflow-y-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">시각</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">제품정보</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">디바이스 ID</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">이벤트</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">메시지</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-mono text-xs text-gray-600 whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-4 py-2 text-gray-900">{log.product}</td>
                  <td className="px-4 py-2 font-mono text-gray-700">{log.deviceId}</td>
                  <td className="px-4 py-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${levels[log.level] ?? 'bg-gray-100 text-gray-800'}`}>
                      <LevelIcon level={log.level} />
                      {log.event}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-700">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex gap-2 text-sm">
        <Link to="/etc/prototype/devices" className="text-blue-600 hover:text-blue-700 font-medium">디바이스 목록</Link>
        <span className="text-gray-300">|</span>
        <Link to="/etc/prototype/updates" className="text-blue-600 hover:text-blue-700 font-medium">업데이트 관리</Link>
      </div>
    </div>
  );
}
