import { CheckCircle, Upload, Users, Globe, Settings, Building2, MapPin, User, Smartphone, Zap, Calendar } from 'lucide-react';

export function CustomerInfo() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">FOTA 업데이트 서비스</h1>
        <p className="text-xl text-blue-100">
          Firmware Over-The-Air 업데이트 서비스로 디바이스 펌웨어를 안전하고 효율적으로 관리하세요.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">서비스 개요</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">기존 시스템과 완벽한 연동</p>
              <p className="text-gray-600">별도 페이지로 제공되며, 기존 시스템 로그인(AWS Cognito SSO)을 활용하여 간편하게 접근할 수 있습니다.</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">멀티 플랫폼 지원</p>
              <p className="text-gray-600">업체의 다른 플랫폼에서도 동일한 인증 시스템으로 접근 가능합니다.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">주요 기능</h2>
        
        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <div className="flex items-center mb-2">
              <Upload className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">제품·버전 관리</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• 제품 단위로 펌웨어 버전을 등록하고 수정할 수 있습니다</li>
              <li>• 대용량 펌웨어 파일도 안정적으로 업로드 가능합니다</li>
            </ul>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <div className="flex items-center mb-2">
              <Settings className="w-5 h-5 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">유연한 업데이트 유형</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full mt-3">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">유형</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">설명</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">제품 그룹별 업데이트</td>
                    <td className="px-4 py-3 text-sm text-gray-600">제품 그룹 지정 + 대상 디바이스 지정 후 업데이트</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">업체별·지사별·제품별 업데이트</td>
                    <td className="px-4 py-3 text-sm text-gray-600">업체별·제품별 업데이트 목록 지정 후 일괄 업데이트</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <div className="flex items-center mb-2">
              <Users className="w-5 h-5 text-purple-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">업데이트 현황·제어</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• 업체별, 지사별, 제품별 업데이트 현황을 실시간으로 조회할 수 있습니다</li>
              <li>• 진행 중인 업데이트를 필요 시 취소할 수 있습니다</li>
            </ul>
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <div className="flex items-center mb-2">
              <Globe className="w-5 h-5 text-orange-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">디바이스 프로비저닝</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• 디바이스 등록 및 인증 정보를 간편하게 발급합니다</li>
              <li>• 다른 플랫폼에서의 접근도 지원합니다</li>
              <li>• 등록부터 인증서/키 발급, Shadow 연동까지 자동화된 프로세스를 제공합니다</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">관리 기능</h2>
        <p className="text-gray-600 mb-6">고객·지사·사용자·디바이스를 체계적으로 관리할 수 있습니다.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200">
            <Building2 className="w-8 h-8 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">고객 관리</h3>
              <p className="text-sm text-gray-600">고객사(업체) 단위 등록·조회·수정, 담당자 및 연락처 관리</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200">
            <MapPin className="w-8 h-8 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">지사 관리</h3>
              <p className="text-sm text-gray-600">고객별 지사(사업장) 등록, 주소·코드·디바이스 수 관리</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200">
            <User className="w-8 h-8 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">사용자 관리</h3>
              <p className="text-sm text-gray-600">콘솔 접근 사용자 등록, 역할(관리자/운영자/조회자) 및 권한 관리</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200">
            <Smartphone className="w-8 h-8 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">디바이스 관리</h3>
              <p className="text-sm text-gray-600">디바이스 등록·목록·상태 조회, 펌웨어 버전 및 업데이트 이력 관리</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-500" />
          서버리스 Lambda 처리 프로세스
        </h2>
        <p className="text-gray-600 mb-6">AWS Lambda를 활용해 업로드·배포·로그 수집 등을 서버 없이 처리합니다.</p>
        <div className="space-y-4">
          <div className="border-l-4 border-amber-400 pl-4 py-2">
            <h4 className="font-medium text-gray-900">펌웨어 업로드</h4>
            <p className="text-sm text-gray-600">S3 멀티파트 업로드 완료 시 Lambda 트리거 → 메타데이터 검증·DB 반영(제품·버전)·CloudFront 무효화 등</p>
          </div>
          <div className="border-l-4 border-amber-400 pl-4 py-2">
            <h4 className="font-medium text-gray-900">업데이트 Job 생성·배포</h4>
            <p className="text-sm text-gray-600">사용자가 배포 실행 시 API Gateway → Lambda → IoT Jobs 등록 및 Shadow desired 상태 반영, 대상 디바이스에 MQTT로 전파</p>
          </div>
          <div className="border-l-4 border-amber-400 pl-4 py-2">
            <h4 className="font-medium text-gray-900">Presigned URL 발급</h4>
            <p className="text-sm text-gray-600">디바이스가 만료된 다운로드 URL 요청 시 Lambda가 S3 presigned URL 생성 후 반환</p>
          </div>
          <div className="border-l-4 border-amber-400 pl-4 py-2">
            <h4 className="font-medium text-gray-900">로그·이벤트 수집</h4>
            <p className="text-sm text-gray-600">IoT Rule 또는 Kinesis 등으로 디바이스 이벤트 수집 → Lambda로 파싱·저장(DB/검색) → 대시보드·실시간 로그 연동</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-indigo-500" />
          개발 일정 (참고)
        </h2>
        <p className="text-gray-600 mb-4">최소 개발기간 3개월, 목표 4개월 이내입니다. 2명 개발 인력 기준 단일 디바이스 업데이트(기본)는 약 6인·월(3개월×2명), 대규모 진행 시 약 9인·월(4.5개월×2명) 수준을 가정할 수 있습니다.</p>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">구분</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">내용</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-700">인력</td>
                <td className="px-4 py-3 text-sm text-gray-600">2명</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-700">기간</td>
                <td className="px-4 py-3 text-sm text-gray-600">최소 3개월, 목표 4개월 이내</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-700">규모</td>
                <td className="px-4 py-3 text-sm text-gray-600">기본 약 6인·월(2명×3개월) / 대규모 시 약 9인·월(2명×4.5개월)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-700">비고</td>
                <td className="px-4 py-3 text-sm text-gray-600">대규모 IoT Job·KDS 연동 등 요건 추가 시 9인·월 수준 가정</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
