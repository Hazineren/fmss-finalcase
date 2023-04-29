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


  // gelen dataların id'si var ise resim yüklemelerini yaptık
  const starshipsWithCovers = starships.map((singleStarship) => {
      return {
        ...singleStarship,
        id: singleStarship.id,
        cover_img: singleStarship.id ? starshipImg : coverImg,
      };
    });

  if (loading) return <Loading />

  return (
    <section className='starship'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='starship-content grid'>
          {
            //...item ifadesi, item nesnesinin tüm özelliklerini Starship bileşenine aktarmak için kullanılan bir spread operatörüdür. 
            //Bu sayede, Starship bileşenindeki props'ların elle tek tek tanımlanması yerine, item nesnesindeki tüm özellikler Starship bileşenine geçirilir.
            starshipsWithCovers?.map((item, index) => {
              return (
                <Starship key={index} {...item} />
              )
            })
          }
        </div>
        <div className='starship-footer'>
          {/* Toplam sayfa sayısını geçmediysek buton görünür */}
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
