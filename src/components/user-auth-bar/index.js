import { memo } from 'react';
import './style.css';
import { Link, useLocation } from 'react-router-dom';

function UserAuthBar({ nameUser="", button, logout }) {

  const location = useLocation()
  
  if(nameUser) {
  return (
    <div className='UserAuthBar'>
        <Link to= '/profile' state = {{pathname: location.pathname}}>{nameUser}</Link>
        <button onClick={logout}>{button.exit}</button>
    </div>
    )
  }

  return (
      <div className='UserAuthBar'>
        <Link to= '/login' state = {{pathname: location.pathname}}>
        <button>{button.enter}</button></Link>
      </div>  
    )
  ;
}

export default memo(UserAuthBar);
