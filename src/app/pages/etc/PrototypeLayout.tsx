import { Outlet } from 'react-router';
import { EtcPrototypeNav } from '../../components/etc/EtcPrototypeNav';

export function EtcPrototypeLayout() {
  return (
    <div className="space-y-6">
      <EtcPrototypeNav />
      <Outlet />
    </div>
  );
}
