import { useResizable } from './useResizable';
import { useState, useRef, useEffect } from 'react'
import './ResizableWindow.css'

export const ResizableWindow = () => {
  
  const resizableTopLeft = useRef(null);
  const resizableTop = useRef(null);
  const resizableTopRight = useRef(null);
  const resizableLeft = useRef(null);
  const resizableRight = useRef(null);
  const resizableBotLeft = useRef(null);
  const resizableBotRight = useRef(null);
  const resizableBot = useRef(null);
  const resizableContentCtn = useRef(null);

const { resizableCtn, handleMouseDown } = useResizable();
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

