import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import { useDispatch, useSelector as useSelecrotRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';
import CommentsList from '../../components/comment-list';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import useSelector from '../../hooks/use-selector';

function Article() {
  const store = useStore();
  const { t } = useTranslate();
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    //store.actions.article.load(params.id);
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const oldSelect = useSelector(state => ({
    exists: state.session.exists,
    username: state.session.user?.profile?.name,
  }));

  const select = useSelecrotRedux(
    state => ({
      article: state.article.data,
      waiting: state.article.waiting,
      comments: state.comments.comments,
      commentsCount: state.comments.count,
      waitingComments: state.comments.waiting,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const changedData = select.comments.map(item => {
    if (item?.parent?._type === 'article') {
      item.parent = {};
    }
    return item;
  });

  const options = {
    comments: useMemo(
      () =>
        treeToList(listToTree(changedData), (item, level) => ({
          ...item,
          parentId: item.parent?._id || null,
          count: level,
          _id: item._id,
          text: item.text,
        })),
      [select.comments],
    ),
  };

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    addComment: useCallback(
      comment => {
        dispatch(commentsActions.add(select.username, comment, params.id, 'article'));
        dispatch(commentsActions.load(params.id));
      },
      [dispatch, commentsActions],
    ),
    addResponse: useCallback(
      (comment, commentId) => {
        dispatch(commentsActions.add(select.username, comment, commentId, 'comment'));
        dispatch(commentsActions.load(params.id));
      },
      [dispatch, commentsActions],
    ),
  };

  return (
    <PageLayout>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waitingComments || select.waiting}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
        <CommentsList
          list={options.comments}
          commentsCount={select.commentsCount}
          exists={oldSelect.exists}
          onResponse={callbacks.addResponse}
          onComment={callbacks.addComment}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
