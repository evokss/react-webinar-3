import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import UserAuthBar from '../../components/user-auth-bar';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import ProfileForm from '../../components/profile-form';
import AuthenticatedProfile from '../../containers/authenticated-profile';

function Profile() {
  
  const store = useStore();
  
  const select = useSelector(state => ({
    user: state.login.nameData,
    email: state.profile.nameData.email,
    profile: state.profile.profile,
    auth: state.profile.done,
  }))
  
  const { t } = useTranslate();

  const callbacks = {
    logout: useCallback(() => store.actions.login.logOut(), [store])

  };

  return (
    <PageLayout>
      <UserAuthBar nameUser={select.user?.name} 
                button={t('login')}
                logout={callbacks.logout}
      />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <AuthenticatedProfile>
        {select.profile && <ProfileForm  profile={select.profile}
                      email={select.email}
                      auth={select.auth}
                      text={t('profile')}
        />}
      </AuthenticatedProfile>
    </PageLayout>
  );
}

export default memo(Profile);
