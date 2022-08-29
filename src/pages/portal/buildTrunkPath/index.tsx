/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-29 15:16:18
 * @LastEditTime: 2022-08-29 15:46:13
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\pages\portal\buildTrunkPath\index.tsx
 */
import PageContainer from "@/components/PageContainer";
import { FC } from "react";
import { Input, Button } from "antd";
import css from "./index.less";

interface BuildTrunkPathProps {}

const { TextArea } = Input;

const BuildTrunkPath: FC<BuildTrunkPathProps> = () => {
  return (
    <PageContainer footer={null}>
      <div className={css["page-buildTrunkPath"]}>
        <div>
          <Input allowClear placeholder="请输入trunk分支名称" />
          <TextArea
            style={{ flex: 1, marginTop: "12px", resize: "none" }}
            allowClear
            placeholder="请输入文件相对路径(多条记录换行输入)"
          />
        </div>
        <div className={css["result-view"]}>
          <Button type="primary" style={{ marginBottom: "12px" }}>
            Transform
          </Button>
          <div>123</div>
        </div>
      </div>
    </PageContainer>
  );
};

export default BuildTrunkPath;
