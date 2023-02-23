/*
 * @Author: Qiu Shao Rong
 * @Date: 2023-02-16 14:17:57
 * @LastEditTime: 2023-02-16 14:45:38
 * @LastEditors: Qiu Shao Rong
 * @Description: 
 * @FilePath: \front-end\src\pages\portal\RoleDesign\index.tsx
 */
import './index.less'

import {Tree} from 'antd'

import PageContainer from '@/components/PageContainer'
import {mockMenuData} from '@/constant/mockMenu'


function getMenuData  (menuData: any= [], menuMap: any ={}, tailedMenus: any = []) {
    const menus = menuData.map((item:any) => {
        let nodeData:any ={
            key: item.menuId,
            value: item.menuId,
            title: item.menuName,
            className: `menu-type menu-type-${item.menuType}`,
            selectable: false,
        }
        if (item.subMenuList && item.subMenuList?.length) {
            nodeData.children = getMenuData(item.subMenuList, menuMap, tailedMenus).menus
        }
        return nodeData
    })

    return {
        menus,
        menuMap,
        tailedMenus,
    }
}


const RoleDesign = () => {
    const {menus} = getMenuData(mockMenuData, {}, [])
    console.log({menus})
    return (
        <PageContainer   >
            <Tree 
                className='role-tree'
                defaultExpandAll={true}
                autoExpandParent
                blockNode
                checkable
                treeData={menus}
            />
        </PageContainer>
    )
}

export default RoleDesign