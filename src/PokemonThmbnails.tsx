import monsterBall from './assets/monsterBall.jpg';

type Props = {
  id: number;
  name: string;
  iconImage?: string;
  image: string;
  type: string;
  jpName: string;
  jpType: string;
};

const PokemonThumbnails = ({ id, name, image, type, jpName, jpType }: Props) => {
  const style = `thumb-container ${type}`;
  return (
    <div className={style}>
      <div className='number'>
        <small>#0{id}</small>
      </div>
      <img src={image} alt={name}></img>
      <img src={monsterBall} alt={name} className='icon-image' />
      <div className='detail-wrapper'>
        <h4>{jpName ?? '???'}</h4>
        <h3>{jpType ?? type}</h3>
      </div>
    </div>
  );
};

export default PokemonThumbnails;
