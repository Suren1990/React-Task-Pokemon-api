import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetPokemonByNameQuery } from "../../services/PokemonService";
import Loading from "../Loading/Loading";
import PokemonItem from "../PokemonItem/PokemonItem";
import './PokemonSearch.css';

interface PokemonSearchProps {
    searchPokemon: string;
    setSearchPokemon: (name: string) => void;
}

const PokemonSearch: React.FC<PokemonSearchProps> = ({ searchPokemon, setSearchPokemon }) => {
    const [debounced, setDebounced] = useState('');

    const { isLoading, isError, data } = useGetPokemonByNameQuery(debounced, {
        skip: debounced.length < 3,
    });

    useEffect(() => {
        let handler: ReturnType<typeof setTimeout>;

        if (searchPokemon.length > 3) {
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