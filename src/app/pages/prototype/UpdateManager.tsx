import { useState } from 'react';
import { Link } from 'react-router';
import { Plus, Play, Pause, X, Eye, Download, Filter, ChevronDown, ChevronUp, Smartphone } from 'lucide-react';
import { PrototypeNav } from '../../components/prototype/PrototypeNav';

type DeviceStatus = 'queued' | 'in_progress' | 'completed' | 'failed';

interface TargetDevice {
  id: string;
  name: string;
  product: string;
  currentVersion: string;
  targetVersion: string;
  status: DeviceStatus;
  progress?: number;
  lastUpdate?: string;
  errorMessage?: string;
}

export function PrototypeUpdateManager() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedScale, setSelectedScale] = useState<'small' | 'large'>('small');
  const [expandedDevices, setExpandedDevices] = useState<Record<string, boolean>>({});

  const updates = [
    {
      id: 'job-20260306-001',
      name: '펌웨어 v2.4.1 배포',
      type: 'large',
      status: 'in_progress',
      firmware: 'v2.4.1',
      targetDevices: 5000,
      completed: 3350,
      failed: 12,
      inProgress: 638,
      rolloutConfig: '10% → 50% → 100%',
      maxConcurrent: 100,
      createdAt: '2026-03-06 09:30:00',
      company: 'ABC 전자',
      branch: '서울 본사'
    },
    {
      id: 'job-20260306-002',
      name: '보안 패치 v2.3.5',
      type: 'large',
      status: 'in_progress',
      firmware: 'v2.3.5',
      targetDevices: 2000,
      completed: 480,
      failed: 3,
      inProgress: 217,
      rolloutConfig: '5% → 25% → 100%',
      maxConcurrent: 50,
      createdAt: '2026-03-06 11:15:00',
      company: 'XYZ 산업',
      branch: '부산 지사'
    },
    {
      id: 'job-20260305-015',
      name: '펌웨어 v2.4.0 배포',
      type: 'large',
      status: 'completed',
      firmware: 'v2.4.0',
      targetDevices: 3500,
      completed: 3487,
      failed: 13,
      inProgress: 0,
      rolloutConfig: '10% → 50% → 100%',
      maxConcurrent: 100,
      createdAt: '2026-03-05 14:20:00',
      company: 'ABC 전자',
      branch: '대구 지사'
    },
    {
      id: 'job-20260305-008',
      name: '긴급 패치 v2.3.4',
      type: 'small',
      status: 'completed',
      firmware: 'v2.3.4',
      targetDevices: 50,
      completed: 50,
      failed: 0,
      inProgress: 0,
      rolloutConfig: 'Direct',
      maxConcurrent: 50,
      createdAt: '2026-03-05 10:05:00',
      company: '123 기술',
      branch: '인천 공장'
    }
  ];

  const getDeviceStatusBadge = (status: DeviceStatus) => {
    const map = {
      queued: { label: '대기', class: 'bg-gray-100 text-gray-700' },
      in_progress: { label: '진행 중', class: 'bg-blue-100 text-blue-800' },
      completed: { label: '완료', class: 'bg-green-100 text-green-800' },
      failed: { label: '실패', class: 'bg-red-100 text-red-800' },
    };
    const { label, class: c } = map[status];
    return <span className={`px-2 py-0.5 rounded text-xs font-medium ${c}`}>{label}</span>;
  };

  const targetDevicesByJob: Record<string, TargetDevice[]> = {
    'job-20260306-001': [
      { id: 'DEV-2024-001248', name: 'Smart Sensor B', product: 'IoT Sensor Pro', currentVersion: 'v2.3.5', targetVersion: 'v2.4.1', status: 'in_progress', progress: 67, lastUpdate: '2026-03-06 14:23' },
      { id: 'DEV-2024-001352', name: 'Smart Sensor C', product: 'IoT Sensor Pro', currentVersion: 'v2.3.5', targetVersion: 'v2.4.1', status: 'completed', lastUpdate: '2026-03-06 14:20' },
      { id: 'DEV-2024-001250', name: 'Controller D', product: 'Smart Controller', currentVersion: 'v2.3.0', targetVersion: 'v2.4.1', status: 'failed', errorMessage: '체크섬 불일치', lastUpdate: '2026-03-06 14:18' },
      { id: 'DEV-2024-001401', name: 'Gateway Unit E', product: 'Gateway V2', currentVersion: 'v2.4.0', targetVersion: 'v2.4.1', status: 'queued' },
      { id: 'DEV-2024-001402', name: 'Smart Sensor F', product: 'IoT Sensor Pro', currentVersion: 'v2.3.5', targetVersion: 'v2.4.1', status: 'in_progress', progress: 23, lastUpdate: '2026-03-06 14:24' },
    ],
    'job-20260306-002': [
      { id: 'DEV-2024-001450', name: 'Sensor G', product: 'IoT Sensor Pro', currentVersion: 'v2.3.4', targetVersion: 'v2.3.5', status: 'in_progress', progress: 45, lastUpdate: '2026-03-06 14:22' },
      { id: 'DEV-2024-001451', name: 'Sensor H', product: 'IoT Sensor Pro', currentVersion: 'v2.3.4', targetVersion: 'v2.3.5', status: 'completed', lastUpdate: '2026-03-06 14:21' },
      { id: 'DEV-2024-001452', name: 'Controller I', product: 'Smart Controller', currentVersion: 'v2.3.4', targetVersion: 'v2.3.5', status: 'queued' },
    ],
    'job-20260305-015': [
      { id: 'DEV-2024-001100', name: 'Sensor J', product: 'IoT Sensor Pro', currentVersion: 'v2.4.0', targetVersion: 'v2.4.0', status: 'completed', lastUpdate: '2026-03-05 16:42' },
      { id: 'DEV-2024-001101', name: 'Sensor K', product: 'IoT Sensor Pro', currentVersion: 'v2.4.0', targetVersion: 'v2.4.0', status: 'completed', lastUpdate: '2026-03-05 16:38' },
      { id: 'DEV-2024-001102', name: 'Gateway L', product: 'Gateway V2', currentVersion: 'v2.3.5', targetVersion: 'v2.4.0', status: 'failed', errorMessage: '타임아웃', lastUpdate: '2026-03-05 16:20' },
    ],
    'job-20260305-008': [
      { id: 'DEV-2024-002001', name: '공장 Controller A', product: 'Smart Controller', currentVersion: 'v2.3.4', targetVersion: 'v2.3.4', status: 'completed', lastUpdate: '2026-03-05 10:35' },
      { id: 'DEV-2024-002002', name: '공장 Controller B', product: 'Smart Controller', currentVersion: 'v2.3.4', targetVersion: 'v2.3.4', status: 'completed', lastUpdate: '2026-03-05 10:32' },
    ],
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      paused: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };
    const labels = {
      in_progress: '진행 중',
      completed: '완료',
      failed: '실패',
      paused: '일시정지',
      cancelled: '취소됨'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    return type === 'large' ? (
      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
        대규모 (그룹·카나리 배포)
      </span>
    ) : (
      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
        단일 디바이스 (기본)
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <PrototypeNav />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">업데이트 관리</h1>
          <p className="text-gray-600">기본은 단일 디바이스 업데이트, 대규모는 그룹 지정·카나리 배포 등이 포함됩니다</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          새 업데이트 생성
        </button>
      </div>

      {/* 필터 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select className="border border-gray-300 rounded px-3 py-1.5 text-sm">
            <option>전체 상태</option>
            <option>진행 중</option>
            <option>완료</option>
            <option>일시정지</option>
            <option>취소됨</option>
          </select>
          <select className="border border-gray-300 rounded px-3 py-1.5 text-sm">
            <option>전체 유형</option>
            <option>단일 디바이스 (기본)</option>
            <option>대규모 (그룹·카나리)</option>
          </select>
          <select className="border border-gray-300 rounded px-3 py-1.5 text-sm">
            <option>전체 업체</option>
            <option>ABC 전자</option>
            <option>XYZ 산업</option>
            <option>123 기술</option>
          </select>
        </div>
      </div>

      {/* 업데이트 목록 */}
      <div className="space-y-4">
        {updates.map((update) => (
          <div key={update.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{update.name}</h3>
                  {getStatusBadge(update.status)}
                  {getTypeBadge(update.type)}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Job ID: {update.id}</span>
                  <span>•</span>
                  <span>{update.company} / {update.branch}</span>
                  <span>•</span>
                  <span>생성: {update.createdAt}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {update.status === 'in_progress' && (
                  <>
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="일시정지">
                      <Pause className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="취소">
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </>
                )}
                {update.status === 'paused' && (
                  <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="재개">
                    <Play className="w-4 h-4 text-gray-600" />
                  </button>
                )}
                <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="상세보기">
                  <Eye className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded transition-colors" title="리포트 다운로드">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* 진행률 */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">진행률</span>
                <span className="font-semibold text-gray-900">
                  {Math.round((update.completed / update.targetDevices) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    update.status === 'completed' ? 'bg-green-500' :
                    update.status === 'failed' ? 'bg-red-500' :
                    'bg-blue-500'
                  }`}
                  style={{ width: `${(update.completed / update.targetDevices) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-500 mb-1">펌웨어 버전</div>
                <div className="font-semibold text-gray-900">{update.firmware}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">대상 디바이스</div>
                <div className="font-semibold text-gray-900">{update.targetDevices.toLocaleString()}대</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">롤아웃 정책</div>
                <div className="font-semibold text-gray-900">{update.rolloutConfig}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">최대 동시 실행</div>
                <div className="font-semibold text-gray-900">{update.maxConcurrent}대</div>
              </div>
            </div>

            {/* 통계 */}
            <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">완료: <strong>{update.completed.toLocaleString()}</strong></span>
              </div>
              {update.inProgress > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">진행 중: <strong>{update.inProgress.toLocaleString()}</strong></span>
                </div>
              )}
              {update.failed > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">실패: <strong>{update.failed}</strong></span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                <span className="text-sm text-gray-600">대기: <strong>{(update.targetDevices - update.completed - update.inProgress - update.failed).toLocaleString()}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 생성 모달 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">새 업데이트 생성</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* 업데이트 유형: 기본 = 단일 디바이스, 대규모 = 그룹·카나리 등 */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  업데이트 유형
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedScale('small')}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      selectedScale === 'small'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">단일 디바이스 (기본)</div>
                    <div className="text-sm text-gray-600">1대만 선택하여 업데이트</div>
                    <div className="text-xs text-gray-500 mt-2">기본 개발 범위, Direct MQTT/Shadow</div>
                  </button>
                  <button
                    onClick={() => setSelectedScale('large')}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      selectedScale === 'large'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 mb-1">대규모</div>
                    <div className="text-sm text-gray-600">그룹 지정, 카나리 배포, 롤아웃 정책</div>
                    <div className="text-xs text-gray-500 mt-2">IoT Job + KDS, 단계별 배포</div>
                  </button>
                </div>
              </div>

              {/* 기본 정보 */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  업데이트 이름
                </label>
                <input
                  type="text"
                  placeholder="예: 펌웨어 v2.5.0 배포"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    업체 선택
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                    <option>선택하세요</option>
                    <option>ABC 전자</option>
                    <option>XYZ 산업</option>
                    <option>123 기술</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    지사 선택
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                    <option>전체</option>
                    <option>서울 본사</option>
                    <option>부산 지사</option>
                    <option>대구 지사</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  펌웨어 버전
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                  <option>v2.5.0 (최신)</option>
                  <option>v2.4.1</option>
                  <option>v2.4.0</option>
                  <option>v2.3.5</option>
                </select>
              </div>

              {/* 대규모: 그룹 지정·카나리·롤아웃 옵션 */}
              {selectedScale === 'large' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      그룹 지정 (선택)
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                      <option>제품 그룹 선택</option>
                      <option>IoT Sensor Pro 전부</option>
                      <option>Gateway V2 전부</option>
                      <option>지사별 그룹</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      카나리 배포 비율
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                      <option>5% → 25% → 100%</option>
                      <option>10% → 50% → 100%</option>
                      <option>20% → 100%</option>
                      <option>비활성 (즉시 전체)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">일부 먼저 배포 후 단계 확대</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      롤아웃 정책
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-4 py-2">
                      <option>10% → 50% → 100%</option>
                      <option>5% → 25% → 100%</option>
                      <option>20% → 100%</option>
                      <option>100% (즉시 전체)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      단계별 배포로 리스크를 최소화합니다
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      최대 동시 실행 수
                    </label>
                    <input
                      type="number"
                      defaultValue="100"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      동시에 업데이트할 최대 디바이스 수를 설정합니다
                    </p>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  대상 디바이스
                </label>
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <input type="checkbox" id="select-all" className="rounded" />
                    <label htmlFor="select-all" className="text-sm text-gray-700">
                      전체 선택 (약 1,247대)
                    </label>
                  </div>
                  <div className="text-xs text-gray-500">
                    또는 제품 그룹, 개별 디바이스 ID로 선택 가능
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                업데이트 생성
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
