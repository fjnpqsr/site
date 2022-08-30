#!/bin/bash

start_dir='E:/workplace/fjnpqsr.top/front-end/dist'
target_dir="E:/program/nginx-1.22.0/html/tools"

echo '>>> 开始构建应用'
npm run build

echo '>>> 应用构建成功'

echo '>>> 清空nginx目录下文件'${target_dir}

for f in `ls $target_dir`
do
  echo 'removing:'${target_dir}/${f} 
	`rm ${target_dir}/${f}`
done

echo '>>> 拷贝dist目录下文件至nginx目录下:'${target_dir}

for f in `ls $start_dir`
do
  echo 'coying:'${f} 
	cp -r $start_dir/$f $target_dir
done

echo '>>> 文件拷贝完成'

read -n 1






