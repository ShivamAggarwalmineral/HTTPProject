export async function fetcAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places')
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('an error occured');
    }
    return resData.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({ places }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('some error occured')
    }
    return resData.message
}

export async function fetchUserPlaces() {
    const response = await fetch('http://localhost:3000/user-places');
    const resData = await response.json();
    if (!response.ok) {
        throw new Error('Error while fetching user places')
    }
    return resData.places;
}