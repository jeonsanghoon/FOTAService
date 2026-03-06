import { Database, Cloud, Lock, Server, Activity, Zap } from 'lucide-react';

export function DeveloperInfo() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg shadow-lg p-8 text-white">
        <h1 className="text-4xl font-bold mb-4">내부 개발 정보</h1>
        <p className="text-xl text-green-100">
          FOTA 서비스의 기술 아키텍처 및 구현 상세 정보
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <Lock className="w-6 h-6 text-gray-700 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-900">인증·접근</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 w-1/3">항목</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">내용</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">인증 방식</td>
                <td className="px-4 py-3 text-sm text-gray-600">AWS Cognito SSO</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">연동 범위</td>
                <td className="px-4 py-3 text-sm text-gray-600">기존 시스템 로그인 처리 재사용</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">멀티 플랫폼</td>
                <td className="px-4 py-3 text-sm text-gray-600">업체의 다른 플랫폼에서도 동일 Cognito로 접근 가능 (SSO)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">디바이스 프로비저닝</td>
                <td className="px-4 py-3 text-sm text-gray-600">별도 필요 — 디바이스 등록·인증·권한 관리 포함</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <Zap className="w-6 h-6 text-gray-700 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-900">대규모 업데이트 지원</h2>
        </div>
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">AWS IoT Job을 통한 대규모 배포</h3>
            <p className="text-sm text-gray-700 mb-4">
              수천~수만 대의 디바이스에 대한 펌웨어 업데이트를 안정적으로 배포하고 관리합니다.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>병렬 실행 제어:</strong> 동시 업데이트 디바이스 수 제한으로 네트워크 부하 관리</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>롤아웃 정책:</strong> 단계별 배포로 리스크 최소화 (예: 10% → 50% → 100%)</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>자동 재시도:</strong> 실패한 디바이스에 대한 자동 재시도 메커니즘</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span><strong>취소 및 롤백:</strong> 진행 중인 Job 취소 및 이전 버전으로 롤백 지원</span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Kinesis Data Streams (KDS) 실시간 처리</h3>
            <p className="text-sm text-gray-700 mb-4">
              대량의 업데이트 이벤트와 디바이스 상태 변경을 실시간으로 수집하고 처리합니다.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>실시간 로그 스트리밍:</strong> 모든 디바이스의 업데이트 진행 상황을 실시간 수집</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>이벤트 버퍼링:</strong> 순간적인 트래픽 폭증에도 안정적인 데이터 처리</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>Lambda 연동:</strong> 스트림 데이터를 Lambda로 처리하여 DocumentDB에 저장</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span><strong>장애 복구:</strong> 샤드 분할 및 자동 스케일링으로 처리량 보장</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <Cloud className="w-6 h-6 text-gray-700 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-900">AWS 구성 요소</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 w-1/3">구성 요소</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">용도</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">AWS IoT MQTT</td>
                <td className="px-4 py-3 text-sm text-gray-600">디바이스 ↔ 플랫폼 실시간 명령·상태 메시지</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">AWS IoT Shadow</td>
                <td className="px-4 py-3 text-sm text-gray-600">디바이스 desired/reported 상태 및 업데이트 제어</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">S3</td>
                <td className="px-4 py-3 text-sm text-gray-600">펌웨어 바이너리 저장, 멀티파트 업로드로 대용량 관리</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">CloudFront (CF)</td>
                <td className="px-4 py-3 text-sm text-gray-600">펌웨어 배포·다운로드 가속 및 캐싱 (TTL 설정으로 유효기간 관리)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">AWS IoT Job</td>
                <td className="px-4 py-3 text-sm text-gray-600">대규모 디바이스 업데이트 작업 생성, 배포, 모니터링 및 제어</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Kinesis Data Streams</td>
                <td className="px-4 py-3 text-sm text-gray-600">실시간 업데이트 로그 및 이벤트 스트리밍, 대용량 데이터 버퍼링</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">펌웨어 다운로드 플로우</h3>
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-medium text-gray-900 mb-2">1. 기본 다운로드</p>
              <p className="text-sm text-gray-700">CloudFront TTL 설정으로 캐시된 URL/리소스를 통해 디바이스가 펌웨어 다운로드</p>
            </div>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <p className="font-medium text-gray-900 mb-2">2. URL 만료 시</p>
              <p className="text-sm text-gray-700">만료된 경우 디바이스가 presigned URL을 서버에 요청</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="font-medium text-gray-900 mb-2">3. 재발급</p>
              <p className="text-sm text-gray-700">서버가 새 presigned URL 발급 → 디바이스가 해당 URL로 다운로드 재시도·이어받기 관리</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              💡 CF TTL로 트래픽·캐시 효율 확보, 만료 후에는 presigned URL 요청으로 보안·유효기간을 제어하는 방식으로 운영
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <Database className="w-6 h-6 text-gray-700 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-900">데이터베이스</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Amazon Aurora (MySQL)</h3>
            <p className="text-sm text-gray-600 mb-4">관계형 데이터 - 최종 상태 관리</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 제품 정보</li>
              <li>• 버전 관리</li>
              <li>• 그룹 정보</li>
              <li>• 업체·지사 데이터</li>
              <li>• <strong>디바이스 최종 상태</strong></li>
              <li>• <strong>업데이트 Job 최종 상태</strong></li>
              <li>• 취소 기록</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Amazon DocumentDB</h3>
            <p className="text-sm text-gray-600 mb-4">문서형 데이터 - 상세 로그 관리</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 디바이스 메타데이터</li>
              <li>• Shadow 스냅샷</li>
              <li>• <strong>실시간 업데이트 로그</strong></li>
              <li>• <strong>전체 진행 이력</strong></li>
              <li>• <strong>에러 로그 및 상세 정보</strong></li>
              <li>• 유연한 스키마 데이터</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="text-sm font-semibold text-amber-900 mb-2">데이터 저장 전략</h4>
          <ul className="space-y-1 text-sm text-amber-800">
            <li>• <strong>DocumentDB:</strong> KDS를 통해 수집된 모든 업데이트 로그를 실시간으로 저장 (상세 이력)</li>
            <li>• <strong>RDS:</strong> 주기적으로 집계된 최종 상태만 저장하여 빠른 조회 성능 확보</li>
            <li>• <strong>데이터 보존:</strong> DocumentDB는 90일 후 아카이빙, RDS는 영구 보존</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <Server className="w-6 h-6 text-gray-700 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-900">디바이스 프로비저닝</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-sm font-semibold text-blue-600">1</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">디바이스 등록·인증 정보 발급</p>
              <p className="text-sm text-gray-600 mt-1">새로운 디바이스를 시스템에 등록하고 필요한 인증 정보를 자동으로 발급합니다</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-sm font-semibold text-blue-600">2</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Cognito(SSO) 및 IoT 정책 연동</p>
              <p className="text-sm text-gray-600 mt-1">다른 플랫폼에서의 접근을 지원하며 통합 인증 시스템과 연동됩니다</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-sm font-semibold text-blue-600">3</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">프로비저닝 플로우</p>
              <p className="text-sm text-gray-600 mt-1">등록 → 인증서/키 발급 → Shadow 연동까지 자동화된 프로세스</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <Activity className="w-6 h-6 text-gray-700 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-900">아키텍처 요약</h2>
        </div>
        <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
          <pre className="text-green-400 text-sm font-mono">
{`[사용자/업체] → Cognito SSO → [FOTA 페이지]
                                    ↓
[FOTA 서비스] ←→ Aurora(MySQL - 최종상태) + DocumentDB(로그)
     ↓
IoT Job (대규모 배포) → IoT MQTT / Shadow ←→ [디바이스]
     ↓                              ↓
S3(펌웨어) ← CF(배포, TTL)    KDS (실시간 로그) → Lambda → DocumentDB
                                                    ↓
                                            주기적 집계 → Aurora`}
          </pre>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">소규모 업데이트 (&lt; 100대)</h3>
            <p className="text-sm text-blue-700">MQTT/Shadow 직접 제어, 빠른 응답</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">대규모 업데이트 (&gt; 100대)</h3>
            <p className="text-sm text-purple-700">IoT Job + KDS 활용, 안정적 배포</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">기술 스택 요약</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">인증</h3>
            <p className="text-sm text-blue-700">AWS Cognito SSO</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">IoT</h3>
            <p className="text-sm text-green-700">AWS IoT MQTT, Shadow</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">스토리지</h3>
            <p className="text-sm text-purple-700">S3, CloudFront</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <h3 className="font-semibold text-orange-900 mb-2">관계형 DB</h3>
            <p className="text-sm text-orange-700">Amazon Aurora (MySQL)</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <h3 className="font-semibold text-pink-900 mb-2">문서형 DB</h3>
            <p className="text-sm text-pink-700">Amazon DocumentDB</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="font-semibold text-indigo-900 mb-2">배포</h3>
            <p className="text-sm text-indigo-700">Multi-part Upload, TTL</p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <p className="text-sm text-green-800">
          <strong>문서 버전:</strong> 1.0 | <strong>용도:</strong> 내부 개발팀 기술 참고용
        </p>
      </div>
    </div>
  );
}