import PageContainer from '@/components/PageContainer'
import DrawableBox from '@/components/DrawableBox'
import React from 'react'
import './index.less'

const DrawableBoxDemo = () => {
    return (
        <div className='drawable-demo'>
            <DrawableBox />
            <div className='content'>Drawable Box</div>
        </div>
    )
}

export default DrawableBoxDemo