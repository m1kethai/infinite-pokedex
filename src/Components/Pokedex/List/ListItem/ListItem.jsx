import './list-item.scss'

function ListItem( props ) {
  // console.log("🚀🚀🚀  ListItem  props", props);

  const { name, type } = props.poke;

  console.log("🚀🚀🚀  ListItem  name", name);
  console.log("🚀🚀🚀  ListItem  type", type);

  return (
    <div className="list-item">

      <h2>==========</h2>

      <div className="poke-info">
        <h3>{ name }</h3>
        <h3>{ type }</h3>
      </div>
    </div>
    )
  }

  export default ListItem