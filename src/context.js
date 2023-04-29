import React, { useState, useCallback, useEffect, useContext } from 'react'
import axios from 'axios';

const URL = 'https://swapi.dev/api/starships/'
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [starships, setStarships] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState('');
    const [showHeader, setShowHeader] = useState(true);


    const fetchStarships = useCallback(() => {
        if (searchTerm != '') {
            // searchTerm tetiklendiyse, load more butonunu inaktif ettik
            setPageCount('');

        } else {
            // Eğer pageCount tetiklendiyse, load More butonumuz aktif kaldı ve pageCount değerini atadık
            setPageCount(pageCount);
        }
        try {
            // Burada axios'um bir then zinciri içerisinde olduğu için 
            // fonksiyonu ayrıca async olarak oluşturmadım
            axios(`${URL}?search=${searchTerm}&page=${pageCount}`)
                .then((res) => {

                    const { results } = res.data;

                    if (results) {
                        const newStarships = results?.map((starshipSingle) => {

                            const { url } = starshipSingle;
                            const shipId = url.split("/")[5];

                            const { name, model, hyperdrive_rating, passengers, max_atmosphering_speed, manufacturer, crew, cargo_capacity } = starshipSingle;

                            return {
                                id: shipId,
                                name: name,
                                model: model,
                                hyperdrive_rating: hyperdrive_rating,
                                passengers: passengers,
                                max_atmosphering_speed: max_atmosphering_speed,
                                manufacturer: manufacturer,
                                crew: crew,
                                cargo_capacity: cargo_capacity
                            }


                        });

                        if (searchTerm) {
                            // searchTerm tetiklendiyse, newStarships'i doğrudan yeni liste olarak ayarladık.
                            setStarships(newStarships);
                        } else {
                            // Eğer pageCount tetiklendiyse, newStarships'i mevcut listeye ekledik.
                            setStarships(prevState => [...prevState, ...newStarships]);
                        }


                        if (newStarships.length > 0) {
                            setResultTitle('Your Search Result')
                        } else {
                            setResultTitle('No Search Result Found!')
                        }
                    } else {
                        setStarships([]);
                        setResultTitle('No Search Result Found!');
                    }
                    setLoading(false);
                })
                .catch((e) => console.log(e))
                .finally(() => setLoading(false));

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [searchTerm, pageCount])


    useEffect(() => {

        fetchStarships();
    }, [searchTerm, pageCount, fetchStarships])

    return (
        <AppContext.Provider value={{
            setStarships,
            hasNextPage, setHasNextPage, pageCount, setPageCount,
            loading, starships, searchTerm, setSearchTerm, resultTitle, setResultTitle, showHeader, setShowHeader
        }}>{children}</AppContext.Provider>
    )
}

export const useStarships = () => useContext(AppContext)

export default AppContext;