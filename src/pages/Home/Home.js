import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { useStarships } from '../../context';

const queryClient = new QueryClient();

const Home = () => {
  const { showHeader } = useStarships();
  console.log(showHeader, '2222');

  return (
    <QueryClientProvider client={queryClient}>
      {showHeader && <Header />}
      <Outlet />
    </QueryClientProvider>
  );
};

export default Home;