import { useState, useRef } from 'react'
import './ResizableWindow.css'

export const ResizableWindow = () => {
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
    return(
    <div className="resizable-ctn" ref={resizableCtn}>
        <div className="resizable resizable-tl" ref={resizableTopLeft}></div>
        <div className="resizable resizable-t" ref={resizableTop}></div>
        <div className="resizable resizable-tr" ref={resizableTopRight}></div>
        <div className="resizable resizable-l" ref={resizableLeft}></div>
        <div className="content-ctn" ref={resizableContentCtn}></div>
        <div className="resizable resizable-r" ref={resizableRight}></div>
        <div className="resizable resizable-bl" ref={resizableBotLeft}></div>
        <div className="resizable resizable-b" ref={resizableBot}></div>
        <div className="resizable resizable-br" ref={resizableBotRight}></div>

    </div>
    )
}