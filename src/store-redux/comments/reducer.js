export const initialState = {
  data: {},
  comments: [],
  count: 0,
  waiting: false, // cвойство ожидания при прогрузке
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: {}, comments: [], count: 0, waiting: true };

    case 'comments/load-success':

      return {
        ...state,
        data: action.payload.data,
        comments: action.payload.comments.items,
        count: action.payload.comments.count,
        waiting: false,
      };

    case 'comments/load-error':
      return { ...state, data: {}, comments: [], count: 0, waiting: false };

    case 'comments/add-start':
      return { ...state, waiting: true };

    case 'comments/add-success':
      return { ...state.data, data: action.payload.data, waiting: false };

    case 'comments/add-error':
      return { ...state, waiting: false };
    default:
      return state;
  }
}

export default reducer;
