import { useState } from 'react';
import Loading from "../../components/Loading/Loading";
import PokemonItem from "../../components/PokemonItem/PokemonItem";
import PokemonSearch from '../../components/PokemonSearch/PokemonSearch';
import { useGetAllPokemonsQuery } from "../../services/PokemonService";
import './PokemonList.css';

const PokemonList = () => {
    const { isLoading, isError, data } = useGetAllPokemonsQuery();

    return (
        <div>
            <h1 className='pokemon__list_title'>PokemonList</h1>
            <PokemonSearch />
            <hr />
            <div className='pokemon__list'>
                {isError && <h2>Something went wrong!!</h2>}
                {isLoading && <Loading />}
                {
                    data && (
                        data.map((item) => (
                            <PokemonItem name={item.name} key={item.name} />
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default PokemonList;
