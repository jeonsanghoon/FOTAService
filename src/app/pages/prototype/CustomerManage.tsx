import { useState } from 'react';
import { PrototypeNav } from '../../components/prototype/PrototypeNav';
import { Search, Plus, Building2, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router';

export function PrototypeCustomerManage() {
  const [searchQuery, setSearchQuery] = useState('');

  const customers = [
    { id: 'CUST-001', name: 'ABC 전자', code: 'ABC', contact: '김담당', email: 'fota@abc.co.kr', phone: '02-1234-5678', branches: 3, devices: 5240, status: 'active' },
    { id: 'CUST-002', name: 'XYZ 산업', code: 'XYZ', contact: '이매니저', email: 'iot@xyz.com', phone: '051-234-5678', branches: 2, devices: 2100, status: 'active' },
    { id: 'CUST-003', name: '123 기술', code: 'TECH123', contact: '박팀장', email: 'support@tech123.kr', phone: '032-345-6789', branches: 1, devices: 890, status: 'active' },
  ];

  return (
    <div className="space-y-6">
      <PrototypeNav />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">고객 관리</h1>
          <p className="text-gray-600">고객사(업체)를 등록하고 조회·수정합니다</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          고객 등록
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="고객명, 코드로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">고객 코드</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">고객명</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">담당자</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">연락처</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">지사 수</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">디바이스 수</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{c.code}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{c.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{c.contact}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-1"><Mail className="w-3 h-3" /> {c.email}</div>
                    <div className="flex items-center gap-1 text-gray-500"><Phone className="w-3 h-3" /> {c.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{c.branches}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{c.devices.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Link to="/prototype/branches" className="text-blue-600 hover:text-blue-700 text-sm mr-2">지사</Link>
                  <button className="p-1 rounded hover:bg-gray-200"><MoreHorizontal className="w-4 h-4 text-gray-500" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
