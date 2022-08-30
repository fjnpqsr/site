/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-30 11:05:36
 * @LastEditTime: 2022-08-30 14:40:29
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\pages\portal\i18nSqlMaker\index.tsx
 */
import PageContainer from "@/components/PageContainer";
import { FC } from "react";

interface I18nSqlMakerProps {}

const tips = `
// 前置条件
// 1. 多语言词条存入Excel, 3列(key, enValue, arValue)
// 2. 将录入后的Excel导出为htm/html格式
// 3. 打开导出后的HTML页面, 在控制台输入一下代码后会输出多语言脚本
// ps: 如果无法输出或者报错, 可以尝试输入document.querySelectorAll("table tbody tr")获取行数据, 如果获取不到, F12 Element洁面定位到表格后再次尝试

`;

const WITH_ID_SCRIPT_TEMPLATE = `
INSERT INTO user_menu_multi_lang_cfg (user_menu_multi_lang_cfg_id, client_id, display_value, lang, client_type, menu ) VALUES ('{enIndex}','{key}','{value}', 'en', 'pc','{menu}');
INSERT INTO user_menu_multi_lang_cfg (user_menu_multi_lang_cfg_id, client_id, display_value, lang, client_type, menu ) VALUES ('{arIndex}','{key}', '{arValue}', 'ar', 'pc','{menu}');
`;

const template = `const WITH_ID_SCRIPT_TEMPLATE = \`${WITH_ID_SCRIPT_TEMPLATE}\``;

const code = `
function getSql(startIndex, menu) {
  let start = startIndex;
  let text = "";
  document.querySelectorAll("table tbody tr").forEach((item, index) => {
    const [keySlot, enValueSlot, arValueSlot] = item.children;
    const key = keySlot.innerText;
    const enValue = enValueSlot.innerText;
    const arValue = arValueSlot.innerText;
    start += 1;
    const enIndex = start;
    start += 1;
    const arIndex = start;
    if (key && key !== "key") {
      text += WITH_ID_SCRIPT_TEMPLATE.replace("{enIndex}", enIndex)
        .replace("{value}", enValue)
        .replace("{arIndex}", arIndex)
        .replace("{arValue}", arValue)
        .replaceAll("{key}", key)
        .replaceAll("{menu}", menu);
      text += "\\n";
    }
  });
  getSql(100, "Vehicles In Whitelists");`;

const I18nSqlMaker: FC<I18nSqlMakerProps> = () => {
  return (
    <PageContainer>
      <pre>
        <div>{tips}</div>
        <code>{template}</code>
        <code>{code}</code>
      </pre>
    </PageContainer>
  );
};

export default I18nSqlMaker;
