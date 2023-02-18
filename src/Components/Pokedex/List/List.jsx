//TODO: skeleton list item component/style

import * as _ from 'lodash-es';

import ListItem from './ListItem/ListItem'

import './list.scss'

const listItemHeight = "30px";
const fetchNextItemsOffset = listItemHeight * 5;

function List( props ) {

  let
    newestPokes = props.pokes,
    oldestPokes = props.oldPokes,
    loadedPokes = [ ...newestPokes, ...oldestPokes ],
    loadedPokeCount,
    listScrollPosition,
    isLoading; //# pass this up to pokedex?

  console.error(`🧨~🧮~🧨~🧮~🧨~🧮~🧨~🧮~🧨~🧮~🧨~🧮~🧨
    newestPokes =>
    ${newestPokes}
  `);

  console.error(`🧨~🧮~🧨~🧮~🧨~🧮~🧨~🧮~🧨~🧮~🧨~🧮~🧨
    oldestPokes =>
    ${oldestPokes}
  `);

  //* compose full list with 4(?) separate sub-components:
  //*   1) all currently loaded pokes
  //*     1a) top - 30th-60th recently loaded
  //*     1b) bottom - 1-30 most recently loaded
  //*   2) next 30 pokes

  const visibleListItems = ( top, bottom ) => {
    console.log("🚀🚀🚀  visibleListItems  arguments", arguments);

    const items = [
      ..._.map( top, p => <ListItem poke={ p }/>),
      ..._.map( bottom, p => <ListItem poke={ p }/>)
    ];

    // debugger;

    console.info("🚀🚀🚀  visibleListItems  items", items);

    return items;
  }

  return (
    <div className="container list">
      <h2>LIST</h2>
      { visibleListItems( oldestPokes, newestPokes ) }
    </div>
  )
}

export default List
