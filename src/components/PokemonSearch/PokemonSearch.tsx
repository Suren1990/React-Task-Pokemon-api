import './PokemonSearch.scss';
import { ChangeEvent, useEffect, useState } from "react";
import { useGetPokemonByNameQuery } from "../../services/PokemonService";
import Loading from "../Loading/Loading";
import PokemonItem from "../PokemonItem/PokemonItem";

const PokemonSearch = () => {
    const [searchPokemon, setSearchPokemon] = useState('');
    const [debounced, setDebounced] = useState('');

    const { isLoading, isError, data } = useGetPokemonByNameQuery(debounced, {
        skip: debounced.length < 3,
    });

    useEffect(() => {
        let handler: ReturnType<typeof setTimeout>;

        if (searchPokemon.length > 2) {
            handler = setTimeout(() => setDebounced(searchPokemon), 1000);
        }

        return () => {
            clearTimeout(handler)
        }

    }, [searchPokemon]);
    

    const PokemonSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchPokemon(e.target.value);
    }    

    return (
        <div>
            <div className="pokemon__search_wrap">
                <input
                    type="text"
                    className="pokemon__search"
                    value={searchPokemon}
                    onChange={PokemonSearch}
                    placeholder="Type Pokemon Name..."
                />
                {isError && <h2>Something went wrong or Pokemon name is wrong!</h2>}
            </div>
            <div className="pokemon__search_item">
                <h4 className="pokemon__search_title">Searched result</h4>
                {isLoading && <Loading />}
                {
                    data && (
                        <PokemonItem name={data.species.name} />
                    )
                }
            </div>
        </div>
    );
};

export default PokemonSearch;
