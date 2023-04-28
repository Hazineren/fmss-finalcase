import React, { useEffect } from 'react'
import { useStarships } from '../../context'
import axios from 'axios';
import { useInfiniteQuery } from 'react-query';
import Loading from '../Loader/Loader'
import coverImg from '../../images/cover_not_found.jpg';
import starshipImg from '../../images/starship.jpg'
import Starship from '../StarshipList/Starship'

const StarshipList = () => {

  const { starships, loading, resultTitle,showHeader, setShowHeader} = useStarships();
useEffect(()=> {
  setShowHeader(true)
})

const fetchStarships = async ({ pageParam = 1 }) => {
  const response = await axios.get(`https://swapi.dev/api/starships/?page=${pageParam}`);
  return response.data;
};

const {
  data,
  fetchNextPage,
  hasNextPage,
  isLoading,
  isError,
  error,
} = useInfiniteQuery('starships', fetchStarships, {
  getNextPageParam: (lastPage) => {
    return lastPage.next ? lastPage.next.match(/page=(\d+)/)[1] : undefined;
  },
});

const starshipsWithCovers = data?.pages.flatMap((page) => {
  return page.results.map((singleStarship) => ({
    ...singleStarship,
    id: singleStarship.url.split("/")[5],
    cover_img: singleStarship.url.split("/")[5] ? starshipImg : coverImg,
  }));
});

  if(loading) return <Loading/>

  return (
    <section className='starship'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='starship-content grid'>
          {
            starshipsWithCovers?.map((item, index) => {
              return (
                <Starship key = {index} {...item} />
              )
            })
          }
        </div>
        <div className='starship-footer'>
        {hasNextPage && (
          <button onClick={() => fetchNextPage()} disabled={isLoading} >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        )}
        </div>
      </div>
    </section>
  )
}

export default StarshipList
