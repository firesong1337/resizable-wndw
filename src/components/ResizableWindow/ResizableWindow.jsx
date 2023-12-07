import { useState, useRef, useEffect } from 'react'
import './ResizableWindow.css'

export const ResizableWindow = () => {
    /*
    const resizableCtn= useRef(null)
    const resizableTopLeft = useRef(null)
    const resizableTop = useRef(null)
    const resizableTopRight = useRef(null)
    const resizableLeft = useRef(null)
    const resizableRight = useRef(null)
    const resizableBotLeft = useRef(null)
    const resizableBotRight = useRef(null)
    const resizableBot = useRef(null)
    const resizableContentCtn = useRef(null)

    const [isResizing, setIsResizing] = useState(false);

    const handleMouseDown = (e) => {
        setIsResizing(true);
      };
    
      const handleMouseMove = (e) => {
        if (isResizing) {
            
          const newWidth = e.clientX - resizableCtn.current.getBoundingClientRect().left;
          const newWidth2 = e.clientX - resizableContentCtn.current.getBoundingClientRect().left;
          resizableCtn.current.style.width = `${newWidth}px`;
          resizableContentCtn.current.style.width = `${newWidth2}px`;
        }
      };
    
      const handleMouseUp = () => {
        setIsResizing(false);
      };
    
      useEffect(() => {
        const cleanup = () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
    
        if (isResizing) {
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }
    
        return cleanup;
      }, [isResizing]);*/
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
    startX: 0,
    startY: 0,
  });
  
  const handleMouseDown = (direction, e) => {
    setResizeParams({
      isResizing: true,
      direction: direction,
      startX: e.clientX,
      startY: e.clientY,
    });
    console.log("bounding right 1: ",resizableCtn.current.getBoundingClientRect().right)
  };

  const handleMouseMove = (e) => {
    let newWidth = 0
    let newHeight = 0
    let startWidth =  resizableCtn.current.offsetWidth;
    console.log(startWidth)
    if (resizeParams.isResizing) {
        console.log("Start X: ",resizeParams.startX)
        console.log("bounding right: ",resizableCtn.current.getBoundingClientRect().right)

        const deltaX = e.clientX - resizeParams.startX;
        const deltaY = e.clientY - resizeParams.startY;
        console.log("deltaX: ",deltaX)

        switch (resizeParams.direction) {
            case 'left':
                newWidth = resizableCtn.current.getBoundingClientRect().left + deltaX;
                resizableCtn.current.style.width = `${newWidth}px`;
                resizableCtn.current.style.left = `${deltaX}px`
                break;
            case 'right':
                //newWidth = resizeParams.startX + deltaX;
                //newWidth = resizableCtn.current.getBoundingClientRect().right + deltaX;
                newWidth = resizableCtn.current.offsetWidth + deltaX;
                resizableCtn.current.style.width = `${newWidth}px`;
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
      direction: null,
      startX: 0,
      startY: 0,
    });
  };

  useEffect(() => {
    const cleanup = () => {
      // Cleanup event listeners when the component unmounts
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    if (resizeParams.isResizing) {
      // Add event listeners when the component mounts
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