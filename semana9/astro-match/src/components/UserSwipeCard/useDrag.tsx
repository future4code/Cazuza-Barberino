import React from "react";

export interface Coord {
  x: number;
  y: number;
}

export interface DragData {
  coord: Coord;
  isDragging: boolean;
  mouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  mouseUp: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const useDrag = (): DragData => {
  const [isDragging, setIsDragging] = React.useState(false);

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

  return { coord, isDragging, mouseDown, mouseUp };
};
