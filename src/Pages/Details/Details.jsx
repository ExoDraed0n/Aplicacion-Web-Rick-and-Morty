import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Details.css'

const Details = () => {

    const { id } = useParams()

    const navigate = useNavigate()

    const [character, setCharacter] = useState(null)

    useEffect(() => {

        fetch(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response => response.json())
            .then(data => setCharacter(data))
            .catch(error => console.log(error))

    }, [id])

    if (!character) {
        return <h1>Cargando...</h1>
    }

    return (
        <div className='detailsPage'>

            <button
                className='btnBack'
                onClick={() => navigate(-1)}
            >
                ← Volver
            </button>

            <div className='detailsCard'>

                <div className='imageContainer'>

                    <img
                        src={character.image}
                        alt={character.name}
                    />

                </div>

                <div className='infoContainer'>

                    <h1>{character.name}</h1>

                    <p>
                        <strong>Species:</strong> {character.species}
                    </p>

                    <p className={character.status}>
                        {character.status}
                    </p>

                    <p>
                        <strong>Gender:</strong> {character.gender}
                    </p>

                    <p>
                        <strong>Origin:</strong> {character.origin.name}
                    </p>

                    <p>
                        <strong>Location:</strong> {character.location.name}
                    </p>

                </div>

            </div>

        </div>
    )
}

export default Details
