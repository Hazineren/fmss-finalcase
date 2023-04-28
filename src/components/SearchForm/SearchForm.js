import React , {useRef, useEffect} from 'react'
import {FaSearch} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useStarships } from '../../context'
import './SearchForm.css'


const SearchForm = () => {

  const {setSearchTerm, setResultTitle} = useStarships();
  const searchText = useRef('');
  const navigate = useNavigate();

  useEffect(() => {
    handleSubmit();
    searchText.current.focus();
  }, []);

  const handleSubmit = (e) => {
    let tempSearchTerm = searchText.current.value.trim();
    if((tempSearchTerm.replace(/[^\w\s]/gi,'')).length===0){
      setSearchTerm('');
      setResultTitle('Please Enter Something ...')
    }else{
      setSearchTerm(searchText.current.value);
    }
    navigate('/starship')
  };


  return (
    <div className='search-form'>
      <div className='container'>
        <div className='search-form-content'>
          <form className='search-form' onSubmit={handleSubmit}>
            <div className='search-form-elem flex flex-sb bg-white'>
              <input type = "text" className='form-control' placeholder='Death Star ...'  ref={searchText}/>
              <button type = "submit" className='flex flex-c' onClick={handleSubmit}>
                <FaSearch className='text-purple' size = {32} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchForm
