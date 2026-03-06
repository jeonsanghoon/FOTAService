import { useState } from 'react';
import { PrototypeNav } from '../../components/prototype/PrototypeNav';
import { Search, Plus, MapPin, Building2, X } from 'lucide-react';
import { Link } from 'react-router';

type BranchForm = { address: string; lat: string; lng: string };

async function searchAddressToCoord(query: string): Promise<{ address: string; lat: string; lng: string } | null> {
  if (!query.trim()) return null;
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
      { headers: { 'Accept-Language': 'ko', 'User-Agent': 'FOTA-Prototype/1.0' } }
    );
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    const { lat, lon, display_name } = data[0];
    return { address: display_name ?? query, lat: String(lat), lng: String(lon) };
  } catch {
    return null;
  }
}

export function PrototypeBranchManage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [customerFilter, setCustomerFilter] = useState<string>('all');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [branchForm, setBranchForm] = useState<BranchForm>({ address: '', lat: '', lng: '' });
  const [addressSearching, setAddressSearching] = useState(false);

  const branches = [
    { id: 'BR-001', name: '서울 본사', code: 'SEOUL', customerId: 'CUST-001', customerName: 'ABC 전자', address: '서울시 강남구', devices: 3200, status: 'active' },
    { id: 'BR-002', name: '대구 지사', code: 'DAEGU', customerId: 'CUST-001', customerName: 'ABC 전자', address: '대구시 수성구', devices: 1500, status: 'active' },
    { id: 'BR-003', name: '부산 지사', code: 'BUSAN', customerId: 'CUST-002', customerName: 'XYZ 산업', address: '부산시 해운대구', devices: 2100, status: 'active' },
    { id: 'BR-004', name: '인천 공장', code: 'INCHEON', customerId: 'CUST-003', customerName: '123 기술', address: '인천시 남동구', devices: 890, status: 'active' },
  ];

  return (
    <div className="space-y-6">
      <PrototypeNav />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">지사 관리</h1>
          <p className="text-gray-600">고객사별 지사(사업장)를 등록하고 조회·수정합니다</p>
        </div>
        <button
          type="button"
          onClick={() => { setShowRegisterModal(true); setBranchForm({ address: '', lat: '', lng: '' }); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          지사 등록
        </button>
      </div>

      {/* 지사 등록 모달 */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">지사 등록</h3>
              <button type="button" onClick={() => setShowRegisterModal(false)} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form className="p-4 space-y-4" onSubmit={(e) => { e.preventDefault(); setShowRegisterModal(false); }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">소속 고객</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>ABC 전자</option>
                  <option>XYZ 산업</option>
                  <option>123 기술</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">지사명</label>
                <input type="text" placeholder="예: 서울 본사" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">지사 코드</label>
                <input type="text" placeholder="예: SEOUL" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="예: 서울시 강남구"
                    value={branchForm.address}
                    onChange={(e) => setBranchForm((f) => ({ ...f, address: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    disabled={addressSearching || !branchForm.address.trim()}
                    onClick={async () => {
                      setAddressSearching(true);
                      const result = await searchAddressToCoord(branchForm.address.trim());
                      setAddressSearching(false);
                      if (result) setBranchForm((f) => ({ ...f, ...result }));
                    }}
                    className="shrink-0 px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-lg text-sm font-medium flex items-center gap-1"
                  >
                    <Search className="w-4 h-4" />
                    {addressSearching ? '검색 중…' : '주소 검색'}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">주소 검색 시 위도·경도가 자동으로 등록됩니다</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">위도</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="예: 37.5665"
                    value={branchForm.lat}
                    onChange={(e) => setBranchForm((f) => ({ ...f, lat: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">경도</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="예: 126.9780"
                    value={branchForm.lng}
                    onChange={(e) => setBranchForm((f) => ({ ...f, lng: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowRegisterModal(false)} className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">취소</button>
                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">등록</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="지사명, 코드로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={customerFilter}
            onChange={(e) => setCustomerFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">전체 고객</option>
            <option value="CUST-001">ABC 전자</option>
            <option value="CUST-002">XYZ 산업</option>
            <option value="CUST-003">123 기술</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">지사 코드</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">지사명</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">소속 고객</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">주소</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">디바이스 수</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {branches.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{b.code}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{b.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{b.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    {b.address}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{b.devices.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Link to="/prototype/devices" className="text-blue-600 hover:text-blue-700 text-sm mr-2">디바이스</Link>
                  <Link to="/prototype/users" className="text-blue-600 hover:text-blue-700 text-sm">사용자</Link>
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
