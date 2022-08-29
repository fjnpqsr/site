/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-04 11:35:37
 * @LastEditTime: 2022-08-29 15:06:47
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\components\PageContainer\Footer\index.tsx
 */
import { FC } from "react";
import css from "./index.less";

interface PageContainerFooterProps {
  children?: React.ReactNode;
  footerContent?: React.ReactNode;
}

const PageContainerFooter: FC<PageContainerFooterProps> = (props) => {
  const { footerContent } = props;
  return <div className={css["page-container-footer"]}>{footerContent}</div>;
};

export default PageContainerFooter;
