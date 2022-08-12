/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-04 11:35:37
 * @LastEditTime: 2022-08-12 16:02:17
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\components\PageContainer\Footer\index.tsx
 */
import { FC } from "react";
import css from "./index.less";

interface PageContainerFooterProps {
  children?: React.ReactNode;
}

const PageContainerFooter: FC<PageContainerFooterProps> = () => {
  return <div className={css["page-container-footer"]}></div>;
};

export default PageContainerFooter;
