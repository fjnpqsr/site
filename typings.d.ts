/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-03 11:22:59
 * @LastEditTime: 2022-08-03 13:42:26
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\typings.d.ts
 */
import "umi/typings";
declare type IBabelPlugin =
  | Function
  | string
  | [
      string,
      {
        [key: string]: any;
      }
    ];
