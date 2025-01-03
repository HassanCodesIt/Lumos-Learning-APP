import React from 'react';
import { useGesture } from '@use-gesture/react';

interface DrawingCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const DrawingCanvas = ({ canvasRef }: DrawingCanvasProps) => {
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [lastPoint, setLastPoint] = React.useState({ x: 0, y: 0 });

  const bind = useGesture({
    onDragStart: ({ event }) => {
      setIsDrawing(true);
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = (event as MouseEvent).clientX - rect.left;
      const y = (event as MouseEvent).clientY - rect.top;
      setLastPoint({ x, y });
    },
    onDrag: ({ event }) => {
      if (!isDrawing || !canvasRef.current) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = (event as MouseEvent).clientX - rect.left;
      const y = (event as MouseEvent).clientY - rect.top;
      
      ctx.beginPath();
      ctx.moveTo(lastPoint.x, lastPoint.y);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      setLastPoint({ x, y });
    },
    onDragEnd: () => setIsDrawing(false),
  });

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="w-full aspect-square bg-gray-50 rounded-lg border-2 border-gray-200"
      {...bind()}
    />
  );
};

export default DrawingCanvas;