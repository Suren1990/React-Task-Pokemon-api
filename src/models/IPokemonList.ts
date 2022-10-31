export interface IPokemonList {
    name: string;
    url: string;
}

export interface IServerResponse {
    count: number;
    next: string;
    previous?: any;
    results: IPokemonList[];
}
