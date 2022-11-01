//import { IServerResponse } from './../models/IPokemonList';
import { IPokemon } from '../models/IPokemon';
import { IPokemonList } from '../models/IPokemonList';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
        getAllPokemons: builder.query<IPokemonList, number>({
            query: (offset = 0) => ({
                url: `pokemon/`,
                params: {
                    offset,
                    limit: 16
                }
            }),
            //transformResponse: (response: IServerResponse) => response.results,
        }),
        getPokemonByName: builder.query<IPokemon, string>({
            query: (name) => `pokemon/${name}`,
        }),
    }),
})

export const { useGetAllPokemonsQuery, useGetPokemonByNameQuery, useLazyGetAllPokemonsQuery } = pokemonApi;
