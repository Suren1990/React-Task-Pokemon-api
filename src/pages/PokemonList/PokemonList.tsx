import { useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import Pagination from "../../components/Pagination/Pagination";
import PokemonItem from "../../components/PokemonItem/PokemonItem";
import PokemonSearch from '../../components/PokemonSearch/PokemonSearch';
import { IPokemonItem } from "../../models/IPokemonList";
import { useGetAllPokemonsQuery, useLazyGetAllPokemonsQuery } from "../../services/PokemonService";
import './PokemonList.scss';

const PokemonList = () => {
    const [data, setData] = useState<IPokemonItem[] | undefined>([]);
    const limit = 16;

    const { isLoading, isError, data: newData } = useGetAllPokemonsQuery(0);
    const [ paginationFunc, {data: paginationData} ] = useLazyGetAllPokemonsQuery();

    const changePage = (offset: number) => {
        paginationFunc(offset);
    }

    useEffect(() => {
        if(paginationData?.results) {
            setData(paginationData?.results)
        } else {
            setData(newData?.results)
        }
    }, [newData, paginationData]);

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
            <Pagination
                count={Number(newData?.count)}
                limit={limit}
                changePage={changePage}
            />
        </div>
    );
};

export default PokemonList;
