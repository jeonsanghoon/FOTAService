import { useState } from 'react';
import { PrototypeNav } from '../../components/prototype/PrototypeNav';
import { Search, Plus, MapPin, Building2, Filter } from 'lucide-react';
import { Link } from 'react-router';

export function PrototypeBranchManage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [customerFilter, setCustomerFilter] = useState<string>('all');

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
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          지사 등록
        </button>
      </div>

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
  );
}
