import React from 'react';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { useStarships } from '../../context';


const Home = () => {
  const { showHeader } = useStarships();

  return (
    <div>
      {/* Header component'imi şart ile gösteriyorum */}
      {showHeader && <Header />}
      <Outlet />
    </div>
  );
};

export default Home;