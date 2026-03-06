import { useState, Fragment } from 'react';
import { Link } from 'react-router';
import { ChevronDown, ChevronRight, CheckCircle, XCircle, Clock, Activity } from 'lucide-react';

/** 디바이스당 업데이트 히스토리 (최대 50건) */
interface UpdateHistoryItem {
  id: string;
  jobId: string;
  firmwareVersion: string;
  startedAt: string;
  completedAt: string | null;
  status: 'completed' | 'failed' | 'in_progress';
  message?: string;
}

interface DeviceRow {
  id: string;
  name: string;
  product: string;
  currentVersion: string;
  status: 'operational' | 'non_operational';
  lastSeen: string;
  /** 해당 디바이스의 이전 업데이트 히스토리 (최대 50건) */
  history: UpdateHistoryItem[];
}

const mockDevices: DeviceRow[] = [
  {
    id: 'DEV-2024-001247',
    name: 'Smart Sensor A',
    product: 'IoT Sensor Pro',
    currentVersion: 'v2.4.1',
    status: 'operational',
    lastSeen: '2026-03-06 14:23:15',
    history: [
      { id: 'h1', jobId: 'job-20260306-001', firmwareVersion: 'v2.4.1', startedAt: '2026-03-06 10:15:00', completedAt: '2026-03-06 10:15:22', status: 'completed' },
      { id: 'h2', jobId: 'job-20260301-012', firmwareVersion: 'v2.4.0', startedAt: '2026-03-01 09:00:00', completedAt: '2026-03-01 09:12:11', status: 'completed' },
      { id: 'h3', jobId: 'job-20260220-008', firmwareVersion: 'v2.3.5', startedAt: '2026-02-20 14:30:00', completedAt: '2026-02-20 14:35:44', status: 'completed' },
      { id: 'h4', jobId: 'job-20260215-003', firmwareVersion: 'v2.3.4', startedAt: '2026-02-15 11:00:00', completedAt: null, status: 'failed', message: '체크섬 불일치' },
      ...Array.from({ length: 46 }, (_, i) => ({
        id: `h${i + 5}`,
        jobId: `job-202602${10 - Math.floor(i / 10)}-${String(i).padStart(2, '0')}`,
        firmwareVersion: `v2.${3 - Math.floor(i / 20)}.${i % 10}`,
        startedAt: `2026-02-${10 - Math.floor(i / 5)} ${10 + (i % 12)}:${(i * 3) % 60}:00`,
        completedAt: `2026-02-${10 - Math.floor(i / 5)} ${10 + (i % 12)}:${(i * 3 + 5) % 60}:00`,
        status: (['completed', 'completed', 'failed'] as const)[i % 3],
        message: i % 3 === 2 ? '타임아웃' : undefined,
      })),
    ],
  },
  {
    id: 'DEV-2024-001248',
    name: 'Smart Sensor B',
    product: 'IoT Sensor Pro',
    currentVersion: 'v2.3.5',
    status: 'operational',
    lastSeen: '2026-03-06 14:23:18',
    history: [
      { id: 'b1', jobId: 'job-20260306-001', firmwareVersion: 'v2.4.1', startedAt: '2026-03-06 13:45:00', completedAt: null, status: 'in_progress' },
      { id: 'b2', jobId: 'job-20260305-015', firmwareVersion: 'v2.3.5', startedAt: '2026-03-05 09:30:00', completedAt: '2026-03-05 09:30:11', status: 'completed' },
      { id: 'b3', jobId: 'job-20260228-007', firmwareVersion: 'v2.3.4', startedAt: '2026-02-28 15:00:00', completedAt: '2026-02-28 15:08:22', status: 'completed' },
    ],
  },
  {
    id: 'DEV-2024-001249',
    name: 'Gateway Unit C',
    product: 'Gateway V2',
    currentVersion: 'v2.4.0',
    status: 'operational',
    lastSeen: '2026-03-06 14:22:45',
    history: [
      { id: 'c1', jobId: 'job-20260305-015', firmwareVersion: 'v2.4.0', startedAt: '2026-03-05 14:20:00', completedAt: '2026-03-05 14:28:33', status: 'completed' },
      { id: 'c2', jobId: 'job-20260220-004', firmwareVersion: 'v2.3.5', startedAt: '2026-02-20 10:00:00', completedAt: '2026-02-20 10:12:00', status: 'completed' },
    ],
  },
];

