import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '@pages/MainPage/MainPage';
import MapPage from '@pages/MapPage/MapPage';
import Layout from '@components/common/Layout/Layout';
import LoginPage from '@pages/auth/LoginPage';
import RegisterPage from '@pages/auth/RegisterPage';
import ProfilePage from '@pages/user/ProfilePage';
import ProjectPage from '@pages/project/ProjectsPage';
import CreateProjectPage from '@pages/project/CreateProjectPage';
// import ProjectInfoPage from '@pages/project/ProjectInfoPage';
import EditProjectPage from '@pages/project/EditProjectPage';
// import ProjectInfoPage from '@pages/project/example';
import ProjectInfoPage from '@pages/project/exfromgit';
import ClicksPage from '@test/ClicksPage';

function App() {
  return (
    <Routes>
      {/* MainPage without Layout */}
      <Route path="/" element={<MainPage />} />

      {/* Routes with Layout */}
      <Route
        path="/map"
        element={
          <Layout>
            <MapPage />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <LoginPage />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <RegisterPage />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <ProfilePage />
          </Layout>
        }
      />
      <Route
        path="/projects"
        element={
          <Layout>
            <ProjectPage />
          </Layout>
        }
      />
      <Route
        path="/projects/create"
        element={
          <Layout>
            <CreateProjectPage />
          </Layout>
        }
      />
      <Route
        path="/projects/:projectId"
        element={
          <Layout>
            <ProjectInfoPage />
          </Layout>
        }
      />
      <Route
        path="/projects/:projectId/edit"
        element={
          <Layout>
            <EditProjectPage />
          </Layout>
        }
      />
      <Route
        path="/clicks"
        element={
          <Layout>
            <ClicksPage />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
