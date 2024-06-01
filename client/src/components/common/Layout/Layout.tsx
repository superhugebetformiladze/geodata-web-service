import React from 'react';
import Header from '@components/common/Header/Header';
import HeatmapComponent from '@test/HeatmapComponent';

interface LayoutProps {
  children: any;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto p-2">
        {children}
      </div>
      <HeatmapComponent />
    </div>
  );
}

export default Layout;
