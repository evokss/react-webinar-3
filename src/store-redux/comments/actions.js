export default {
  load: id => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });

        dispatch({ type: 'comments/load-success', payload: { comments: res.data.result } });
      } catch (e) {
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  add: (username, commentText, id, type) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: 'comments/create-comment-start' });

      const token = localStorage.getItem('token');

      try {
        const res = await services.api.request({
          url: '/api/v1/comments',
          method: 'POST',
          headers: { [services.config.store.modules.session.tokenHeader]: token },
          body: JSON.stringify({
            text: commentText,
            parent: { _id: id, _type: type },
          }),
        });

        const {
          _id,
          text,
          dateCreate,
          isDeleted,
          parent: { _id: parentId, _type: parentType },
        } = res.data.result;

        const data = {
          _id,
          text,
          dateCreate,
          isDeleted,
          author: {
            profile: { name: username },
          },
          parent: { _id: parentId, _type: parentType },
        };

        dispatch({
          type: 'comments/create-comment-success',
          payload: { data },
        });
      } catch (e) {
        dispatch({ type: 'comments/create-comment-error' });
      }
    };
  },
};
