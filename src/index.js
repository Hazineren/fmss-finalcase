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
  // Bu kısımda Context API tarafından sağlanan bu AppProvider bileşeni 
  // ile tüm alt bileşenlere bir dizi paylaşılan veri sağlandı.
  <AppProvider>
    {/*<BrowserRouter> etiketi, React Router tarafından sağlanan bir bileşendir ve uygulamadaki tüm rotaları yönetir. */}
    <BrowserRouter>
    {/* <Routes> etiketi, sayfaları uygulama içinde yönlendirmek için kullanılan rotaları tanımlar. */}
      <Routes>
        {/* <Route> etiketi, bir rotanın ayrıntılarını belirtir. path özelliği, hangi URL'nin eşleşeceğini belirler. element özelliği, hangi bileşenin o rota için görüntüleneceğini belirler. */}
        <Route path='/' element={<Home />}>
          <Route path='starship' element={<StarshipList />} />
          <Route path='/starship/:id' element={<StarshipDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
);
