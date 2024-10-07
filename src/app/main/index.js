import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import useSelector from '../../hooks/use-selector';
import UserAuthBar from '../../components/user-auth-bar';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.category.getCategory();

    },
    [],
    true,
  );

  const select = useSelector(state => ({
    user: state.login.nameData.name,
    token: state.login.token
  }))

  const callbacks = {
    logout: useCallback(() => store.actions.login.logOut(), [store])
  };


  const { t } = useTranslate();

  return (
    <PageLayout>
      <UserAuthBar nameUser={select.user} 
                button={t('login')}
                logout={callbacks.logout}

      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
