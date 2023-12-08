
import { useState, useRef, useEffect } from 'react'
import './ResizableWindow.css'

export const ResizableWindow = () => {
  const resizableCtn = useRef(null);
  const resizableTopLeft = useRef(null);
  const resizableTop = useRef(null);
  const resizableTopRight = useRef(null);
  const resizableLeft = useRef(null);
  const resizableRight = useRef(null);
  const resizableBotLeft = useRef(null);
  const resizableBotRight = useRef(null);
  const resizableBot = useRef(null);
  const resizableContentCtn = useRef(null);

  const [resizeParams, setResizeParams] = useState({
    isResizing: false,
    direction: null,
    startX: 0
  });
  const [stateX, setStateX] = useState(0)
  
  const handleMouseDown = (direction, e) => {
    setResizeParams({
      isResizing: true,
      direction: direction,
      startX: e.clientX
    });
  };

  
  let x = 0
  const handleMouseMove = (e) => {
    const minimum_size = 50
    
    if (resizeParams.isResizing) {
      let deltaX = e.clientX - x
      x = e.clientX
        switch (resizeParams.direction) {
            case 'left':
                let newWidth1 = resizableCtn.current.getBoundingClientRect().width - deltaX
                let newLeft1 = resizableCtn.current.getBoundingClientRect().left + deltaX
                if (newWidth1 > minimum_size && newLeft1 >= 0) {
                  resizableCtn.current.style.width = `${newWidth1}px`;
                  resizableCtn.current.style.left = `${newLeft1}px`

                  console.log("newWidth: ", resizableCtn.current.style.width, "newLeft: ", resizableCtn.current.style.left)
                }
                break;
            case 'right':
                const newWidth = e.clientX - resizableCtn.current.getBoundingClientRect().left
                if (newWidth > minimum_size) {
                  resizableCtn.current.style.width = `${newWidth}px`;
                }
                break;
                /*
            case 'bottom':
                newHeight = e.clientY - resizableCtn.current.getBoundingClientRect().top;
                resizableCtn.current.style.height = `${newHeight}px`;
                break;
            case 'bottom-right':
                newWidth = e.clientX - resizableCtn.current.getBoundingClientRect().left;
                newHeight = e.clientY - resizableCtn.current.getBoundingClientRect().top;
                resizableCtn.current.style.width = `${newWidth}px`;
                resizableCtn.current.style.height = `${newHeight}px`;
                break;*/
        }
      }
    
  };

  const handleMouseUp = () => {
    setResizeParams({
      isResizing: false,
      direction: null
    });
  };

  useEffect(() => {
    const cleanup = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    if (resizeParams.isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return cleanup;
  }, [resizeParams.isResizing]);
    return(
    <div className="resizable-ctn" ref={resizableCtn}>
        <div className="resizable resizable-tl" ref={resizableTopLeft}></div>
        <div className="resizable resizable-t" ref={resizableTop}></div>
        <div className="resizable resizable-tr" ref={resizableTopRight}></div>
        <div className="resizable resizable-l" ref={resizableLeft} onMouseDown={(e) => handleMouseDown('left', e)}></div>
        <div className="content-ctn" ref={resizableContentCtn}>
        <div className="brick"></div>
        <div className="brick"></div>
        <div className="brick"></div>
        <div className="brick"></div>
        </div>
        <div className="resizable resizable-r" ref={resizableRight} onMouseDown={(e) => handleMouseDown('right', e)}></div>
        <div className="resizable resizable-bl" ref={resizableBotLeft}></div>
        <div className="resizable resizable-b" ref={resizableBot} onMouseDown={(e) => handleMouseDown('bottom', e)}></div>
        <div className="resizable resizable-br" ref={resizableBotRight} onMouseDown={(e) => handleMouseDown('bottom-right', e)}></div>

    </div>
    )
}

