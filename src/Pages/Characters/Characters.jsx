import { useState, useEffect } from 'react'
import CardCharacter from '../../Components/CardCharacter/CardCharacter';
import './Characters.css'
import { Link } from 'react-router-dom';

const Characters = () => {

    const [characters, setCharacters] = useState([])

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState(false)

    const [page, setPage] = useState(1)

    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {

        setLoading(true)

        fetch(`https://rickandmortyapi.com/api/character?page=${page}`)

            .then(response => response.json())

            .then(data => {

                setCharacters(data.results)

                setTotalPages(data.info.pages)

                setLoading(false)
            })

            .catch(error => {

                console.log(error)

                setError(true)

                setLoading(false)
            })

    }, [page])

    // LOADING

    if (loading) {

        return (
            <div className='loadingContainer'>

                <div className='spinner'></div>

                <h2>Cargando personajes...</h2>

            </div>
        )
    }

    // ERROR

    if (error) {

        return (

            <div className='errorContainer'>

                <h1>😵 Error al cargar personajes</h1>

                <p>
                    Ocurrió un problema al conectar con la API
                </p>

                <button onClick={() => window.location.reload()}>

                    Reintentar

                </button>

            </div>
        )
    }

    return (

        <div className='charactersPage'>

            <h1 className='titleCharacters'>

                Rick and Morty Characters

            </h1>

            <div className='containerCharacters'>

                {
                    characters.map(character => {

                        return (

                            <Link
                                key={character.id}
                                to={`/characters/${character.id}`}
                                className='linkCard'
                            >

                                <CardCharacter
                                    name={character.name}
                                    species={character.species}
                                    status={character.status}
                                    gender={character.gender}
                                    image={character.image}
                                />

                            </Link>
                        )
                    })
                }

            </div>

            {/* PAGINACIÓN */}

            <div className='pagination'>

                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >

                    ← Anterior

                </button>

                <h2>

                    Página {page} de {totalPages}

                </h2>

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                >

                    Siguiente →

                </button>

            </div>

        </div>
    )
}

export default Characters
