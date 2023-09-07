import React, { useEffect, useRef, useState } from 'react'
import './index.less'

const DrawableBox = () => {
    const drawableRef = useRef<boolean>(false)
    const boxRef = useRef<any>(null)
    const mouseDownPointRef = useRef<any>(null)

    const updateBoxWidth = (e:any) => {
        if (drawableRef.current) {
            const {clientX} = e 
            console.dir(boxRef.current)
            const widthDiff = clientX - boxRef.current.clientX
            console.dir({widthDiff, boxRef})
            boxRef.current.style.width = `${widthDiff}px`
        }
    }

    const handleLineMouseDown = (e:any) => {
        console.log(e, boxRef)
        drawableRef.current = true
        mouseDownPointRef.current = e
        document.onmousemove = updateBoxWidth
    }
    const handleMouseUp = () => {
        drawableRef.current = false
        mouseDownPointRef.current = null
        document.onmousemove = null
    }
    useEffect(() => {
        document.addEventListener('mouseup',() => {
            drawableRef.current = false
            mouseDownPointRef.current = null
            document.onmousemove = null
        })
    }, [])
    return (
        <div className='drawable-box' ref={boxRef}>
            Drawable Box
            <div 
                className='drawable-box-line'
                onMouseDown={handleLineMouseDown}
                onMouseUp={handleMouseUp}
            />
        </div>
    )
}

export default DrawableBox