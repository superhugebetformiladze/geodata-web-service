import React, { useEffect, useRef, useState } from 'react';
import h337 from 'heatmap.js';

const ClicksPage: React.FC = () => {
  const [clicks, setClicks] = useState<Array<{ x: number, y: number }>>([]);
  const heatmapContainerRef = useRef<HTMLDivElement>(null);
  const heatmapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Получение данных о кликах из куки
    const clickDataCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('clickData='));
    const storedClicks = clickDataCookie ? JSON.parse(clickDataCookie.split('=')[1]) : [];

    if (storedClicks) {
      setClicks(storedClicks);
    }

    // Создание контейнера для тепловой карты
    if (heatmapContainerRef.current) {
      heatmapInstanceRef.current = h337.create({
        container: heatmapContainerRef.current,
        radius: 50, // Радиус точки на тепловой карте
        maxOpacity: 0.6,
        minOpacity: 0,
        blur: 0.75,
        gradient: { 0.4: 'blue', 0.6: 'cyan', 0.7: 'lime', 0.8: 'yellow', 1.0: 'red' } // Цвета кругов
      });

      // Добавление данных на тепловую карту
      const heatmapData = {
        max: 10, // Максимальное значение интенсивности точки
        data: storedClicks.map((click: { x: number, y: number }) => ({
          x: click.x,
          y: click.y,
          value: 1,
        })),
      };
      heatmapInstanceRef.current.setData(heatmapData);
    }
  }, []);

  return (
    <div>
      <div
        ref={heatmapContainerRef}
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: '500px', 
          backgroundImage: 'url("images/background-map.png")', // Путь к изображению
          backgroundSize: 'cover', // Растягиваем изображение на всю область
          backgroundColor: '#f0f0f0' 
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        </div>
      </div>
    </div>
  );
};

export default ClicksPage;
