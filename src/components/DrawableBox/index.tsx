import React, { useEffect, useRef } from 'react';
import './index.less';

const DrawableBox = (): React.ReactElement => {
  const drawableRef = useRef<boolean>(false);
  const boxRef = useRef<any>(null);
  const mouseDownPointRef = useRef<any>(null);

  const updateBoxWidth = (e: MouseEvent): void => {
    if (drawableRef.current) {
      const { clientX } = e;
      const widthDiff = clientX - boxRef.current.clientX;
      boxRef.current.style.width = `${widthDiff}px`;
    }
  };

  const handleLineMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
    drawableRef.current = true;
    mouseDownPointRef.current = event;
    document.onmousemove = updateBoxWidth;
  };

  const handleMouseUp = (): void => {
    drawableRef.current = false;
    mouseDownPointRef.current = null;
    document.onmousemove = null;
  };

  useEffect(() => {
    document.addEventListener('mouseup', () => {
      drawableRef.current = false;
      mouseDownPointRef.current = null;
      document.onmousemove = null;
    });
  }, []);
  return (
		<div className='drawable-box' ref={boxRef}>
            Drawable Box
			<div
				className='drawable-box-line'
				onMouseDown={(e) => { handleLineMouseDown(e); }}
				onMouseUp={handleMouseUp}
			/>
		</div>
  );
};

export default DrawableBox;
