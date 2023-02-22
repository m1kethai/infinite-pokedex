import './list-item.scss'

function ListItem({
  name,
  id,
  imageUrl,
  // details
}) {
  // console.log("🚀🚀🚀  ListItem  name", name);
  // console.log("🚀🚀🚀  ListItem  type", type);

  return (
    <li className="list-item">

      <div className="image-container">
      </div>

      <div className="pokemon-info">
        <h2 className="name">
          { name }
        </h2>
        <h3 className="id">
          #{ id }
        </h3>
        {/* <h3>{ type }</h3> */}
      </div>
    </li>
    )
  }

  export default ListItem