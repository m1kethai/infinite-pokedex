import './header.scss'

const headerString = "gotta catch 'em all!";

const Header = () => (
  <div className='catchem-container'>
    <h1 className='catchem'>{ headerString }</h1>
  </div>
);

export default Header;
