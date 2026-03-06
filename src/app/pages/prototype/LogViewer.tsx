import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Activity, Filter, Download, Pause, Play, AlertCircle, CheckCircle, Info, Database } from 'lucide-react';
import { PrototypeNav } from '../../components/prototype/PrototypeNav';

export function PrototypeLogViewer() {
  const [isStreaming, setIsStreaming] = useState(true);
  const [logs, setLogs] = useState([
    {
      id: 1,
      timestamp: '2026-03-06 14:23:45.123',
      deviceId: 'DEV-2024-001248',
      jobId: 'job-20260306-001',
      event: 'download_progress',
      level: 'info',
      message: '펌웨어 다운로드 진행 중: 67%',
      details: { progress: 67, speed: '2.4 MB/s' }
    },
    {
      id: 2,
      timestamp: '2026-03-06 14:23:44.892',
      deviceId: 'DEV-2024-001352',
      jobId: 'job-20260306-001',
      event: 'update_completed',
      level: 'success',
      message: '펌웨어 업데이트 완료: v2.3.5 → v2.4.1',
      details: { oldVersion: 'v2.3.5', newVersion: 'v2.4.1', duration: '4m 32s' }
    },
    {
      id: 3,
      timestamp: '2026-03-06 14:23:43.567',
      deviceId: 'DEV-2024-001450',
      jobId: 'job-20260306-002',
      event: 'download_started',
      level: 'info',
      message: 'CloudFront에서 펌웨어 다운로드 시작',
      details: { url: 'https://d1234.cloudfront.net/...', size: '45.2 MB' }
    },
    {
      id: 4,
      timestamp: '2026-03-06 14:23:41.234',
      deviceId: 'DEV-2024-001250',
      jobId: 'job-20260306-001',
      event: 'update_failed',
      level: 'error',
      message: '업데이트 실패: 체크섬 불일치',
      details: { error: 'CHECKSUM_MISMATCH', expected: 'abc123...', actual: 'def456...' }
    },
    {
      id: 5,
      timestamp: '2026-03-06 14:23:40.789',
      deviceId: 'DEV-2024-001567',
      jobId: 'job-20260306-001',
      event: 'presigned_url_request',
      level: 'info',
      message: 'Presigned URL 재발급 요청 (만료됨)',
      details: { reason: 'url_expired', newTTL: '3600s' }
    },
    {
      id: 6,
      timestamp: '2026-03-06 14:23:39.456',
      deviceId: 'DEV-2024-001248',
      jobId: 'job-20260306-001',
      event: 'shadow_updated',
      level: 'info',
      message: 'Shadow 상태 업데이트: desired → reported',
      details: { state: 'downloading', version: 'v2.4.1' }
    },
    {
      id: 7,
      timestamp: '2026-03-06 14:23:38.123',
      deviceId: 'DEV-2024-001678',
      jobId: 'job-20260306-002',
      event: 'job_assigned',
      level: 'info',
      message: 'IoT Job 할당됨',
      details: { jobDocument: 'firmware-update-v2.3.5', priority: 'normal' }
    },
    {
      id: 8,
      timestamp: '2026-03-06 14:23:36.890',
      deviceId: 'DEV-2024-001789',
      jobId: 'job-20260306-001',
      event: 'update_completed',
      level: 'success',
      message: '펌웨어 업데이트 완료: v2.4.0 → v2.4.1',
      details: { oldVersion: 'v2.4.0', newVersion: 'v2.4.1', duration: '3m 18s' }
    }
  ]);

  // 실시간 로그 시뮬레이션
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, -1),
        deviceId: `DEV-2024-${String(Math.floor(Math.random() * 9999)).padStart(6, '0')}`,
        jobId: `job-20260306-00${Math.floor(Math.random() * 3) + 1}`,
        event: ['download_progress', 'update_completed', 'shadow_updated', 'job_assigned'][Math.floor(Math.random() * 4)],
        level: ['info', 'success', 'info', 'info'][Math.floor(Math.random() * 4)],
        message: [
          '펌웨어 다운로드 진행 중: ' + Math.floor(Math.random() * 100) + '%',
          '펌웨어 업데이트 완료',
          'Shadow 상태 업데이트',
          'IoT Job 할당됨'
        ][Math.floor(Math.random() * 4)],
        details: {}
      };

      setLogs((prev) => [newLog, ...prev].slice(0, 50));
    }, 2000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getLevelBadge = (level: string) => {
    const styles = {
      error: 'bg-red-100 text-red-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      info: 'bg-blue-100 text-blue-800'
    };
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[level as keyof typeof styles]}`}>
        {level.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <PrototypeNav />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">실시간 로그</h1>
          <p className="text-gray-600">KDS를 통해 수집된 업데이트 로그를 실시간으로 확인합니다</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isStreaming
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isStreaming ? (
              <>
                <Pause className="w-4 h-4" />
                일시정지
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                재개
              </>
            )}
          </button>
          <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            내보내기
          </button>
        </div>
      </div>

      {/* KDS 스트림 상태 */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">KDS 처리량</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">1,247 /sec</div>
          <div className="text-xs text-gray-500 mt-1">초당 이벤트 수</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-5 h-5 text-green-500" />
            <span className="text-sm text-gray-600">DocumentDB 쓰기</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">98.5%</div>
          <div className="text-xs text-gray-500 mt-1">성공률</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-purple-500" />
            <span className="text-sm text-gray-600">평균 지연</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">234 ms</div>
          <div className="text-xs text-gray-500 mt-1">KDS → DocumentDB</div>
        </div>
      </div>

      {/* 필터 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <select className="border border-gray-300 rounded px-3 py-1.5 text-sm">
            <option>전체 레벨</option>
            <option>INFO</option>
            <option>SUCCESS</option>
            <option>WARNING</option>
            <option>ERROR</option>
          </select>
          <select className="border border-gray-300 rounded px-3 py-1.5 text-sm">
            <option>전체 이벤트</option>
            <option>download_started</option>
            <option>download_progress</option>
            <option>update_completed</option>
            <option>update_failed</option>
            <option>job_assigned</option>
          </select>
          <input
            type="text"
            placeholder="디바이스 ID 또는 Job ID로 검색"
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm"
          />
        </div>
      </div>

      {/* 실시간 로그 스트림 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-gray-900">로그 스트림</h2>
            {isStreaming && (
              <span className="flex items-center gap-2 px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                실시간 스트리밍 중
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">총 {logs.length}개 로그</span>
        </div>

        <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
          {logs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="mt-1">{getLevelIcon(log.level)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-gray-500">{log.timestamp}</span>
                    {getLevelBadge(log.level)}
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                      {log.event}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 mb-2">{log.message}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="font-mono">Device: {log.deviceId}</span>
                    <span className="font-mono">Job: {log.jobId}</span>
                  </div>
                  {Object.keys(log.details).length > 0 && (
                    <details className="mt-2">
                      <summary className="text-xs text-blue-600 cursor-pointer hover:text-blue-700">
                        상세 정보 보기
                      </summary>
                      <pre className="mt-2 p-2 bg-gray-900 text-green-400 rounded text-xs overflow-x-auto">
                        {JSON.stringify(log.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DocumentDB 정보 */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Database className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h3 className="font-semibold text-purple-900 mb-1">데이터 저장 정보</h3>
            <p className="text-sm text-purple-800 mb-2">
              이 페이지의 로그는 <strong>Kinesis Data Streams (KDS)</strong>를 통해 실시간으로 수집되어 
              <strong> Amazon DocumentDB</strong>에 저장됩니다.
            </p>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• <strong>실시간 수집:</strong> 모든 디바이스 이벤트를 KDS로 스트리밍</li>
              <li>• <strong>Lambda 처리:</strong> KDS 데이터를 Lambda가 처리하여 DocumentDB에 저장</li>
              <li>• <strong>상세 이력:</strong> 전체 업데이트 과정의 모든 이벤트를 상세히 기록</li>
              <li>• <strong>보관 정책:</strong> 90일간 보관 후 S3로 아카이빙</li>
            </ul>
            <div className="mt-3 p-3 bg-white rounded border border-purple-200">
              <p className="text-xs text-purple-700">
                💡 최종 상태는 주기적으로 집계되어 RDS에 저장됩니다. 
                빠른 상태 조회는 <Link to="/prototype/devices" className="underline font-medium">디바이스 목록</Link>에서 확인하세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
