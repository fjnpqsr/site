/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-03 11:22:59
 * @LastEditTime: 2022-08-05 14:50:09
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\pages\index.tsx
 */
import { Button } from "antd";
import { history } from "umi";

export default function HomePage() {
  // config to replace to home page
  history.replace("/portal");
  return null;
}
