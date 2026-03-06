/**
 * 제품별 디바이스 정보
 * 경로: /devices
 */
export function Devices() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">제품별 디바이스 정보</h1>
      <p className="text-gray-600">제품을 선택하면 해당 제품의 디바이스 목록과 상태를 조회합니다.</p>
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-500">
        (제품 선택 + 디바이스 목록 UI)
      </div>
    </div>
  );
}
