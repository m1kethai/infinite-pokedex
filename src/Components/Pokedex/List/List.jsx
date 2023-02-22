//TODO: skeleton list item component/style

import * as _ from 'lodash-es';

import ListItem from './ListItem/ListItem'

import './list.scss'

const listItemHeight = "30px";
const fetchNextItemsOffset = listItemHeight * 5;


function List({
  pokeArray
}) {

  let
    data,
    isLoading; //# pass this up to pokedex?

  const getListRows = listItems => {
    // console.log("🚀🚀🚀  getListRows  arguments", arguments);

    // const
    //   pages = _.keys( listData ),
    //   items = [];

    //   _.each( pages, page => {
    //     items.push( listData[ page ]);
    //   });

    //   return items;
// console.log( `_.flatten( listData )`, JSON.stringify(_.flatten( listData ), undefined, 2) );
// debugger;
    // return _.flatten( listData );

    // _.each( listData, ( pages, p ) => {

    const group = _.map( listItems, p =>
      <ListItem
        key={ p.id }
        name={ p.name }
        id={ p.id }
        imageUrl={ p.url }
        // details={ p.details }
      />
    );
    return group;
    // });
// console.log( `items`, JSON.stringify(items, undefined, 2) );

  }

  return (
    <div className="list">
      {/* <h2>LIST</h2> */}
      {/* <ListItem
        pokeArray=
      /> */}
      <ul className="list">
        { getListRows( pokeArray ) }
      </ul>
    </div>
  )
}

export default List
