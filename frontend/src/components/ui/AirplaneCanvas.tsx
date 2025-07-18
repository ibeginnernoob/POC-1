import React, { useEffect, useRef } from 'react';

const AirplaneCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const height = canvas.height;
    const width = canvas.width;
    const xAxis = Math.floor(height / 2);
    const yAxis = Math.floor(width / 4);
    const unit = 50;

    let drawState = {
      seconds: 0,
      t: 0
    };

    const planeImg = new Image();
    planeImg.crossOrigin = "anonymous";
    let imageLoaded = false;

    planeImg.onload = () => {
      imageLoaded = true;
    };

    planeImg.onerror = () => {
      imageLoaded = false;
    };

    planeImg.src = "../../../public/imgs/iconplane.jpg";

    const drawSine = (t: number, unitval: number, offset: number, direction: number): void => {
      for (let i = yAxis; i <= width; i += 10) {
        const x = t + (-yAxis + i) / unitval;
        const y = Math.sin(x) * direction;
        context.lineTo(i + offset, (unitval / 3) * y + xAxis);
      }
    };

    const drawPlane = (t: number, unitVal: number, offset: number, direction: number): void => {
      const y = xAxis + (unitVal / 3) * Math.sin(t) * direction;
      const x = yAxis - 29 + offset;

      context.save();

      if (imageLoaded && planeImg.complete) {
        context.drawImage(planeImg, x, y - 16, 58, 32);
      } else {
        context.fillStyle = '#ffffff';
        context.beginPath();
        context.moveTo(x + 25, y - 10);
        context.lineTo(x + 45, y);
        context.lineTo(x + 25, y + 10);
        context.lineTo(x + 15, y + 5);
        context.lineTo(x + 10, y + 8);
        context.lineTo(x + 5, y);
        context.lineTo(x + 10, y - 8);
        context.lineTo(x + 15, y - 5);
        context.closePath();
        context.fill();

        context.beginPath();
        context.moveTo(x + 20, y - 5);
        context.lineTo(x + 35, y - 12);
        context.lineTo(x + 25, y - 8);
        context.fill();

        context.beginPath();
        context.moveTo(x + 20, y + 5);
        context.lineTo(x + 35, y + 12);
        context.lineTo(x + 25, y + 8);
        context.fill();
      }

      context.restore();
    };

    const draw = (): void => {
      context.clearRect(0, 0, width, height);

      const gradients: [string, string, number, number, number][] = [
        ['rgba(189, 106, 155, 1)', 'rgba(189, 106, 155, 0)', unit, 0, 1],
        ['rgba(151, 204, 18, 1)', 'rgba(151, 204, 18, 0)', unit * 2, 50, -1],
        ['rgba(245, 223, 22, 1)', 'rgba(245, 223, 22, 0)', unit * 2, 100, 1],
        ['rgba(204, 63, 24, 1)', 'rgba(204, 63, 24, 0)', unit / 150, 150, -1]
      ];
      

      gradients.forEach(([start, end, unitVal, offset, direction]: [string, string, number, number, number]) => {
        const grd = context.createLinearGradient(0, 0, 800, 0);
        grd.addColorStop(0, start);
        grd.addColorStop(1, end);
        context.strokeStyle = grd;
        context.beginPath();
        drawSine(drawState.t, unitVal, offset, direction);
        context.stroke();
        drawPlane(drawState.t, unitVal, offset, direction);
      });
      
      drawState.seconds = drawState.seconds - 0.007;
      drawState.t = drawState.seconds * Math.PI;

      animationRef.current = setTimeout(draw, 35);
    };

    context.save();
    draw();

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="flex h-10 ml-36 mb-10 flex-col items-center justify-center p-4">
      <canvas
        ref={canvasRef}
        id="sineCanvas"
        width="1024"
        height="300"
        className="rounded-lg"
        style={{ backgroundColor: 'transparent' }}
      />
    </div>
  );
};

export default AirplaneCanvas;
