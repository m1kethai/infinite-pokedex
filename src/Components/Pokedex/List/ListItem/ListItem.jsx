import './list-item.scss'

function ListItem({
  name,
  id,
  imageUrl,
  // details
  loading
}) {
  // console.log("🚀🚀🚀  ListItem  name", name);
  // console.log("🚀🚀🚀  ListItem  type", type);

  function pokemonInfo() {
    return (<>
        <h2 className="name">
          { name }
        </h2>
        <h3 className="id">
          #{ id }
        </h3>
        {/* <h3>{ type }</h3> */}
      </>)
  }

  return (
    <li className="list-item">

      <div className="image-container">
      </div>

      <div className="pokemon-info">
        {
          !loading
            ? pokemonInfo()
            : (<h1>PLACEHOLDER</h1>)
        }
      </div>
    </li>
    )
  }

  export default ListItem