// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

//importation des pages     
import Register from './pages/auth/Register'
import Login from './pages/auth/Login';
// import Navbar from './components/layout/Navbar';
// import Sidebar from './components/layout/Sidebar';
// import Footer from './components/layout/Footer';
// import Layout from './components/layout/Layout';
import DashboardSuperAdmin from './pages/dashboard/DashboardSuperAdmin';
import DashboardUsersPage from './pages/dashboard/DashbordUsersPager';
import Maintenances from './pages/dashboard/Maintenances';





const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        {/* <Route path="/navbar" element={<Navbar/>} />
        <Route path="/sidebar" element={<Sidebar/>} />
        <Route path="/footer" element={<Footer/>} />
        <Route path="/layout" element={<Layout/>} /> */}
        <Route path="/Dashboardad" element={<DashboardSuperAdmin/>} />
        <Route path="/DashboardUsersPage" element={<DashboardUsersPage/>} />
        <Route path="/Maintenances" element={<Maintenances/>} />
      </Routes>
    </Router>
  );
};

export default App
