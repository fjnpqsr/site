/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-03 11:22:59
 * @LastEditTime: 2022-08-05 14:48:59
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\layouts\index.tsx
 */
import { Outlet, useLocation } from "umi";
import BasicLayout from "./BasicLayout";

const basicLayoutPath = "/portal";

export default function Layout() {
  const location = useLocation();
  const isNotUseBasicLayout = location.pathname.indexOf(basicLayoutPath) === 0;
  if (isNotUseBasicLayout) {
    return <BasicLayout />;
  }
  return <Outlet />;
}
