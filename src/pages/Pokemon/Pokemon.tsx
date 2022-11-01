import './Pokemon.scss';
import { useNavigate, useParams } from "react-router-dom";
import { useGetPokemonByNameQuery } from '../../services/PokemonService';
import Loading from '../../components/Loading/Loading';

const Pokemon = () => {
    const params = useParams();
    const navigate = useNavigate();

    const { isError, isLoading, data } = useGetPokemonByNameQuery(String(params.name));

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div>
            {isError && <h2>Something went wrong</h2>}
            {isLoading && <Loading />}
            <span
                className="go__back"
                onClick={goBack}
            >Go Back</span>
            {
                data && (
                    <div className='product__inner'>
                        <div className='product__image_wrap'>
                            <img
                                src={data.sprites.other.home.front_default}
                                className="product__image"
                                alt={data.species.name}
                            />
                        </div>
                        <div className='product__info'>
                            <h4 className='product__info_title'>{data.species.name}</h4>
                            <div className="product__stats">
                                <h5 className='product__stats_title'>Stats</h5>
                                <div className="product__stats_wrap">
                                    {
                                        data.stats.map((statItem) => (
                                            <span
                                                className='product__stats_stat'
                                                key={statItem.stat.name}
                                            >
                                                {statItem.stat.name},
                                            </span>
                                        ))
                                    }
                                </div>
                                <h5 className='product__stats_title'>Types</h5>
                                <div className="product__stats_wrap">
                                    {
                                        data.types.map((typeItem) => (
                                            <span
                                                className='product__stats_stat'
                                                key={typeItem.slot}
                                            >
                                                {typeItem.type.name},
                                            </span>
                                        ))
                                    }
                                </div>
                                <h5 className='product__stats_title'>Moves</h5>
                                <div className="product__stats_wrap">
                                    {
                                        data.moves.map((moveItem) => (
                                            <span
                                                className='product__stats_stat'
                                                key={moveItem.move.name}
                                            >
                                                {moveItem.move.name},
                                            </span>
                                        ))
                                    }
                                </div>
                                <h5>Weight: {data.weight}</h5>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Pokemon;
