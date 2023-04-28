import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loader/Loader'
import coverImg from '../../images/cover_not_found.jpg'
import starshipImg from '../../images/starship.jpg'
import axios from 'axios'
import './StarshipDetail.css'
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useStarships } from '../../context'

const URL = 'https://swapi.dev/api/starships/'
const StarshipDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [starship, setStarship] = useState({});
  const navigate = useNavigate();
  const { showHeader, setShowHeader } = useStarships();

  useEffect(() => {
    setLoading(true);
    setShowHeader(false)
    async function getStarshipDetails() {
      try {
        axios(`${URL}${id}`)
          .then((res) => {
            //const {item} = res;
            if (res.data) {
              const { name, model, hyperdrive_rating, passengers, max_atmosphering_speed, manufacturer, crew, cargo_capacity } = res.data;

              // yeni liste oluşturulup değişkenlere yeni değerler atandı
              const newStarship = {
                name: name ? name : 'No name found',
                model: model,
                hyperdrive_rating: hyperdrive_rating ? hyperdrive_rating : 'Not Found Page Hyperdrive Rating',
                cover_img: starshipImg ? starshipImg : coverImg,
                passengers: passengers ? passengers : 'No publisher found',
                max_atmosphering_speed: max_atmosphering_speed ? max_atmosphering_speed : 'Not Found',
                manufacturer: manufacturer ? manufacturer : 'Not Found',
                crew: crew ? crew : 'Not Found',
                cargo_capacity: cargo_capacity ? cargo_capacity : 'Not Found'

              };
              setStarship(newStarship);
            } else {
              setStarship(null)
            }
            setLoading(false);
          })
          .catch((e) => console.log(e))
          .finally(() => setLoading(false));
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getStarshipDetails();
  }, [id])

  if (loading) return <Loading />

  return (
    <section className='starship-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/starship")}>
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>
      </div>
      
        <div className='starship-details-content grid'>
          <div className='starship-details-img'>
            <img src={starship?.cover_img} alt="cover img" />
          </div>
          <div className='starship-details-info'>
            <div className='starship-details-item title'>
              <span className='fw-6 fs-24'>{starship?.name}</span>
            </div>
            <hr style={{ height: '4px', backgroundColor: 'var(--light-black-color)', border: 'none', marginBottom: '25px' }}></hr>
            <div className='starship-details-item'>
              <span className='fw-6'>Model: </span>
              <span>{starship?.model}</span>
            </div>
            <div className='starship-details-item'>
              <span className='fw-6'>Hyperdrive Rating: </span>
              <span className='text-italic'>{starship?.hyperdrive_rating}</span>
            </div>
            <div className='starship-details-item'>
              <span className='fw-6'>Passengers: </span>
              <span className='text-italic'>{starship?.passengers}</span>
            </div>
            <div className='starship-details-item'>
              <span className='fw-6'>Max Atmosphering Speed: </span>
              <span>{starship?.max_atmosphering_speed}</span>
            </div>
            <div className='starship-details-item'>
              <span className='fw-6'>Manufacturer: </span>
              <span>{starship?.manufacturer}</span>
            </div>
            <div className='starship-details-item'>
              <span className='fw-6'>Crew: </span>
              <span>{starship?.crew}</span>
            </div>
            <div className='starship-details-item'>
              <span className='fw-6'>Cargo Capacity: </span>
              <span>{starship?.cargo_capacity}</span>
            </div>
          </div>
        </div>
    </section>
  )
}

export default StarshipDetail
