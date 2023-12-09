import { useState, useRef, useEffect } from 'react';

export const useResizable = (minSize = 150) => {
  const resizableCtn = useRef(null);
  const [resizeParams, setResizeParams] = useState({
    isResizing: false,
    direction: null,
  });

  const handleMouseDown = (direction, e) => {
    setResizeParams({
      isResizing: true,
      direction: direction,
    });
  };

  let x = 0;
  let y = 0;
  const handleMouseMove = (e) => {
    let newWidth = 0
    let newHeight = 0
    let leftOffSet = 0
    let topOffSet = 0
    if (resizeParams.isResizing) {
      const deltaX = e.clientX - x;
      x = e.clientX;

      const deltaY = e.clientY - y;
      y = e.clientY;

      switch (resizeParams.direction) {
        case 'left':
                newWidth = resizableCtn.current.getBoundingClientRect().width - deltaX
                leftOffSet = resizableCtn.current.getBoundingClientRect().left + deltaX
                if (newWidth >= minSize && leftOffSet > 0) {
                  resizableCtn.current.style.width = `${newWidth}px`;
                  resizableCtn.current.style.left = `${leftOffSet}px`

                  console.log("newWidth: ", resizableCtn.current.style.width, "newLeft: ", resizableCtn.current.style.left)
                }
                break;
            case 'right':
                newWidth = e.clientX - resizableCtn.current.getBoundingClientRect().left
                if (newWidth >= minSize) {
                  resizableCtn.current.style.width = `${newWidth}px`;
                }
                break;
            case 'top':
                newHeight = resizableCtn.current.getBoundingClientRect().height - deltaY
                topOffSet = resizableCtn.current.getBoundingClientRect().top + deltaY
                if (newHeight >= minSize && topOffSet > 0) {
                  resizableCtn.current.style.height = `${newHeight}px`;
                  resizableCtn.current.style.top = `${topOffSet}px`
                }
                break;
            case 'bottom':
                newHeight = e.clientY - resizableCtn.current.getBoundingClientRect().top
                if (newHeight >= minSize) {
                  resizableCtn.current.style.height = `${newHeight}px`;
                }
                break;
            case 'top-left':
                newWidth = resizableCtn.current.getBoundingClientRect().width - deltaX
                leftOffSet = resizableCtn.current.getBoundingClientRect().left + deltaX
                if (newWidth >= minSize && leftOffSet > 0) {
                  resizableCtn.current.style.width = `${newWidth}px`;
                  resizableCtn.current.style.left = `${leftOffSet}px`
                }
                newHeight = resizableCtn.current.getBoundingClientRect().height - deltaY
                topOffSet = resizableCtn.current.getBoundingClientRect().top + deltaY
                if (newHeight >= minSize && topOffSet > 0) {
                  resizableCtn.current.style.height = `${newHeight}px`;
                  resizableCtn.current.style.top = `${topOffSet}px`
                }
                break;
            case 'bottom-left':
                newWidth = resizableCtn.current.getBoundingClientRect().width - deltaX
                leftOffSet = resizableCtn.current.getBoundingClientRect().left + deltaX
                if (newWidth >= minSize && leftOffSet > 0) {
                  resizableCtn.current.style.width = `${newWidth}px`;
                  resizableCtn.current.style.left = `${leftOffSet}px`
                }
                newHeight = e.clientY - resizableCtn.current.getBoundingClientRect().top
                if (newHeight >= minSize) {
                  resizableCtn.current.style.height = `${newHeight}px`;
                }
                break;
            case 'top-right':
                newWidth = e.clientX - resizableCtn.current.getBoundingClientRect().left
                if (newWidth > minSize) {
                  resizableCtn.current.style.width = `${newWidth}px`;
                }
                newHeight = resizableCtn.current.getBoundingClientRect().height - deltaY
                topOffSet = resizableCtn.current.getBoundingClientRect().top + deltaY
                if (newHeight >= minSize && topOffSet > 0) {
                  resizableCtn.current.style.height = `${newHeight}px`;
                  resizableCtn.current.style.top = `${topOffSet}px`
                }
                break;
            case 'bottom-right':
                newWidth = e.clientX - resizableCtn.current.getBoundingClientRect().left
                if (newWidth > minSize) {
                  resizableCtn.current.style.width = `${newWidth}px`;
                }
                newHeight = e.clientY - resizableCtn.current.getBoundingClientRect().top
                if (newHeight >= minSize) {
                  resizableCtn.current.style.height = `${newHeight}px`;
                }
                break;  
      }
    }
  };

  const handleMouseUp = () => {
    setResizeParams({
      isResizing: false,
      direction: null,
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

  return { resizableCtn, handleMouseDown };
};