const STATUS_BADGE = {
  completed: { label: '완료', class: 'bg-green-100 text-green-800', Icon: CheckCircle },
  failed: { label: '실패', class: 'bg-red-100 text-red-800', Icon: XCircle },
  in_progress: { label: '진행 중', class: 'bg-blue-100 text-blue-800', Icon: Activity },
} as const;

export function EtcUpdateManager() {
  const [expandedDeviceId, setExpandedDeviceId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedFirmwareById, setSelectedFirmwareById] = useState<Record<string, string>>(() =>
    Object.fromEntries(mockDevices.map((d) => [d.id, 'v2.4.1'])),
  );
  const [lastRequest, setLastRequest] = useState<string | null>(null);
  const [lastRollback, setLastRollback] = useState<string | null>(null);

  const toggleExpand = (deviceId: string) => {
    setExpandedDeviceId((prev) => (prev === deviceId ? null : deviceId));
  };

  const allIds = mockDevices.map((d) => d.id);

  const toggleDeviceSelected = (deviceId: string) => {
    setSelectedIds((prev) =>
      prev.includes(deviceId) ? prev.filter((id) => id !== deviceId) : [...prev, deviceId],
    );
  };

  const toggleAllSelected = () => {
    if (selectedIds.length === allIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allIds);
    }
  };

  const handleRequestUpdate = () => {
    if (!selectedIds.length) return;
    const summary = selectedIds
      .map((id) => `${id}→${selectedFirmwareById[id] ?? 'v2.4.1'}`)
      .join(', ');
    setLastRequest(`선택 ${selectedIds.length}대 장비에 대한 업데이트 Job 요청 (프로토타입): ${summary}`);
  };

  const getPreviousVersion = (device: DeviceRow): string => {
    // 히스토리에서 가장 최근 완료 버전을 이전 버전으로 간주
    if (!device.history.length) return device.currentVersion;
    const [, ...rest] = device.history;
    const prevCompleted = rest.find((h) => h.status === 'completed');
    return prevCompleted?.firmwareVersion ?? rest[0]?.firmwareVersion ?? device.currentVersion;
  };

  const handleRollback = () => {
    if (!selectedIds.length) return;
    const selectedDevices = mockDevices.filter((d) => selectedIds.includes(d.id));
    const summary = selectedDevices
      .map((d) => `${d.id}→${getPreviousVersion(d)}`)
      .join(', ');
    setLastRollback(
      `선택 ${selectedDevices.length}대 장비를 이전 버전으로 롤백 Job 하나로 요청 (프로토타입): ${summary}`,
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">업데이트 관리</h1>
        <p className="text-gray-600 text-sm">
          디바이스를 다중 선택해 업데이트를 요청하고, 행을 클릭하면 해당 디바이스의 이전 업데이트 히스토리(최대 50건)를 볼 수 있습니다.
        </p>
      </div>

      {/* 디바이스 목록 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-8 px-3 py-3" />
                <th className="w-8 px-3 py-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={toggleAllSelected}
                    checked={selectedIds.length > 0 && selectedIds.length === allIds.length}
                    aria-label="모든 디바이스 선택"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">디바이스</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">제품</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">현재 버전</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">요청 버전</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">운영 여부</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">마지막 확인</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockDevices.map((device) => {
                const isExpanded = expandedDeviceId === device.id;
                const historyCount = Math.min(device.history.length, 50);
                const isSelected = selectedIds.includes(device.id);
                return (
                  <Fragment key={device.id}>
                    <tr
                      key={device.id}
                      onClick={() => toggleExpand(device.id)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-3 py-3 text-gray-500">
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </td>
                      <td className="px-3 py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={isSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleDeviceSelected(device.id);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${device.name} 선택`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{device.name}</div>
                        <div className="text-xs text-gray-500">{device.id}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{device.product}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{device.currentVersion}</td>
                      <td className="px-4 py-3">
                        <select
                          value={selectedFirmwareById[device.id] ?? 'v2.4.1'}
                          onChange={(e) => {
                            e.stopPropagation();
                            const value = e.target.value;
                            setSelectedFirmwareById((prev) => ({ ...prev, [device.id]: value }));
                          }}
                          className="border border-gray-300 rounded-lg px-2 py-1 text-xs"
                        >
                          <option value="v2.4.1">v2.4.1</option>
                          <option value="v2.4.0">v2.4.0</option>
                          <option value="v2.3.5">v2.3.5</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                            device.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {device.status === 'operational' ? '운영장비' : '비운영장비'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{device.lastSeen}</td>
                    </tr>
                    {/* 서브 그리드: 해당 디바이스의 이전 히스토리 최대 50건 */}
                    {isExpanded && (
                      <tr key={`${device.id}-sub`}>
                        <td colSpan={8} className="p-0 bg-gray-50">
                          <div className="px-4 py-3 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">
                              업데이트 히스토리 (최대 50건) — {device.name}
                            </h3>
                            <div className="overflow-x-auto rounded border border-gray-200 bg-white">
                              <table className="min-w-full text-sm">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-3 py-2 text-left font-medium text-gray-700">Job ID</th>
                                    <th className="px-3 py-2 text-left font-medium text-gray-700">펌웨어 버전</th>
                                    <th className="px-3 py-2 text-left font-medium text-gray-700">시작</th>
                                    <th className="px-3 py-2 text-left font-medium text-gray-700">완료</th>
                                    <th className="px-3 py-2 text-left font-medium text-gray-700">상태</th>
                                    <th className="px-3 py-2 text-left font-medium text-gray-700">비고</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                  {device.history.slice(0, 50).map((h) => {
                                    const config = STATUS_BADGE[h.status];
                                    const Icon = config.Icon;
                                    return (
                                      <tr key={h.id} className="hover:bg-gray-50">
                                        <td className="px-3 py-2 text-gray-700">{h.jobId}</td>
                                        <td className="px-3 py-2 font-medium text-gray-900">{h.firmwareVersion}</td>
                                        <td className="px-3 py-2 text-gray-600">{h.startedAt}</td>
                                        <td className="px-3 py-2 text-gray-600">{h.completedAt ?? '—'}</td>
                                        <td className="px-3 py-2">
                                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.class}`}>
                                            <Icon className="w-3.5 h-3.5" />
                                            {config.label}
                                          </span>
                                        </td>
                                        <td className="px-3 py-2 text-gray-500 text-xs">{h.message ?? '—'}</td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              표시: {historyCount}건 {device.history.length > 50 ? `(총 ${device.history.length}건 중 최근 50건)` : ''}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 선택 장비 업데이트/롤백 요약 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm text-gray-700">
            선택된 장비: <span className="font-semibold">{selectedIds.length}</span>대
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleRequestUpdate}
              disabled={!selectedIds.length}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                selectedIds.length
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              선택 장비 업데이트 요청
            </button>
            <button
              type="button"
              onClick={handleRollback}
              disabled={!selectedIds.length}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                selectedIds.length
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              선택 장비 이전 버전 롤백
            </button>
          </div>
        </div>
        {(lastRequest || lastRollback) && (
          <div className="space-y-1 text-xs text-gray-500">
            {lastRequest && <p>마지막 업데이트 요청: {lastRequest}</p>}
            {lastRollback && <p>마지막 롤백 요청: {lastRollback}</p>}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Link
          to="/etc/prototype/devices"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          디바이스 목록으로
        </Link>
        <span className="text-gray-300">|</span>
        <Link
          to="/etc/prototype/logs"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          실시간 로그
        </Link>
      </div>
    </div>
  );
}
