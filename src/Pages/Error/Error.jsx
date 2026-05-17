import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Error.css'
import MrV from './img/MrV.jpg'

const Error = () => {

    const navigate = useNavigate()

    const [position, setPosition] = useState({
        top: '50%',
        left: '50%'
    })

    const [caught, setCaught] = useState(false)

    useEffect(() => {

        if(caught){
            return
        }

        const interval = setInterval(() => {

            const randomTop = Math.random() * 80
            const randomLeft = Math.random() * 80

            setPosition({
                top: `${randomTop}%`,
                left: `${randomLeft}%`
            })

        }, 550)

        return () => clearInterval(interval)

    }, [caught])

    const handleCatch = () => {

        setCaught(true)

        setTimeout(() => {

            navigate('/')

        }, 2500)
    }

    return (
 <div className='errorPage'>

            <img
                src={MrV}
                alt='Mr V'
                className='backgroundMrV'
            />

            <div className='overlay'>

                <h1>⚠ ERROR 404 ⚠</h1>

                <h2>Mr. V controla esta dimensión</h2>

                {
                    !caught
                    ? (
                        <p>
                            “Si quieres regresar...
                            tendrás que ganarme.”
                        </p>
                    )
                    : (
                        <p>
                            “Interesante...
                            puedes volver, nos veremos en otra ocacion”
                        </p>
                    )
                }

                <button
                    className='escapeButton'
                    style={{
                        top: position.top,
                        left: position.left
                    }}
                    onClick={handleCatch}
                >

                    {
                        caught
                        ? 'Portal Estabilizado'
                        : 'Atrápame'
                    }

                </button>

            </div>

        </div>
    )
}


export default Error
