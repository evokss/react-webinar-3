import { memo, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

function AuthenticatedProfile({children}) {
  const store = useStore();
  const navigate = useNavigate()

  const select = useSelector(state => ({
    token: state.login.token
  }))

  useEffect(() => {
    if(!select.token)  {
        navigate('/login')
    } else store.actions.profile.getUserInfo(select.token)
    
  }, [select.token])

  return (
    <div>
      {children}
    </div>
  );
}

export default memo(AuthenticatedProfile);
