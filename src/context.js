import React, { useState, useCallback, useEffect, useContext } from 'react'
import axios from 'axios';

const URL = 'https://swapi.dev/api/starships/'
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [starships, setStarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState('');
    const [showHeader, setShowHeader] = useState(true);

    const fetchStarships = useCallback(async () => {
        try {
            axios(`${URL}?search=${searchTerm}`)
                .then((res) => {
                    const { results } = res.data;

                    console.log(results)
                    if (results) {
                        const newStarships = results.slice(0, 20).map((starshipSingle) => {

                            const { url } = starshipSingle;
                            const shipId = url.split("/")[5];
                            console.log(`Starship ID: ${shipId}`);
                            const { name, model, hyperdrive_rating, passengers, max_atmosphering_speed, manufacturer, crew, cargo_capacity } = starshipSingle;
                            //console.log(starshipSingle,' context');
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

                        setStarships(newStarships)

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
    }, [searchTerm])

    useEffect(() => {

        fetchStarships();
    }, [searchTerm, fetchStarships])

    return (
        <AppContext.Provider value={{ loading, starships, setSearchTerm, resultTitle, setResultTitle,showHeader, setShowHeader }}>{children}</AppContext.Provider>
    )
}

export const useStarships = () => useContext(AppContext)

export default AppContext;