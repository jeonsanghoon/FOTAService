/**
 * 디바이스 다중선택 업데이트 진행
 * 경로: /update
 */
export function DeviceUpdate() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">디바이스 다중선택 업데이트 진행</h1>
      <p className="text-gray-600">대상 제품·펌웨어를 선택한 뒤, 디바이스를 다중 선택하여 업데이트를 실행합니다.</p>
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-500">
        (제품/펌웨어 선택 + 디바이스 다중 선택 + 업데이트 실행 UI)
      </div>
    </div>
  );
}
