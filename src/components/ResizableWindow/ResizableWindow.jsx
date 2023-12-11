import { useResizable } from "./useResizable";
import "./ResizableWindow.css";

export const ResizableWindow = () => {
  const { resizableCtn, handleMouseDown } = useResizable();
  return (
    <div className="resizable-ctn" ref={resizableCtn}>
      <div
        draggable={false}
        className="resizable resizable-tl"
        onMouseDown={(e) => handleMouseDown("top-left", e)}
      />
      <div
        draggable={false}
        className="resizable resizable-t"
        onMouseDown={(e) => handleMouseDown("top", e)}
      />
      <div
        draggable={false}
        className="resizable resizable-tr"
        onMouseDown={(e) => handleMouseDown("top-right", e)}
      />
      <div
        draggable={false}
        className="resizable resizable-l"
        onMouseDown={(e) => handleMouseDown("left", e)}
      />
      <div className="content-ctn">
        <div className="brick" />
        <div className="brick" />
        <div className="brick" />
        <div className="brick" />
      </div>
      <div
        draggable={false}
        className="resizable resizable-r"
        onMouseDown={(e) => handleMouseDown("right", e)}
      />
      <div
        draggable={false}
        className="resizable resizable-bl"
        onMouseDown={(e) => handleMouseDown("bottom-left", e)}
      />
      <div
        draggable={false}
        className="resizable resizable-b"
        onMouseDown={(e) => handleMouseDown("bottom", e)}
      />
      <div
        draggable={false}
        className="resizable resizable-br"
        onMouseDown={(e) => handleMouseDown("bottom-right", e)}
      />
    </div>
  );
};
