<<<<<<< HEAD
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Teams from './pages/Teams'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile'


export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/profile" element={<Profile />} />

          </Routes>
           
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Announcements from "./pages/Announcements";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/announcements" element={<Announcements />} />
      </Routes>
    </Router>
  );
>>>>>>> 2fd173c (feat: add complete frontend files with home, login, register, dashboard, announcements, members pages)
}
