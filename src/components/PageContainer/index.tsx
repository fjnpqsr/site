/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-04 11:18:09
 * @LastEditTime: 2022-08-29 15:06:50
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
  footer?: React.ReactNode;
  title?: string;
}

const PageContainer: FC<PageContainerProps> = (props) => {
  const { children, title, footer } = props;
  return (
    <div className={css["page-container"]}>
      <PageContainerHeader title={title} />
      <PageContainerViewContent>{children}</PageContainerViewContent>
      <PageContainerFooter footerContent={footer} />
    </div>
  );
};

export default PageContainer;
