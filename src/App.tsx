import './App.css';
import { Routes, Route } from 'react-router-dom';
import PokemonList from './pages/PokemonList/PokemonList';
import Pokemon from './pages/Pokemon/Pokemon';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<PokemonList />} />
        <Route path='/:name' element={<Pokemon />} />
      </Routes>
    </div>
  );
}

export default App;
