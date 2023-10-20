/*
 * @Author: Qiu Shao Rong
 * @Date: 2023-04-20 09:32:30
 * @LastEditTime: 2023-04-20 15:06:03
 * @LastEditors: Qiu Shao Rong
 * @Description: 
 * @FilePath: \front-end\src\pages\portal\vehicleAccompanyDataGenerator\index.tsx
 */
import { Button,Form, Space, Steps }  from 'antd'
import React, { useState } from 'react'

import PageContainer from '@/components/PageContainer'

import ESResult from './components/ESResult'
import TargetVehicleTrackLine from './components/TargetVehicleTrackLine'
import TargetVehicleTrackTable from './components/TargetVehicleTrackTable'
import css from './index.module.less'

const VehicleAccompanyDataGenerator = () => {
    const [current, setCurrent] = useState(0)
    const [vehicleTrackForm] = Form.useForm()
    const [targetVehicleTrackPath, setTargetVehicleTrackPath] = useState<any>({})
    const [dataSource, setDataSource] = useState<any>([]);
    const [esResult, setEsResult] = useState<any>([]) 
 
    const vehicleESTemplate = {
        "specialVehicleClassReliability": 0.75,
        "localFeatureData": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
        "localFeatureDataLength": 512,
        "vehicleStylesReliability": 0,
        "calling": "no_calling",
        "vehicleBrandReliability": 0,
        "vehicleClass": "car",
        "feature": "aWMuPJKx7L02S0I9MMGgPaE3CjzUQbQ8xwoOvcJbSL1zAoe8Br8BvpBLkb0ZtcS9YgqYveVSRb2YJ5k97hlyvBR9uTx/U8+9qVP0PFfDlT3dH8E9YXybvNDU8D0smcw8EjOXPWD81zyh1dy8ISotvY92HL04lNY89skgvZdZGr1mr0C7LTMlvvpZHr2dTMQ8mcCNPQjLrTwrd1y9A+D9vG2b5D2BjkC9FwS1vX+e3bsDRPC8NQUYPUs5x7yCG109ydzGOxJAW7ytNQy9zr/avCMhVD3LLJ69loMyvK+KkjzPF9i80nb0PCOtSL3Y8nY8vxWjPNsED7zje+u7gXVsvTeYKr3aZYS8CqwzvJVCjD3+RfO9NHfWu19yCL6FTJU7igCIPZiSyjuDPKk98pJGPZaLgD1vmZC9SQ3FPMMbRD1SnIi91hI6O+KHkT3iud09RqMcvCp0/r3z/jq9GfGOPX+slTtjoRG95JTiPKPQ6jy8LlQ9P3EUvkmwpr32VH+8eXItvP3Ad73q9pm89JvOvekKi71cZMi7JvYPPU8+RT3hRIE9oPkQvOGZ072M+cY8XqWYvCYnWzweIZE9KD1yPRtBDz5iOQE+Mk7aujfihbwGlr27lTKavdYzCLw5lmi9GfNGve2rkzsk/fa9VcQrvfCZC7xn4M09l6vvvCye4bow9l89h6I1O4fHzz3hDpE8N57EPJeHHL4pQow7arZRvTtm37x4gqu825gHPeZzJD4Kwis9hMrJvWkaMjyCzAO+CGqEvFwwsLyxWFk9qdXCPUQUHD0LdrC9K5nMvXprVTxyFgu90lvJvW/zBL4Zcrm9/c14PXX+kr01WAw9dIriPEtjbD3vX5y7A49lu+WMuDzOqnW98VvmvKiXFL49X909rFjNPUNzLDzXXZU90snovPSpgr0C0qi7l57IPftNtb19xak8L6COPehGbruf8Py8GKYLvCEJZrzcQ3c9ygi6uknTp72izic9t8VyPPlpBrs0Zuc8ou4qvZaHGb05nzw9zxhavXWLaT1i2Le9i14jvR/BTT0uhAa8AcWcPJGMgjysCVw8YrWRO2ndn73tOEs9RWv9PQO+Mz0DA489anGVvTOD7715W8+6yR6DPVA3jb17VqW75SQPPZqrXT6N0BY9/miovZfdqb1qaiW9ufievR7lKz3gWmu9u9tGPSY01ztCCyM9/2awvD5jpDxdLxI+YslFvSwmxzslG7W8e7oXPQ8W3TvgbAE6qe9ivY9LjD1HQQm9h0M3vQVlhLyteww92VCtvSqG3D1QnUK9OoKJPYomqL0ECki9iwvgPL0Ear0n/NY8NCQAOwzrtjs5KjU9R6x2PT+Qkz0FSpS8B7J5PQ==",
        "detectionScore": 0.887984573841095,
        "objLeft": 738,
        "safetyBelt": "wearing",
        "plateColorReliability": 0.85,
        "vehicleColorReliability": 0.81,
        "objType": "vehicle",
        "safetyBeltReliability": 1,
        "objTop": 69,
        "plateClassReliability": 0.85,
        "objBottom": 337,
        "vehicleStyles": "",
        "plateNoReliability": 0,
        "specialVehicleClass": "others",
        "vehicleModelReliability": 0,
        "vendor": "alibaba",
        "vehicleBrand": "others",
        "vehicleModel": "",
        "objTypeScore": 0.887984573841095,
        "objAngle": -34.11882198880461,
        "vehicleClassReliability": 0.75,
        "vehicleColor": "blue",
        "sunvisorReliability": 0,
        "sunvisor": "pic_up",
        "algorithmVersion": "vcs-51905-a0002-t4-v7.0-20210119",
        "plateColor": "white",
        "callingReliability": 1,
        "objRight": 1034,
        "objAreas": 79328,
        "cropImage": "mock/3.jpg",
        "forwardCropImage": "mock/3.jpg",
        "origImage": "mock/3.jpg",
        "forwardOrigImage": "mock/3.jpg",
        "plateNo": "3895GSD",
        "plateClass": "private_car",
        "entryTime": 1681799158000,
        "timestamp": 1681799158000,
        "createTime": 1681799158000,
        "cameraId": "34020000001320000149",
        "algorithm": 59,
        "objId": "34020000001320000149#3df3ade15ecf4076acd94bb32c5574ca_1681799158000",
        "recordID": "34020000001320000149#3df3ade15ecf4076acd94bb32c5574ca_1681799158000"
    }

    const steps = [
        {
            title: '创建目标车辆轨迹',
            content: <TargetVehicleTrackLine form={vehicleTrackForm} />
        },
        {
            title: '在轨迹点上创建伴随车辆',
            content: (
                <TargetVehicleTrackTable  
                    data={targetVehicleTrackPath}
                    dataSource={dataSource}
                    setDataSource={setDataSource}
                />
            )
        },
        {
            title: '生成es数据',
            content: (
                <ESResult data={esResult}/>
            )
        },
    ]

    const handleNext = () => {
       if (current === 0) {
            vehicleTrackForm.validateFields().then((values:any) => {
                console.log({values})
                setTargetVehicleTrackPath(values)
                setCurrent((pre) => pre + 1)
            })
       }
       if (current === 1) {
            console.log({dataSource})
            const allVehicles:any = []
            dataSource.forEach((item:any) => {
                const {children = [], ...rest} = item
                allVehicles.push(rest)
                if (children.length) {
                    children.forEach((child:any) => {
                        allVehicles.push(child) 
                    })
                }
            })
            const reuslt:any = allVehicles.map((item: any, index: number) => {
                const timestamp = new Date().valueOf()
                return {
                    ...vehicleESTemplate,
                    cameraId: item.cameraId,
                    plateNo: item.plateNo || item.plateNum,
                    entryTime: item.capturedTime || item.time,
                    timestamp: item.capturedTime || item.time,
                    createTime: item.capturedTime || item.time,
                    cropImage: item.image,
                    forwardCropImage: item.image,
                    origImage: item.image,
                    forwardOrigImage: item.image,
                    objId: `${item.cameraId}#3df3ade15ecf4076acd94bb32c5574ca_${timestamp}${index}`,
                    recordID: `${item.cameraId}#3df3ade15ecf4076acd94bb32c5574ca_${timestamp}${index}`
                }
            })
            setEsResult(reuslt)
            setCurrent((pre) => pre + 1)
       }
        
    }

    return (
        <PageContainer>
            <Steps items={steps} current={current}/>
            <div className={css['content-wrapper']}>
                {steps[current].content}
            </div>
            <div>
                <Space>
                    {current>0 && (
                        <Button
                            onClick={() => {
                                setCurrent((pre) => pre - 1)
                            }}
                        >Prev</Button>
                    )}
                    {current < steps.length -1 && (
                        <Button
                            onClick={handleNext}
                        >Next</Button>
                    )}
                     {current === steps.length -1 && (
                        <Button
                            onClick={() => {
                                if (current === 2) {
                                    setEsResult([])
                                }
                                if (current === 1) {
                                    setTargetVehicleTrackPath({})
                                }
                                setCurrent((pre) => pre - 1)
                            }}
                        >Done</Button>
                    )}
                </Space>
            </div>
        </PageContainer>
    )
}

export default VehicleAccompanyDataGenerator