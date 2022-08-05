/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-03 13:52:05
 * @LastEditTime: 2022-08-04 14:18:23
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\pages\Login\index.tsx
 */
import { history } from "umi";
import { Button } from "antd";
const LoginPage = () => {
  return (
    <div>
      Login page
      <Button
        onClick={() => {
          history.back();
        }}
      >
        back
      </Button>
    </div>
  );
};
export default LoginPage;
