/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-03 13:56:30
 * @LastEditTime: 2022-08-04 11:44:13
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\layouts\BasicLayout.tsx
 */
import { FC } from "react";
import { Outlet, history } from "umi";
import { Menu } from "antd";
import menusData from "@/constant/menu";
import css from "./BasicLayout.less";

const BasicLayout: FC<any> = () => {
  const handleMenuClick = (menuItem: any) => {
    history.push(menuItem.key);
  };

  return (
    <div className={css["basic-layout"]}>
      <aside className={css["menu-wrap"]}>
        <div className={css["menu-title"]}></div>
        <Menu
          items={menusData}
          onClick={handleMenuClick}
          className={css["menu"]}
        />
      </aside>
      <div className={css["layout-container"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default BasicLayout;
