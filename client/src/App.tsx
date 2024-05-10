import React from 'react';
import { Route, Routes } from 'react-router-dom'
import MainPage from '@pages/MainPage/MainPage';
import MapPage from '@pages/MapPage/MapPage';
import Layout from '@components/common/Layout/Layout';
import LoginPage from '@pages/auth/LoginPage';
import RegisterPage from '@pages/auth/RegisterPage';
import ProfilePage from '@pages/user/ProfilePage';
import Home from "@pages/user/User";


function App() {
  return (
    <Layout>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
