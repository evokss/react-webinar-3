import { memo, useCallback, useEffect, useState } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import UserAuthBar from '../../components/user-auth-bar';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';
import { useLocation, useNavigate } from 'react-router-dom';

function Login() {
  
  const store = useStore();
  const navigate = useNavigate()
  const location = useLocation()
  
  const select = useSelector(state => ({
    user: state.login.nameData?.name,
    auth: state.login.auth,
    error: state.login.error,
    token: state.login.token,
  }))

  const callbacks = {
    // Сортировка
    login: useCallback(data => store.actions.login.logIn(data), [store]),
    clear: useCallback(() => store.actions.login.clearError(), [store])

  };

  useEffect(() => {
    if(select.auth || select.token)  {
      if(location.state) {
        navigate(location.state.pathname)
      } else navigate('/profile')
    }
  }, [select.auth, select.token, location.pathname])

  useEffect(() => {
    callbacks.clear()
  }
  , [])

  const [userData, setUserData] = useState({login: "", password: ""})

  const { t } = useTranslate();




  return (
    <PageLayout>
      <UserAuthBar nameUser={select.user}
                button={t('login')}
      />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <LoginForm  setUserData={setUserData} 
                  userData={userData} 
                  onSubmit={callbacks.login}
                  error={select.error}
                  auth={select.auth}
                  text={t('login')}
      />
    </PageLayout>
  );
}



export default memo(Login);
