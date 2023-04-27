import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { AppProvider } from './context';
import Home from './pages/Home/Home';
import StarshipList from './components/StarshipList/StarshipList';
import StarshipDetails from './components/StarshipDetail/StarshipDetail'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='starship' element={<StarshipList />} />
          <Route path='/starship/:id' element={<StarshipDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);
