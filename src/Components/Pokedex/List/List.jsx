//TODO: skeleton list item component/style
import { useState, useEffect } from 'react';

import * as _ from 'lodash-es';

import ListItem from './ListItem/ListItem'

import './list.scss'

const MAX_LIST_ITEMS = 75;

const listItemHeight = "30px";
const fetchNextItemsOffset = listItemHeight * 5;


function List({
  pokemonData,
  // pokemonCount,
  // loadingNextSet //* for placeholder/skeleton list item
}) {
  // const [ loadingMore, setLoadingMore ] = useState( false );
  // const [ parsedBasicInfo, setParsedBasicInfo ] = useState( false );

  useEffect(() => {
    // console.count("🚀🚀🚀 ~ List ~ useEffect");
    // console.log(`🪵~🧮~🪵~🧮~🪵~🧮~🪵~🧮~🪵~🧮~🪵~🧮~🪵
    //   ~ List ~ useEffect ~ pokemonData =>
    // ${ JSON.stringify(pokemonData, undefined, 2)}
  // `);

  }, [ pokemonData ]);

  const getListItems = ( data ) => {
    console.error("🚀🚀🚀 ~ getListItems ~ data:", data);

    const pokemonId = _.nth( _.split( url, "/" ), -2 );

    const listItemProps = {
      name: _.capitalize( name ),
      key: pokemonId,
      id: pokemonId,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ pokemonId }.png`,
      loading: false
    }

    return _.map( listItemProps, item => (
      <ListItem
        name={ item.name }
        key={ item.id }
        id={ item.id }
        imageUrl={ item.url }
        // details={ item.details }
        loading={ false }
      />
    ))

  };

  // const listChunk = items => {
  //   const chnk = _.map( items, p => (
  //     <ListItem
  //       key={ p.id }
  //       name={ p.name }
  //       id={ p.id }
  //       imageUrl={ p.url }
  //       // details={ p.details }
  //       loading={ false }
  //     />
  //   ));

  //   return chnk;
  // }

  // const placeholderItem = () => {
  //   <ListItem showPlaceholderItem={ loadingNextSet }/>
  // }

  // const listChunk = () => {
    // console.log("🚀🚀🚀  ListItems  arguments", arguments);

    // const
    //   pages = _.keys( pokemonData ),
    //   items = [];

    //   _.each( pages, page => {
    //     items.push( pokemonData[ page ]);
    //   });

    //   return items;
// console.log( `_.flatten( pokemonData )`, JSON.stringify(_.flatten( pokemonData ), undefined, 2) );
// debugger;
    // return _.flatten( pokemonData );

    // _.each( pokemonData, ( pages, p ) => {

    // const listChunk = _.map( listChunk, p =>
    //   <ListItem
    //     key={ p.id }
    //     name={ p.name }
    //     id={ p.id }
    //     imageUrl={ p.url }
    //     // details={ p.details }
    //   />
    // );
    // return listChunk;
    // });
// console.log( `items`, JSON.stringify(items, undefined, 2) );
  // }

  return (
    <div className="list">
      <h2>LIST</h2>

      <ul className="list">
        {
          pokemonData && getListItems( pokemonData )
        }
        {
          loadingNextSet && (<ListItem loadingPlaceholder />)
        }
      </ul>
    </div>
  )
}

export default List
