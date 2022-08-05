/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-04 11:18:09
 * @LastEditTime: 2022-08-04 11:37:20
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\components\PageContainer\index.tsx
 */
import { FC } from "react";
import PageContainerHeader from "./Header";
import PageContainerViewContent from "./ViewContent";
import PageContainerFooter from "./Footer";

import css from "./index.less";
interface PageContainerProps {
  children?: React.ReactNode;
}

const PageContainer: FC<PageContainerProps> = (props) => {
  const { children } = props;
  return (
    <div className={css["page-container"]}>
      <PageContainerHeader />
      <PageContainerViewContent>{children}</PageContainerViewContent>
      <PageContainerFooter />
    </div>
  );
};

export default PageContainer;
