import { Link } from 'react-router';
import { Activity, Upload, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { PrototypeNav } from '../../components/prototype/PrototypeNav';

export function PrototypeDashboard() {
  const stats = [
    {
      label: '전체 디바이스',
      value: '12,458',
      change: '+234',
      icon: Activity,
      color: 'blue'
    },
    {
      label: '진행 중 업데이트',
      value: '3',
      change: 'Active',
      icon: Upload,
      color: 'purple'
    },
    {
      label: '완료 (오늘)',
      value: '1,847',
      change: '+12%',
      icon: CheckCircle,
      color: 'green'
    },
    {
      label: '실패 (오늘)',
      value: '23',
      change: '-5%',
      icon: AlertCircle,
      color: 'red'
    }
  ];

  const recentJobs = [
    {
      id: 'job-20260306-001',
      name: '펌웨어 v2.4.1 배포',
      status: 'in_progress',
      progress: 67,
      devices: 5000,
      completed: 3350,
      failed: 12,
      startedAt: '2026-03-06 09:30:00'
    },
    {
      id: 'job-20260306-002',
      name: '보안 패치 v2.3.5',
      status: 'in_progress',
      progress: 24,
      devices: 2000,
      completed: 480,
      failed: 3,
      startedAt: '2026-03-06 11:15:00'
    },
    {
      id: 'job-20260305-015',
      name: '펌웨어 v2.4.0 배포',
      status: 'completed',
      progress: 100,
      devices: 3500,
      completed: 3487,
      failed: 13,
      startedAt: '2026-03-05 14:20:00'
    }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };
    const labels = {
      in_progress: '진행 중',
      completed: '완료',
      failed: '실패',
      cancelled: '취소됨'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <PrototypeNav />

      <div>
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">대시보드</h1>
        <p className="text-sm sm:text-base text-gray-600">FOTA 업데이트 현황을 실시간으로 모니터링합니다</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-100 text-blue-600',
            purple: 'bg-purple-100 text-purple-600',
            green: 'bg-green-100 text-green-600',
            red: 'bg-red-100 text-red-600'
          };
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm text-gray-500">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* 진행 중인 Job */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">최근 업데이트 Job</h2>
          <Link
            to="/prototype/updates"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            전체 보기 →
          </Link>
        </div>
        <div className="space-y-4">
          {recentJobs.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{job.name}</h3>
                    {getStatusBadge(job.status)}
                  </div>
                  <p className="text-sm text-gray-600">Job ID: {job.id}</p>
                  <p className="text-xs text-gray-500 mt-1">시작: {job.startedAt}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{job.progress}%</div>
                  <div className="text-xs text-gray-500">진행률</div>
                </div>
              </div>
              
              {/* 프로그레스 바 */}
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      job.status === 'completed' ? 'bg-green-500' :
                      job.status === 'failed' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`}
                    style={{ width: `${job.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* 상세 정보 */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">전체: {job.devices.toLocaleString()}대</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">완료: {job.completed.toLocaleString()}대</span>
                </div>
                {job.failed > 0 && (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-gray-600">실패: {job.failed}대</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 실시간 처리량 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">KDS 처리량 (실시간)</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">초당 이벤트</span>
                <span className="font-semibold text-gray-900">1,247 events/sec</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Lambda 처리</span>
                <span className="font-semibold text-gray-900">98.5% 성공률</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98.5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">데이터베이스 상태</h3>
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">DocumentDB (로그)</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">정상</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Aurora RDS (상태)</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">정상</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">평균 쓰기 지연</span>
              <span className="text-sm font-semibold text-gray-900">12ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">평균 읽기 지연</span>
              <span className="text-sm font-semibold text-gray-900">8ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
