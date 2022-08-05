/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-04 09:15:44
 * @LastEditTime: 2022-08-05 15:04:03
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\app.ts
 */
import { history } from "umi";

function validateRouteIsNotExist(allRoutesPath: string[], pathname: "string") {
  if (!allRoutesPath.includes(pathname)) {
    // switch 404 page type
    if (pathname.indexOf("/portal") === 0) {
      history.replace("/portal/404");
    } else {
      history.replace("/404");
    }
  }
}

export function onRouteChange({ routes, location }: any) {
  const { pathname } = location;
  const allRoutesPath = Object.keys(routes)
    .filter((item) => !routes[item].isLayout)
    .map((item) =>
      routes[item].path === "/" ? routes[item].path : `/${routes[item].path}`
    );
  // check pathname is exist or not
  validateRouteIsNotExist(allRoutesPath, pathname);
}
