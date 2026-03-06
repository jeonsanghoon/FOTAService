import { useState } from 'react';
import { Link } from 'react-router';
import { Search, Filter, Download, RefreshCw, CheckCircle, XCircle, Clock, Activity } from 'lucide-react';
import { PrototypeNav } from '../../components/prototype/PrototypeNav';

export function PrototypeDeviceList() {
  const [searchQuery, setSearchQuery] = useState('');

  const devices = [
    {
      id: 'DEV-2024-001247',
      name: 'Smart Sensor A',
      company: 'ABC 전자',
      branch: '서울 본사',
      product: 'IoT Sensor Pro',
      currentVersion: 'v2.4.1',
      targetVersion: 'v2.4.1',
      status: 'online',
      updateStatus: 'completed',
      lastSeen: '2026-03-06 14:23:15',
      lastUpdate: '2026-03-06 10:15:22'
    },
    {
      id: 'DEV-2024-001248',
      name: 'Smart Sensor B',
      company: 'ABC 전자',
      branch: '서울 본사',
      product: 'IoT Sensor Pro',
      currentVersion: 'v2.3.5',
      targetVersion: 'v2.4.1',
      status: 'online',
      updateStatus: 'in_progress',
      progress: 67,
      lastSeen: '2026-03-06 14:23:18',
      lastUpdate: '2026-03-06 13:45:00'
    },
    {
      id: 'DEV-2024-001249',
      name: 'Gateway Unit C',
      company: 'XYZ 산업',
      branch: '부산 지사',
      product: 'Gateway V2',
      currentVersion: 'v2.4.0',
      targetVersion: 'v2.4.1',
      status: 'online',
      updateStatus: 'queued',
      lastSeen: '2026-03-06 14:22:45',
      lastUpdate: '2026-03-05 09:30:11'
    },
    {
      id: 'DEV-2024-001250',
      name: 'Controller D',
      company: 'ABC 전자',
      branch: '대구 지사',
      product: 'Smart Controller',
      currentVersion: 'v2.3.0',
      targetVersion: 'v2.4.0',
      status: 'offline',
      updateStatus: 'failed',
      lastSeen: '2026-03-06 11:15:30',
      lastUpdate: '2026-03-06 08:20:15'
    },
    {
      id: 'DEV-2024-001251',
      name: 'Smart Sensor E',
      company: '123 기술',
      branch: '인천 공장',
      product: 'IoT Sensor Pro',
      currentVersion: 'v2.4.1',
      targetVersion: 'v2.4.1',
      status: 'online',
      updateStatus: 'completed',
      lastSeen: '2026-03-06 14:23:20',
      lastUpdate: '2026-03-05 16:42:33'
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      online: 'bg-green-100 text-green-800',
      offline: 'bg-gray-100 text-gray-800'
    };
    const labels = {
      online: '온라인',
      offline: '오프라인'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getUpdateStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="flex items-center gap-1.5 text-green-700">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">완료</span>
          </div>
        );
      case 'in_progress':
        return (
          <div className="flex items-center gap-1.5 text-blue-700">
            <Activity className="w-4 h-4" />
            <span className="text-sm">진행 중</span>
          </div>
        );
      case 'queued':
        return (
          <div className="flex items-center gap-1.5 text-yellow-700">
            <Clock className="w-4 h-4" />
            <span className="text-sm">대기 중</span>
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center gap-1.5 text-red-700">
            <XCircle className="w-4 h-4" />
            <span className="text-sm">실패</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <PrototypeNav />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">디바이스 목록</h1>
          <p className="text-gray-600">등록된 디바이스와 업데이트 상태를 관리합니다</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            새로고침
          </button>
          <Link
            to="/prototype/logs"
            className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            내보내기 (로그 화면)
          </Link>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="디바이스 ID, 이름으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>전체 상태</option>
              <option>온라인</option>
              <option>오프라인</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>전체 업체</option>
              <option>ABC 전자</option>
              <option>XYZ 산업</option>
              <option>123 기술</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>업데이트 상태</option>
              <option>완료</option>
              <option>진행 중</option>
              <option>대기 중</option>
              <option>실패</option>
            </select>
          </div>
        </div>
      </div>

      {/* 통계 요약 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">전체</div>
          <div className="text-2xl font-bold text-gray-900">12,458</div>
        </div>
        <div className="bg-green-50 rounded-lg border border-green-200 p-4">
          <div className="text-sm text-green-700 mb-1">온라인</div>
          <div className="text-2xl font-bold text-green-900">11,203</div>
        </div>
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
          <div className="text-sm text-blue-700 mb-1">업데이트 중</div>
          <div className="text-2xl font-bold text-blue-900">638</div>
        </div>
        <div className="bg-red-50 rounded-lg border border-red-200 p-4">
          <div className="text-sm text-red-700 mb-1">오프라인</div>
          <div className="text-2xl font-bold text-red-900">1,255</div>
        </div>
      </div>

      {/* 디바이스 테이블 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  디바이스
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  업체/지사
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  제품
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  펌웨어 버전
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  업데이트
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  마지막 확인
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {devices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <div className="font-medium text-gray-900">{device.name}</div>
                      <div className="text-sm text-gray-500">{device.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{device.company}</div>
                    <div className="text-sm text-gray-500">{device.branch}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{device.product}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="text-sm">
                        <span className="text-gray-600">현재: </span>
                        <span className="font-medium text-gray-900">{device.currentVersion}</span>
                      </div>
                      {device.targetVersion !== device.currentVersion && (
                        <div className="text-sm">
                          <span className="text-gray-600">목표: </span>
                          <span className="font-medium text-blue-600">{device.targetVersion}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(device.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      {getUpdateStatusBadge(device.updateStatus)}
                      {device.updateStatus === 'in_progress' && device.progress && (
                        <div className="w-24">
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-500 h-1.5 rounded-full"
                              style={{ width: `${device.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">{device.progress}%</div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{device.lastSeen}</div>
                    <div className="text-xs text-gray-500">업데이트: {device.lastUpdate}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            <span className="font-medium">1-5</span> / <span className="font-medium">12,458</span> 디바이스
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-white transition-colors text-sm">
              이전
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-white transition-colors text-sm">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-white transition-colors text-sm">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-white transition-colors text-sm">
              다음
            </button>
          </div>
        </div>
      </div>

      {/* RDS 상태 표시 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">데이터 저장 정보</h3>
            <p className="text-sm text-blue-800">
              이 페이지는 <strong>RDS (Aurora)</strong>에 저장된 최종 상태 정보를 표시합니다. 
              상세한 업데이트 이력과 로그는 <Link to="/prototype/logs" className="underline font-medium">실시간 로그</Link> 페이지에서 확인할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
