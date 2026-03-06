import { Link } from 'react-router';
import { FileText, Smartphone, Package, Upload, ListChecks, User, Calendar, ArrowRight } from 'lucide-react';

export function EtcRelated() {
  const items = [
    {
      title: '사용자 정보',
      desc: 'SSO 로그인 사용자 정보 조회·표시',
      icon: User,
    },
    {
      title: '제품별 디바이스 정보',
      desc: '제품 기준으로 디바이스 상태·버전과 운영장비/비운영장비를 조회',
      icon: Smartphone,
    },
    {
      title: '제품별 펌웨어 등록',
      desc: '제품별 펌웨어 버전/메타데이터 관리 및 업로드',
      icon: Package,
    },
    {
      title: '디바이스 다중선택 업데이트 진행',
      desc: '대상 디바이스를 다중 선택해 업데이트 실행(대규모 카나리/롤아웃은 제외)',
      icon: Upload,
    },
    {
      title: '펌웨어 업데이트 조회',
      desc: '업데이트 Job/이력/성공·실패 현황 조회',
      icon: ListChecks,
    },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 sm:p-8 text-white">
        <h1 className="text-2xl sm:text-4xl font-bold mb-1">FOTA Lite 요약</h1>
        <p className="text-blue-100 text-sm sm:text-base">
          경량 FOTA 업데이트 서비스(FOTA Lite)의 범위, 화면 구성, 공수 정보를 한눈에 정리한 페이지입니다.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-gray-700 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-gray-900">범위 메모</p>
            <p className="text-sm text-gray-600">
              고객관리/지사관리는 제외하고, <span className="font-medium">사용자 정보</span>는 SSO 로그인 사용자 기준으로 포함합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-gray-700 mt-0.5" />
          <div className="space-y-2 w-full">
            <p className="font-semibold text-gray-900">공수·일정 (참고)</p>
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
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">분석·설계</td>
                    <td className="px-4 py-3 text-sm text-gray-600">1M (1명×1개월)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">공통 개발·환경 구성</td>
                    <td className="px-4 py-3 text-sm text-gray-600">1M (1명×1개월, 분석·설계와 병행)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">개발·테스트</td>
                    <td className="px-4 py-3 text-sm text-gray-600">4M (2명×2개월)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700">합계</td>
                    <td className="px-4 py-3 text-sm text-gray-600">총 6M (최대 2명 투입 기준)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-start gap-3">
          <Upload className="w-5 h-5 text-gray-700 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-gray-900">안전한 전송·롤백</p>
            <p className="text-sm text-gray-600">
              AWS IoT Shadow로 디바이스 상태를 동기화하고 CloudFront CDN + HTTP Range(부분) 다운로드·재시도·이어받기, 체크섬 검증·자동 롤백을 통해
              불안정한 네트워크 환경에서도 안전하게 펌웨어를 배포합니다.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(({ title, desc, icon: Icon }) => (
          <div key={title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-gray-100">
                <Icon className="w-5 h-5 text-gray-700" />
              </div>
              <h2 className="font-semibold text-gray-900">{title}</h2>
            </div>
            <p className="text-sm text-gray-600">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-900">프로토타입으로 이동</p>
          <p className="text-sm text-gray-600">SSO·사용자 정보 포함(권한 동일·간단), 고객/지사 관리는 제외한 /etc 전용 프로토타입</p>
        </div>
        <Link
          to="/etc/prototype"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700"
        >
          이동
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
