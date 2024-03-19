import React from 'react';
import { Route, Routes } from 'react-router-dom'
import MainPage from '@pages/MainPage/MainPage';
import MapPage from '@pages/MapPage/MapPage';
import Layout from '@components/common/Layout/Layout';


function App() {
  return (
    <Layout>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/map" element={<MapPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
