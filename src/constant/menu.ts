/*
 * @Author: Qiu Shao Rong
 * @Date: 2022-08-03 14:12:09
 * @LastEditTime: 2023-04-20 09:43:15
 * @LastEditors: Qiu Shao Rong
 * @Description:
 * @FilePath: \front-end\src\constant\menu.ts
 */

const menusData = [
    {
        label: '从EXCEL导出多语言脚本',
        key: '/portal/i18nSqlMaker',
    },
    {
        label: '生成多语言脚本',
        key: '/portal/i18nGenerator',
    },
    {
        label: 'Merge Testing Steps',
        key: '/portal/mergeStepsText',
    },
    {
        label: 'CCTV',
        key: '/portal/CCT',
        children: [
            {
                label: '车辆伴随数据生成',
                key: '/portal/vehicleAccompanyDataGenerator',
            },
            {
                label: 'Plate Number Input',
                key: '/portal/plateNumberForm',
            },
            {
                label: '生成MQ消息',
                key: '/portal/mqGenerator',
            },
        ]
    },
];

export default menusData;
