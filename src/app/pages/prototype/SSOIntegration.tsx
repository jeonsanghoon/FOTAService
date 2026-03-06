import { PrototypeNav } from '../../components/prototype/PrototypeNav';
import { Link } from 'react-router';
import { LogIn, ExternalLink, Shield, ArrowRight, Monitor, Menu } from 'lucide-react';

export function PrototypeSSOIntegration() {
  const steps = [
    { num: 1, title: '타시스템에서 FOTA 메뉴 진입', desc: '기존 업무 시스템(ERP, IoT 플랫폼 등)에 구성된 FOTA 메뉴를 클릭합니다.', icon: Menu },
    { num: 2, title: 'Cognito SSO 인증', desc: '동일한 Cognito 사용자 풀을 사용하므로, 이미 로그인된 경우 추가 로그인 없이 토큰으로 인증됩니다. 미로그인 시 타시스템 로그인 화면으로 이동 후 인증됩니다.', icon: Shield },
    { num: 3, title: 'FOTA 플랫폼 자동 로그인', desc: 'SSO 인증이 완료되면 FOTA 전용 URL로 리다이렉트되며, 우리 플랫폼에 자동 로그인된 상태로 대시보드가 열립니다.', icon: LogIn },
  ];

  return (
    <div className="space-y-6">
      <PrototypeNav />

      <div>
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2">타시스템 연동 · SSO 자동 로그인</h1>
        <p className="text-sm sm:text-base text-gray-600">타시스템에 FOTA 메뉴를 두고, Cognito SSO를 통해 우리 FOTA 플랫폼에 자동 로그인되는 프로세스입니다.</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
        <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-blue-900">단일 로그인(SSO)</p>
          <p className="text-sm text-blue-800">타시스템과 FOTA 플랫폼이 동일한 AWS Cognito를 사용하므로, 한 번 로그인하면 FOTA 메뉴 클릭 시 별도 로그인 없이 자동 진입됩니다.</p>
        </div>
      </div>

      {/* 프로세스 흐름 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">진입 프로세스</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-2">
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-lg">
            <Monitor className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">타시스템</span>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 hidden md:block flex-shrink-0" />
          <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg">
            <Menu className="w-5 h-5 text-amber-600" />
            <span className="font-medium text-gray-900">FOTA 메뉴 클릭</span>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 hidden md:block flex-shrink-0" />
          <div className="flex items-center gap-2 px-4 py-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <Shield className="w-5 h-5 text-indigo-600" />
            <span className="font-medium text-gray-900">Cognito SSO 인증</span>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 hidden md:block flex-shrink-0" />
          <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-lg">
            <LogIn className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-900">FOTA 플랫폼 자동 로그인</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center md:text-left">타시스템 → FOTA 메뉴 → Cognito SSO → 우리 플랫폼 자동 로그인</p>
      </div>

      {/* 단계별 상세 */}
      <div className="space-y-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.num} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                {step.num}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-5 h-5 text-gray-500" />
                  <h3 className="font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-2">연동 후 이용</h3>
        <p className="text-gray-600 text-sm mb-4">자동 로그인된 상태로 FOTA 대시보드, 업데이트 관리, 디바이스 목록 등 모든 기능을 동일하게 사용할 수 있습니다.</p>
        <Link
          to="/prototype/dashboard"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          대시보드로 이동
        </Link>
      </div>
    </div>
  );
}
