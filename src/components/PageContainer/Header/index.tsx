/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-04 11:23:28
 * @LastEditTime: 2022-08-29 15:06:09
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\components\PageContainer\Header\index.tsx
 */
import css from "./index.less";
import { FC } from "react";

interface PageContainerHeaderProps {
  title?: string;
}
const PageContainerHeader: FC<PageContainerHeaderProps> = (props) => {
  const { title } = props;
  return <div className={css["page-container-header"]}>{title}</div>;
};
export default PageContainerHeader;
