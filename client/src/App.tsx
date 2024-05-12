import React from 'react';
import { Route, Routes } from 'react-router-dom'
import MainPage from '@pages/MainPage/MainPage';
import MapPage from '@pages/MapPage/MapPage';
import Layout from '@components/common/Layout/Layout';
import LoginPage from '@pages/auth/LoginPage';
import RegisterPage from '@pages/auth/RegisterPage';
// import ProfilePage from '@pages/user/ProfilePage';
import Home from "@pages/user/User";
import ProjectPage from '@pages/project/ProjectsPage';
import CreateProjectPage from '@pages/project/CreateProjectPage';
import ProjectInfoPage from '@pages/project/ProjectInfoPage';


function App() {
  return (
    <Layout>
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<Home />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/create" element={<CreateProjectPage />} />
          <Route path="/projects/:projectId" element={<ProjectInfoPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
