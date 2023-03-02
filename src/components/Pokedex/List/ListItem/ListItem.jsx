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

  const loaderRow = () => {
    return (
      <div className={ 'loading-row' }>
        {!hasNextPage
          ? <h2>You caught them all!</h2>
          : <img className='spinner' src={ pokeball }/>}
      </div>
    )
  }

  const getPokeTypes = ( types ) => (
    <span className='types tags'>{
      types.map(( pokeType, typeIdx ) => (
        <span
          key={`${itemIndex}--type${typeIdx}`}
          className={`tag type is-rounded ${pokeType}`}
        >
          { pokeType }
        </span>
      ))
    }</span>
  )

  return (
    <li
      key={ itemIndex }
      className="list__row"
      style={{
        height: `${itemSize}px`,
        transform: `translateY(${itemPos}px)`,
      }}
    >
      { isLoaderRow ? loaderRow() : (
          <div className='list__row__contents'>
            <div className='poke-info'>
              <div className='poke-info__top'>
                <span className='name'>{pokeDetails.name}</span>
              </div>
              <div className='poke-info__bottom'>
                {getPokeTypes( pokeDetails.additionalInfo.types )}
              </div>
            </div>
            <div className='poke-image'>
              <img src={pokeDetails.imageUrl} alt={`${pokeDetails.name} image` }/>
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
