/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-04 11:30:41
 * @LastEditTime: 2022-08-04 11:32:06
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\components\PageContainer\ViewContent\index.tsx
 */
import { FC } from "react";
import css from "./index.less";

interface PageContainerViewContentProps {
  children?: React.ReactNode;
}

const PageContainerViewContent: FC<PageContainerViewContentProps> = ({
  children,
}) => {
  return <div className={css["page-container-view-content"]}>{children}</div>;
};

export default PageContainerViewContent;
