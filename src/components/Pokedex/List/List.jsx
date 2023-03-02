import PropTypes from 'prop-types';
import ListItem from './ListItem/ListItem';
import './list.scss';

const List = ({
  pokeData,
  pokeCount,
  listItems,
  listHeight,
  hasNextPage
}) => (
  <ul
    className='list'
    style={{ height: listHeight }}
  >
    {
      listItems.map( item => {
        const isLoaderRow = item.index > pokeCount - 1
        const pokeDetails = pokeData[ item.index ]

        return (
          <ListItem
            key={ item.index }
            itemIndex={ item.index }
            itemSize={ item.size }
            itemPos={ item.start }
            isLoaderRow={ isLoaderRow }
            pokeDetails={ pokeDetails }
            hasNextPage={ hasNextPage }
          />
        )
    })}
  </ul>
);

List.propTypes = {
  pokeData: PropTypes.array.isRequired,
  pokeCount: PropTypes.number.isRequired,
  listItems: PropTypes.array.isRequired,
  listHeight: PropTypes.string.isRequired,
  hasNextPage: PropTypes.bool.isRequired
};

export default List;
