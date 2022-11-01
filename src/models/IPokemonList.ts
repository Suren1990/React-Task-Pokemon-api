export interface IPokemonItem {
    name: string;
    url: string;
}

export interface IPokemonList {
    count: number;
    next: string;
    previous?: any;
    results: IPokemonItem[];
}

export interface IServerResponse {
    count: number;
    next: string;
    previous?: any;
    results: IPokemonItem[];
}
