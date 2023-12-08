
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
    direction: null
  });
  const [stateX, setStateX] = useState(0)
  
  const handleMouseDown = (direction, e) => {
    setResizeParams({
      isResizing: true,
      direction: direction
    });
  };

  
  let x = 0
  let y = 0
  const handleMouseMove = (e) => {
    const min_size = 150
    let newWidth = 0
    let newHeight = 0
    let leftOffSet = 0
    let topOffSet = 0
    if (resizeParams.isResizing) {

      let deltaX = e.clientX - x
      x = e.clientX

      let deltaY = e.clientY - y
      y = e.clientY

        switch (resizeParams.direction) {
            case 'left':
                newWidth = resizableCtn.current.getBoundingClientRect().width - deltaX
                leftOffSet = resizableCtn.current.getBoundingClientRect().left + deltaX
                if (newWidth >= min_size && leftOffSet > 0) {
                  resizableCtn.current.style.width = `${newWidth}px`;
                  resizableCtn.current.style.left = `${leftOffSet}px`

                  console.log("newWidth: ", resizableCtn.current.style.width, "newLeft: ", resizableCtn.current.style.left)
                }
                break;
            case 'right':
                newWidth = e.clientX - resizableCtn.current.getBoundingClientRect().left
                if (newWidth >= min_size) {
                  resizableCtn.current.style.width = `${newWidth}px`;
                }
                break;
            case 'top':
                newHeight = resizableCtn.current.getBoundingClientRect().height - deltaY
                topOffSet = resizableCtn.current.getBoundingClientRect().top + deltaY
                if (newHeight >= min_size && topOffSet > 0) {
                  resizableCtn.current.style.height = `${newHeight}px`;
                  resizableCtn.current.style.top = `${topOffSet}px`
                }
                break;
            case 'bottom':
                newHeight = e.clientY - resizableCtn.current.getBoundingClientRect().top
                if (newHeight >= min_size) {
                  resizableCtn.current.style.height = `${newHeight}px`;
                }
                break;
            case 'top-left':
                newWidth = resizableCtn.current.getBoundingClientRect().width - deltaX
                leftOffSet = resizableCtn.current.getBoundingClientRect().left + deltaX
                if (newWidth >= min_size && leftOffSet > 0) {
                  resizableCtn.current.style.width = `${newWidth}px`;
                  resizableCtn.current.style.left = `${leftOffSet}px`
                }
                newHeight = resizableCtn.current.getBoundingClientRect().height - deltaY
                topOffSet = resizableCtn.current.getBoundingClientRect().top + deltaY
                if (newHeight >= min_size && topOffSet > 0) {
                  resizableCtn.current.style.height = `${newHeight}px`;
                  resizableCtn.current.style.top = `${topOffSet}px`
                }
                break;
            case 'bottom-left':
                newWidth = resizableCtn.current.getBoundingClientRect().width - deltaX
                leftOffSet = resizableCtn.current.getBoundingClientRect().left + deltaX
                if (newWidth >= min_size && leftOffSet > 0) {
                  resizableCtn.current.style.width = `${newWidth}px`;
                  resizableCtn.current.style.left = `${leftOffSet}px`
                }
                newHeight = e.clientY - resizableCtn.current.getBoundingClientRect().top
                if (newHeight >= min_size) {
                  resizableCtn.current.style.height = `${newHeight}px`;
                }
                break;
            case 'top-right':
                newWidth = e.clientX - resizableCtn.current.getBoundingClientRect().left
                if (newWidth > min_size) {
                  resizableCtn.current.style.width = `${newWidth}px`;
                }
                newHeight = resizableCtn.current.getBoundingClientRect().height - deltaY
                topOffSet = resizableCtn.current.getBoundingClientRect().top + deltaY
                if (newHeight >= min_size && topOffSet > 0) {
                  resizableCtn.current.style.height = `${newHeight}px`;
                  resizableCtn.current.style.top = `${topOffSet}px`
                }
                break;
            case 'bottom-right':
                newWidth = e.clientX - resizableCtn.current.getBoundingClientRect().left
                if (newWidth > min_size) {
                  resizableCtn.current.style.width = `${newWidth}px`;
                }
                newHeight = e.clientY - resizableCtn.current.getBoundingClientRect().top
                if (newHeight >= min_size) {
                  resizableCtn.current.style.height = `${newHeight}px`;
                }
                break;  
              
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
        <div className="resizable resizable-tl" ref={resizableTopLeft} onMouseDown={(e) => handleMouseDown('top-left', e)}></div>
        <div className="resizable resizable-t" ref={resizableTop} onMouseDown={(e) => handleMouseDown('top', e)}></div>
        <div className="resizable resizable-tr" ref={resizableTopRight} onMouseDown={(e) => handleMouseDown('top-right', e)}></div>
        <div className="resizable resizable-l" ref={resizableLeft} onMouseDown={(e) => handleMouseDown('left', e)}></div>
        <div className="content-ctn" ref={resizableContentCtn}>
        <div className="brick"></div>
        <div className="brick"></div>
        <div className="brick"></div>
        <div className="brick"></div>
        </div>
        <div className="resizable resizable-r" ref={resizableRight} onMouseDown={(e) => handleMouseDown('right', e)}></div>
        <div className="resizable resizable-bl" ref={resizableBotLeft} onMouseDown={(e) => handleMouseDown('bottom-left', e)}></div>
        <div className="resizable resizable-b" ref={resizableBot} onMouseDown={(e) => handleMouseDown('bottom', e)}></div>
        <div className="resizable resizable-br" ref={resizableBotRight} onMouseDown={(e) => handleMouseDown('bottom-right', e)}></div>

    </div>
    )
}

