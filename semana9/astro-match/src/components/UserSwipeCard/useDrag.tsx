import React from "react";

export interface Coord {
  x: number;
  y: number;
}

export interface DragData {
  coord: Coord;
  isDragging: boolean;
  itemRef: React.Ref<HTMLDivElement> | null;
  mouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  mouseUp: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const useDrag = (): DragData => {
  const itemRef = React.useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = React.useState(false);

  const [rect, setRect] = React.useState<DOMRect>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
    toJSON: () => {},
  });

  const [coord, setCoord] = React.useState<Coord>({
    x: 0,
    y: 0,
  });

  const offset = React.useRef<Coord>({
    x: 0,
    y: 0,
  });

  const mouseMove = React.useCallback(
    (
      event:
        | globalThis.MouseEvent
        | React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      setCoord({
        x: event.clientX - offset.current.x,
        y: event.clientY - offset.current.y,
      });
    },
    []
  );

  const mouseDown = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsDragging(true);
      offset.current = { x: event.clientX, y: event.clientY };
      mouseMove(event);
      window.addEventListener("mousemove", mouseMove);
    },
    [mouseMove]
  );

  const mouseUp = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setIsDragging(false);
      window.removeEventListener("mousemove", mouseMove);
    },
    [mouseMove]
  );

  React.useLayoutEffect(() => {
    if (itemRef.current) {
      const newRect = itemRef.current.getBoundingClientRect();
      setRect(newRect);
    }
  }, []);

  return { coord, isDragging, itemRef, mouseDown, mouseUp };
};
