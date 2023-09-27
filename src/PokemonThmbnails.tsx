type Props = {
  id: number;
  name: string;
  image: string;
  type: string;
};

const PokemonThumbnails = ({ id, name, image, type }: Props) => {
  return (
    <div>
      <div className='number'>
        <small>#0{id}</small>
      </div>
      <img src={image} alt={name} />
      <div className='detail-wrapper'>
        <h4>{name}</h4>
        <h3>{type}</h3>
      </div>
    </div>
  );
};

export default PokemonThumbnails;
