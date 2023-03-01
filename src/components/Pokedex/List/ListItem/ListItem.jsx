import React from 'react';

const ListItem = ({
  index,
  size,
  start,
  isLoaderRow,
  pokemonRow,
  hasNextPage
}) => {

  const loaderRow = () => {
    return (
      <div className={ 'loading-row' }>
        {
          !hasNextPage
          ? <span>You caught them all!</span>
          : <>
              <span>'Loading more Pokemon...'</span>
              <div className={ 'spinner' }></div>
            </>
        }
      </div>
    )
  }

  return (
    <li
      key={ index }
      className="list__row"
      style={{
        height: `${size}px`,
        transform: `translateY(${start}px)`,
      }}
    >
      {
        isLoaderRow ? loaderRow() : (
          <div className='list__row__contents'>
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
                alt={`${pokemonRow.name} image`}
              />
            </div>

          </div>
        )
      }
    </li>
  )
};

export default ListItem;
