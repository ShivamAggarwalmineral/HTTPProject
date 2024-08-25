import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js'
import { fetcAvailablePlaces } from '../http.js'
export default function AvailablePlaces({ onSelectPlace }) {

  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    async function fetchPlaces() {
      try {
        setIsFetching(true)
        const places = await fetcAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const shuffledPlaces =
            sortPlacesByDistance(
              places,
              position.coords.latitude,
              position.coords.longitude)
          setAvailablePlaces(shuffledPlaces);
          setIsFetching(false)
        })
      }
      catch (error) {
        setError({ message: error.message || 'error occured while fetching places' })
        setIsFetching(false)

      }
    }
    fetchPlaces()
  }, [])
  if (error) {
    return <Error title='Error while Fetching places' message={error.message} />
  }
  return (
    <Places
      title="Available Places"
      isLoading={isFetching}
      loadingText='Please wait ...'
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
