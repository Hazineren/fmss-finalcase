import React, { useEffect } from 'react'
import { useStarships } from '../../context'
import Loading from '../Loader/Loader'
import coverImg from '../../images/cover_not_found.jpg';
import starshipImg from '../../images/starship.jpg'
import Starship from '../StarshipList/Starship'

const StarshipList = () => {

  const { pageCount, setPageCount,loading,starships, resultTitle, setShowHeader } = useStarships();

  useEffect(() => {
    setShowHeader(true)
  })


  const starshipsWithCovers = starships.map((singleStarship) => {
      return {
        ...singleStarship,
        id: singleStarship.id,
        cover_img: singleStarship.id ? starshipImg : coverImg,
      };
    });
  console.log(pageCount,' var mı')
  if (loading) return <Loading />

  return (
    <section className='starship'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='starship-content grid'>
          {
            //.slice(0, 10)
            starshipsWithCovers?.map((item, index) => {
              return (
                <Starship key={index} {...item} />
              )
            })
          }
        </div>
        <div className='starship-footer'>
          {(pageCount<4) && (
            <button onClick={() => setPageCount(pageCount < 4 ? pageCount + 1 : pageCount)} disabled={loading} >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

export default StarshipList
