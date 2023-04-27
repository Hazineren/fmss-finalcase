import React from 'react'
import { Link } from 'react-router-dom';
import '../StarshipList/StarshipList.css'

const Starship = (starship) => {
  return (
    <div className='book-item flex flex-column flex-sb'>
      <div className='book-item-img'>
        <img src={starship.cover_img} alt="cover" />
      </div>
      <div className='book-item-info text-center'>
        {/* Kitap id'sine göre url'e yönlendirildi */}
        <Link to={`/starship/${starship.id}`} {...starship}>
          <div className='book-item-info-item title fw-7 fs-18'>
            <span>{starship.name}</span>
          </div>
        </Link>
        <div className='book-item-info-item author fs-15'>
          <span className='text-capitalize fw-7'>Model: </span>
          {/* Birden fazla model olabileceği için join kullanıldı */}
          <span>{starship.model}</span>
        </div>
        <div className='book-item-info-item publish-year fs-15'>
          <span className='text-capitalize fw-7'>Hyperdrive Rating: </span>
          <span>{starship.hyperdrive_rating}</span>
        </div>
      </div>
    </div>
  )
}

export default Starship
