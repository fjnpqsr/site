#!/bin/bash

start_dir='E:/workplace/fjnpqsr.top/front-end/dist'
target_dir="E:/program/nginx-1.22.0/html/tools"

echo '>>> 开始构建应用'
npm run build

echo '>>> 应用构建成功'

echo '>>> 清空nginx目录下文件'${target_dir}

rm -rf ${target_dir:?}/*

echo '>>> 拷贝dist目录下文件至nginx目录下:'${target_dir}

for distFile in "$start_dir"/*
do
  echo 'copying:'"${distFile}"
	cp -r "$distFile" $target_dir
done

echo '>>> 文件拷贝完成'

# shellcheck disable=SC2162
read -n 1






