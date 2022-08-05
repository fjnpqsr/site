/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-05 14:41:54
 * @LastEditTime: 2022-08-05 14:46:02
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\pages\portal\index.tsx
 */
import PageContainer from "@/components/PageContainer";
import { history } from "umi";
import { Button } from "antd";
import yayJpg from "@/assets/yay.jpg";

const PortalIndexPage = () => {
  return (
    <PageContainer>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
      <Button type="primary" onClick={() => history.push("/docs")}>
        to docs
      </Button>
      <Button type="primary" onClick={() => history.push("/login")}>
        to login
      </Button>
    </PageContainer>
  );
};

export default PortalIndexPage;
