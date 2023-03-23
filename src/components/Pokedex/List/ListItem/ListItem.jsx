import PropTypes from 'prop-types'
import pokeball from '&/pokeball.svg'
import './list-item.scss'

const ListItem = ({
  itemIndex,
  itemSize,
  itemPos,
  isLoaderRow,
  pokeDetails,
  hasNextPage
}) => {

  const loaderRow = () => (
    <div className='loading-row'> {
      hasNextPage
        ? <img
            className='spinner'
            src={ pokeball }/>
        : <h2>You caught them all!</h2>
    } </div>
  );

  const pokeTypeTags = ( pokeTypes ) => (
    <span className='types tags'> {
      pokeTypes.map(( typeName, typeIdx ) => (
        <span
          key={`${ itemIndex }--type${ typeIdx }`}
          className={`tag type is-rounded ${ typeName }`}
        >{ typeName }
        </span>
      ))
    } </span>
  );

  return (
    <li
      key={itemIndex}
      className='list__row'
      style={{
        height: `${ itemSize }px`,
        transform: `translateY(${ itemPos }px)`,
      }}> {
        isLoaderRow ? loaderRow() : (
          <div className='list__row__contents'>
            <div className='poke-info'>
              <div className='poke-info__top'>
                <span className='name'>
                  { pokeDetails.name }
                </span>
                <span className='id'>
                  {`#${ pokeDetails.id }`}
                </span>
              </div>
              <div className='poke-info__bottom'>
                { pokeTypeTags( pokeDetails.additionalInfo.types )}
              </div>
            </div>
            <div className='poke-image'>
              <img
                src={ pokeDetails.imageUrl }
                alt={`${ pokeDetails.name} sprite`}/>
            </div>
          </div>
        )}
    </li>
  )
};

ListItem.propTypes = {
  itemIndex: PropTypes.number,
  itemSize: PropTypes.number,
  itemPos: PropTypes.number,
  isLoaderRow: PropTypes.bool,
  pokeDetails: PropTypes.object,
  hasNextPage: PropTypes.bool
};

export default ListItem;
