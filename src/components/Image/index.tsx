/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-11 10:01:15
 * @LastEditTime: 2022-08-12 15:50:35
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\components\Image\index.tsx
 */
import { FC, useEffect, useState } from "react";
import { Image } from "antd";

interface ImageProps {
  src: string;
  withToken?: boolean;
  [key: string]: any;
}

const AuthImage: FC<ImageProps> = (props) => {
  const { src, withToken, ...passProps } = props;
  const [antdImageSrc, setAntdImageSrc] = useState<any>();

  const getImage = () => {
    var request = new XMLHttpRequest();
    request.responseType = "blob";
    request.open("get", src, true);
    request.setRequestHeader("auth-token", "test request token");
    request.onreadystatechange = () => {
      if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
        const src = URL.createObjectURL(request.response);
        setAntdImageSrc(src);
      }
    };
    request.send(null);
  };

  useEffect(() => {
    if (withToken) {
      getImage();
    }
  }, []);
  if (withToken) {
    return <Image src={antdImageSrc} {...passProps} alt="" />;
  }
  return <Image src={src} {...passProps} alt="" />;
};

export default AuthImage;
