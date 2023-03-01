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
      className="list"
      style={{ height: listHeight }}
    >
      {
        listItems.map( item => {
          const isLoaderRow = item.index > pokeCount - 1
          const pokemonRow = pokeData[ item.index ]

          return (
            <ListItem
              key={ item.index }
              index={ item.index }
              size={ item.size }
              start={ item.start }
              isLoaderRow={ isLoaderRow }
              pokemonRow={ pokemonRow }
              hasNextPage={ hasNextPage }
            />
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
