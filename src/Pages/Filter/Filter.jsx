import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CardCharacter from '../../Components/CardCharacter/CardCharacter'
import './Filter.css'

const Filter = () => {

    const [allCharacters, setAllCharacters] = useState([])

    const [filteredCharacters, setFilteredCharacters] = useState([])

    const [search, setSearch] = useState('')

    const [species, setSpecies] = useState('')

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState(false)

    // FETCH PERSONAJES

    useEffect(() => {

        const fetchCharacters = async () => {

            try {

                let characters = []

                // TRAER 5 PÁGINAS

                for (let i = 1; i <= 5; i++) {

                    const response = await fetch(
                        `https://rickandmortyapi.com/api/character?page=${i}`
                    )

                    const data = await response.json()

                    characters = [
                        ...characters,
                        ...data.results
                    ]
                }

                setAllCharacters(characters)

                setFilteredCharacters(characters)

                setLoading(false)

            } catch (error) {

                console.log(error)

                setError(true)

                setLoading(false)
            }
        }

        fetchCharacters()

    }, [])

    // FILTROS

    useEffect(() => {

        let filtered = allCharacters

        // FILTRO POR ESPECIE

        if (species !== '') {

            filtered = filtered.filter(character =>

                character.species === species
            )
        }

        // FILTRO POR NOMBRE

        if (search !== '') {

            filtered = filtered.filter(character =>

                character.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
        }

        setFilteredCharacters(filtered)

    }, [species, search, allCharacters])

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

                <button
                    onClick={() => window.location.reload()}
                >

                    Reintentar

                </button>

            </div>
        )
    }

    return (

        <div className='filterPage'>

            <h1 className='titleFilter'>

                Filtrar Personajes

            </h1>

            {/* FILTROS */}

            <div className='filtersContainer'>

                {/* BUSCADOR */}

                <input
                    type='text'
                    placeholder='Buscar personaje...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* SELECT */}

                <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                >

                    <option value=''>

                        Todas las especies

                    </option>

                    <option value='Human'>

                        Human

                    </option>

                    <option value='Alien'>

                        Alien

                    </option>

                    <option value='Robot'>

                        Robot

                    </option>

                    <option value='Humanoid'>

                        Humanoid

                    </option>

                    <option value='Animal'>

                        Animal

                    </option>

                    <option value='Mythological Creature'>

                        Mythological Creature

                    </option>

                </select>

            </div>

            {/* RESULTADOS */}

            <h2 className='resultsText'>

                Resultados encontrados:
                {filteredCharacters.length}

            </h2>

            {/* PERSONAJES */}

            <div className='containerCharacters'>

                {
                    filteredCharacters.map(character => {

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

            {/* SIN RESULTADOS */}

            {
                filteredCharacters.length === 0 && (

                    <h2 className='noResults'>

                        No se encontraron personajes

                    </h2>
                )
            }

        </div>
    )
}

export default Filter

