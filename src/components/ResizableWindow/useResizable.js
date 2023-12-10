import { useState, useRef, useEffect, useCallback } from "react";

// minSize разбить на minWidth/Height и maxWidth/Height
export const useResizable = (minSize = 150) => {
  const resizableCtn = useRef(null);

  // попытаться отказаться от useState
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
  
  const handleResize = useCallback((newWidth, leftOffset, newHeight, topOffset) => {
    if (newWidth >= minSize && leftOffset >= 0) {
      resizableCtn.current.style.width = `${newWidth}px`;
      resizableCtn.current.style.left = `${leftOffset}px`;
    }
  
    if (newHeight >= minSize && topOffset >= 0) {
      resizableCtn.current.style.height = `${newHeight}px`;
      resizableCtn.current.style.top = `${topOffset}px`;
    }
  },[minSize])

  const handleDirection = useCallback((bound, deltaX, deltaY) => {
    switch (resizeParams.direction) {
      case "left":
        handleResize(bound.width - deltaX, bound.left + deltaX, bound.height, bound.top);
        break;
      case "right":
        handleResize(deltaX, bound.left, bound.height, bound.top);
        break;
      case "top":
        handleResize(bound.width, bound.left, bound.height - deltaY, bound.top + deltaY);
        break;
      case "bottom":
        handleResize(bound.width, bound.left, deltaY, bound.top);
        break;
      case "top-left":
        handleResize(bound.width - deltaX, bound.left + deltaX, bound.height - deltaY, bound.top + deltaY);
        break;
      case "bottom-left":
        handleResize(bound.width - deltaX, bound.left + deltaX, deltaY, bound.top);
        break;
      case "top-right":
        handleResize(deltaX, bound.left, bound.height - deltaY, bound.top + deltaY);
        break;
      case "bottom-right":
        handleResize(deltaX, bound.left, deltaY, bound.top);
        break;
      default:
        throw new Error("");
    }
  },[resizeParams.direction, handleResize])

  const handleMouseMove = useCallback(
    (e) => {
      const bound = resizableCtn.current.getBoundingClientRect();
      let newWidth = bound.width;
      let newHeight = bound.height;
      let leftOffset = bound.left;
      let topOffset = bound.top;
      console.log({newWidth, newHeight, leftOffset, topOffset})
      if (resizeParams.isResizing) {
        const deltaX = e.clientX - leftOffset;
        const deltaY = e.clientY - topOffset;
        handleDirection(bound, deltaX, deltaY)
      }
    },
    [resizeParams.isResizing, handleDirection]
  );

  const handleMouseUp = () => {
    setResizeParams({
      isResizing: false,
      direction: null,
    });
  };

  useEffect(() => {
    // подписка по рефу
    if (resizeParams.isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
  };
  }, [handleMouseMove, resizeParams.isResizing]);

  return { resizableCtn, handleMouseDown };
};
