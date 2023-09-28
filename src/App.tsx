import { useEffect, useRef, useState } from 'react';
import PokemonThumbnails from './PokemonThmbnails';
import pokemonJson from './pokemon.json';

const pokemonType: { [key: string]: string } = {
  grass: 'くさ',
  fire: 'ほのお',
  water: 'みず',
  bug: 'むし',
  normal: 'ノーマル',
  poison: 'どく',
  electric: 'でんき',
  ground: 'じめん',
  fairy: 'ようせい',
  fighting: 'かくとう',
  psychic: 'エスパー',
  rock: 'いわ',
  ice: 'こおり',
  dragon: 'ドラゴン',
  ghost: 'ゴースト',
  steel: 'はがね',
  dark: 'あく',
};

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [allPokemons, setAllPokemons] = useState<any[]>([]);
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [isLoading, setIsLoading] = useState(false);

  const refFirstRef = useRef(true);

  const getAllPokemons = () => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.next);
        createPokemonObject(data.results);
      })
      .finally(() => {
        setIsLoading(false);
      });
    loaded();
  };

  const loaded = () => {
    window.addEventListener('load', () => {
      console.log('load');
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createPokemonObject = (results: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    results.forEach((pokemon: any) => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      fetch(pokemonUrl)
        .then((res) => res.json())
        .then(async (data) => {
          const _image = data.sprites.other['official-artwork'].front_default;
          const _iconImage = data.sprites.other.dream_world.front_default;
          const _type = data.types[0].type.name;
          const japanese = await translateToJapanese(data.name, _type);
          const newList = {
            id: data.id,
            name: data.name,
            iconImage: _iconImage,
            image: _image,
            type: _type,
            jpName: japanese.name,
            jpType: japanese.type,
          };
          setAllPokemons((currentList) => [...currentList, newList].sort((a, b) => a.id - b.id));
        });
    });
  };

  const translateToJapanese = async (name: string, type: string) => {
    const jpName = await pokemonJson.find((pokemon) => pokemon.en.toLocaleLowerCase() === name)?.ja;
    const jpType = await pokemonType[type];
    return { name: jpName, type: jpType };
  };

  useEffect(() => {
    if (refFirstRef.current) {
      refFirstRef.current = false;
      return;
    }
    getAllPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='app-container'>
      <h1>ポケモン図鑑</h1>
      <div className='pokemon-container'>
        <div className='all-container'>
          {allPokemons.map((pokemon, index) => (
            <PokemonThumbnails
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              iconImage={pokemon.iconImage}
              type={pokemon.type}
              jpName={pokemon.jpName}
              jpType={pokemon.jpType}
              key={index}
            />
          ))}
        </div>
        {isLoading ? (
          <div className='load-more'>now loading...</div>
        ) : (
          <button className='load-more' onClick={getAllPokemons}>
            もっとみる！
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
