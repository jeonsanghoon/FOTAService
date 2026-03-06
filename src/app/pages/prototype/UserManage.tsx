import { useState } from 'react';
import { PrototypeNav } from '../../components/prototype/PrototypeNav';
import { Search, Plus, User, Mail, Shield, MoreHorizontal } from 'lucide-react';

export function PrototypeUserManage() {
  const [searchQuery, setSearchQuery] = useState('');

  const users = [
    { id: 'U-001', name: '김관리', email: 'admin@abc.co.kr', role: 'admin', customer: 'ABC 전자', branch: '서울 본사', status: 'active', lastLogin: '2026-03-06 14:20' },
    { id: 'U-002', name: '이운영', email: 'ops@abc.co.kr', role: 'operator', customer: 'ABC 전자', branch: '서울 본사', status: 'active', lastLogin: '2026-03-06 13:55' },
    { id: 'U-003', name: '박담당', email: 'manager@xyz.com', role: 'admin', customer: 'XYZ 산업', branch: '부산 지사', status: 'active', lastLogin: '2026-03-06 12:30' },
    { id: 'U-004', name: '최뷰어', email: 'viewer@tech123.kr', role: 'viewer', customer: '123 기술', branch: '인천 공장', status: 'active', lastLogin: '2026-03-05 18:00' },
  ];

  const roleBadge: Record<string, string> = {
    admin: 'bg-purple-100 text-purple-800',
    operator: 'bg-blue-100 text-blue-800',
    viewer: 'bg-gray-100 text-gray-800',
  };
  const roleLabel: Record<string, string> = {
    admin: '관리자',
    operator: '운영자',
    viewer: '조회자',
  };

  return (
    <div className="space-y-6">
      <PrototypeNav />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">사용자 관리</h1>
          <p className="text-gray-600">FOTA 콘솔 접근 사용자를 등록하고 권한을 관리합니다</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          사용자 등록
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="이름, 이메일로 검색..."
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이름</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이메일</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">역할</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">고객 / 지사</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">마지막 로그인</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{u.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    {u.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${roleBadge[u.role]}`}>
                    {roleLabel[u.role]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {u.customer} / {u.branch}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.lastLogin}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="text-blue-600 hover:text-blue-700 text-sm mr-2">권한 수정</button>
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
