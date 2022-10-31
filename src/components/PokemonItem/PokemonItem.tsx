import { Link } from "react-router-dom";
import { useGetPokemonByNameQuery } from '../../services/PokemonService';
import Loading from '../Loading/Loading';
import './PokemonItem.css';

interface PokemonItemProps {
    name: string;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ name }) => {
    const { isError, isLoading, data } = useGetPokemonByNameQuery(name);

    return (
        <Link
            to={name}
            className="pokemon"
        >
            {isError && <h2>Something went wrong!</h2>}
            {isLoading && <Loading />}
            {
                data && (
                    <>
                        <span className='pokemon__image_wrap'>
                            <img
                                src={data.sprites.other.home.front_default}
                                className="pokemon__image"
                                alt={name}
                            />
                        </span>
                        <h4>{name}</h4>
                    </>
                )
            }
        </Link>
    );
};

export default PokemonItem;
