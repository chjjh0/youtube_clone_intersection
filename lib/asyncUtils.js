export const reducerUtils = {
  inital: {
    videos: {
      data: null,
      nextPageToken: null,
      loading: false,
      error: null,
    },
  },
  loading: (prevState = null, nextPageToken = null) => ({
    data: prevState,
    nextPageToken,
    loading: true,
    error: null,
  }),
  success: data => ({
    data: data.videos,
    nextPageToken: data.nextPageToken,
    loading: false,
    error: null,
  }),
  pagination_success: (data = null, nextPageToken = null) => ({
    data,
    nextPageToken,
    loading: false,
    error: null,
  }),
  error: (prevVideos = null, error) => ({
    data: prevVideos,
    nextPageToken: null,
    loading: false,
    error,
  }),
};

// key: only videos
export const handleAsyncActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(state[key].data),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};

// key: only videos
export const handleAsyncActionsByPageToken = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (state, action) => {
    const prevVideos = state.videos.data;

    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(prevVideos, state[key].nextPageToken),
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.pagination_success(
            prevVideos.concat(action.payload.videos),
            action.payload.nextPageToken,
          ),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(prevVideos, action.payload),
        };
      default:
        return state;
    }
  };
};
