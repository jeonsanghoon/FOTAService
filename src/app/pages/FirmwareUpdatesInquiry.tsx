/**
 * 펌웨어 업데이트 조회
 * 경로: /firmware-updates
 */
export function FirmwareUpdatesInquiry() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">펌웨어 업데이트 조회</h1>
      <p className="text-gray-600">진행 중·완료·실패한 펌웨어 업데이트 이력을 조회합니다.</p>
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-500">
        (업데이트 job 목록 + 필터/검색 + 상세 조회 UI)
      </div>
    </div>
  );
}
