/**
 * 제품별 펌웨어 등록
 * 경로: /firmware
 */
export function Firmware() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">제품별 펌웨어 등록</h1>
      <p className="text-gray-600">제품을 선택한 뒤 펌웨어 파일을 등록하고 버전 정보를 관리합니다.</p>
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-500">
        (제품 선택 + 펌웨어 업로드/등록 UI)
      </div>
    </div>
  );
}
