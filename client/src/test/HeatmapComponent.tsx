import { useEffect, useState } from 'react';

const HeatmapComponent: React.FC = () => {
  const [clicks, setClicks] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const addHeatmapPoint = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      const newClick = { x, y };
      setClicks(prevClicks => {
        const updatedClicks = [...prevClicks, newClick];
        document.cookie = `clickData=${JSON.stringify(updatedClicks)};`;
        return updatedClicks;
      });
    };

    document.addEventListener('click', addHeatmapPoint);

    return () => {
      document.removeEventListener('click', addHeatmapPoint);
    };
  }, []);

  return null;
};

export default HeatmapComponent;
