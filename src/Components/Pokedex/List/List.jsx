import ListItem from './ListItem/ListItem';
import PropTypes from 'prop-types';
import './list.scss';

const List = ({
  pokeData,
  pokeCount,
  listItems,
  listHeight,
  hasNextPage
}) => {

  return (
    <ul
      className="pokemon-list"
      style={{
        height: listHeight,
        width: '100%',
        position: 'relative',
      }}
    >
      {
        listItems.map( item => {
          const isLoaderRow = item.index > pokeCount - 1
          const pokemonRow = pokeData[ item.index ]

          return (
            <li
              key={ item.index }
              className="pokemon-list__row"
              style={{
                height: `${item.size}px`,
                transform: `translateY(${item.start}px)`,
              }}
            >
              {isLoaderRow
                ? hasNextPage
                  ? 'Loading more Pokemon...'
                  : 'You caught them all!' : (

                    <div className='pokemon-list__row__contents'>
                      <div className='poke-info'>
                        <div className='poke-info__top'>
                          <span className='name'>
                            { pokemonRow.name }
                          </span>
                        </div>
                        <div className='poke-info__bottom'>
                          <span className='id'>
                            #{ pokemonRow.id }
                          </span>
                          <span>▫️</span>
                          <span className='types'>
                            { pokemonRow.additionalInfo.types }
                          </span>
                        </div>
                      </div>

                      <div className='poke-image'>
                        <img
                          src={ pokemonRow.imageUrl }
                          alt={ `${pokemonRow.name} image` }
                        />
                      </div>

                    </div>
                  )
              }
            </li>
          )
      })}
    </ul>
  );
};

List.propTypes = {
  pokeData: PropTypes.array.isRequired,
  pokeCount: PropTypes.number.isRequired,
  listItems: PropTypes.array.isRequired,
  listHeight: PropTypes.string.isRequired,
  hasNextPage: PropTypes.bool.isRequired
};

export default List;
