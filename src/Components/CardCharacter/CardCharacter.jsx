import './CardCharacter.css'

const CardCharacter = (props) => {
    return (
        <div className='card'>

            <img src={props.image} alt={props.name} />

            <div className='cardBody'>

                <h2>{props.name}</h2>

                <p>
                    <strong>Species:</strong> {props.species}
                </p>

                <p>
                    <strong>Status:</strong> {props.status}
                </p>

                <p>
                    <strong>Gender:</strong> {props.gender}
                </p>

            </div>

        </div>
    )
}

export default CardCharacter
