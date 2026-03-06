import { Link } from 'react-router';
import { FileText, Code, ArrowRight, Monitor } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          FOTA 업데이트 서비스 문서
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Firmware Over-The-Air 업데이트 서비스의 고객 홍보용 자료와 내부 개발 정보를 확인하실 수 있습니다.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <Link
          to="/customer"
          className="group block p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">고객 홍보용</h2>
          <p className="text-gray-600">
            FOTA 서비스의 주요 기능, 업데이트 유형, 사용자 중심의 기능 요구사항을 확인하세요.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li>• 서비스 개요 및 소개</li>
            <li>• 주요 기능 및 업데이트 유형</li>
            <li>• 디바이스 관리 기능</li>
          </ul>
        </Link>

        <Link
          to="/developer"
          className="group block p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-green-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Code className="w-8 h-8 text-green-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">내부 개발 정보</h2>
          <p className="text-gray-600">
            AWS 아키텍처, 데이터베이스 구성, 기술적 구현 사항 등 개발 관련 상세 정보를 확인하세요.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li>• AWS 구성요소 및 아키텍처</li>
            <li>• 데이터베이스 설계</li>
            <li>• 기술 스택 및 구현 방법</li>
          </ul>
        </Link>

        <Link
          to="/prototype/dashboard"
          className="group block p-8 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-purple-500"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Monitor className="w-8 h-8 text-purple-600" />
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">프로토타입</h2>
          <p className="text-gray-600">
            실제 작동하는 프로토타입 화면을 통해 FOTA 서비스의 기능을 직접 체험해보세요.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li>• 타시스템 연동 · SSO 자동 로그인</li>
            <li>• 실시간 대시보드</li>
            <li>• 업데이트 관리 · 디바이스 목록 및 로그 뷰어</li>
          </ul>
        </Link>
      </div>

      <div className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">참고사항</h3>
            <div className="mt-2 text-sm text-amber-700">
              <p>이 문서는 FOTA 서비스 기획 및 Figma 디자인 요청 시 참고용으로 작성되었습니다. 별도 페이지로 구성 예정이며, 기존 시스템 SSO(Cognito) 인증과 연동됩니다.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}