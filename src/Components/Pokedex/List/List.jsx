import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem/ListItem';

const List = ({ pokemonData, isLoading }) => {
  return (
    <div className="list-container">
      {Object.keys(pokemonData).map((key) => {
        const pageData = pokemonData[key];
        return pageData.map((pokemon) => (
          <ListItem key={pokemon.id} pokemon={pokemon} />
        ));
      })}
      {isLoading &&
        Array.from({ length: 30 }, (_, i) => (
          <ListItem key={`skeleton-${i}`} skeleton />
        ))}
    </div>
  );
};

List.propTypes = {
  pokemonData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default List;
