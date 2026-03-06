import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { CustomerInfo } from "./pages/CustomerInfo";
import { DeveloperInfo } from "./pages/DeveloperInfo";
import { PrototypeDashboard } from "./pages/prototype/Dashboard";
import { PrototypeUpdateManager } from "./pages/prototype/UpdateManager";
import { PrototypeDeviceList } from "./pages/prototype/DeviceList";
import { PrototypeLogViewer } from "./pages/prototype/LogViewer";
import { PrototypeCustomerManage } from "./pages/prototype/CustomerManage";
import { PrototypeBranchManage } from "./pages/prototype/BranchManage";
import { PrototypeUserManage } from "./pages/prototype/UserManage";
import { PrototypeSSOIntegration } from "./pages/prototype/SSOIntegration";
import { EtcLayout } from "./components/etc/EtcLayout";
import { EtcRelated } from "./pages/etc/Related";
import { EtcPrototypeLayout } from "./pages/etc/PrototypeLayout";
import { EtcUpdateManager } from "./pages/etc/EtcUpdateManager";
import { EtcLogViewer } from "./pages/etc/EtcLogViewer";
import { EtcPrototypeDashboard } from "./pages/etc/prototype/Dashboard";
import { EtcPrototypeSSOIntegration } from "./pages/etc/prototype/SSOIntegration";
import { EtcPrototypeDeviceList } from "./pages/etc/prototype/Devices";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "customer", Component: CustomerInfo },
      { path: "developer", Component: DeveloperInfo },
      { path: "prototype/dashboard", Component: PrototypeDashboard },
      { path: "prototype/sso", Component: PrototypeSSOIntegration },
      { path: "prototype/customers", Component: PrototypeCustomerManage },
      { path: "prototype/branches", Component: PrototypeBranchManage },
      { path: "prototype/users", Component: PrototypeUserManage },
      { path: "prototype/devices", Component: PrototypeDeviceList },
      { path: "prototype/updates", Component: PrototypeUpdateManager },
      { path: "prototype/logs", Component: PrototypeLogViewer },
    ],
  },
  {
    path: "/etc",
    Component: EtcLayout,
    children: [
      { index: true, Component: EtcRelated },
      { path: "prototype", Component: EtcPrototypeLayout, children: [
        { index: true, Component: EtcPrototypeDashboard },
        { path: "sso", Component: EtcPrototypeSSOIntegration },
        { path: "devices", Component: EtcPrototypeDeviceList },
        { path: "updates", Component: EtcUpdateManager },
        { path: "logs", Component: EtcLogViewer },
      ]},
    ],
  },
]);