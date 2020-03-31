import { fetchVideos, handlePagination } from '../lib/fetchVideos';
import { 
  reducerUtils, 
  handleAsyncActions, 
  handleAsyncActionsByPageToken } from '../lib/asyncUtils';
import { call, put, select, takeLatest, throttle } from 'redux-saga/effects';

const GET_VIDEOS = 'videos/GET_VIDEOS';
const GET_VIDEOS_SUCCESS = 'videos/GET_VIDEOS_SUCCESS';
const GET_VIDEOS_ERROR = 'videos/GET_VIDEOS_ERROR';

const GET_VIDEOS_BYPAGETOKEN = 'videos/GET_VIDEOS_BYPAGETOKEN';
const GET_VIDEOS_BYPAGETOKEN_SUCCESS = 'videos/GET_VIDEOS_BYPAGETOKEN_SUCCESS';
const GET_VIDEOS_BYPAGETOKEN_ERROR = 'videos/GET_VIDEOS_BYPAGETOKEN_ERROR';
const GET_VIDEOS_BYPAGETOKEN_NODATA = 'videos/GET_VIDEOS_BYPAGETOKEN_NODATA';

export const getVideos = () => ({ type: GET_VIDEOS });
export const getVideosByToken = () => ({ type: GET_VIDEOS_BYPAGETOKEN })
export const getVideosByTokenNoData = () => ({ type: GET_VIDEOS_BYPAGETOKEN_NODATA })

function* getVideosSaga() {
  try {
    const videos = yield call(fetchVideos);
    yield put({
      type: GET_VIDEOS_SUCCESS,
      payload: videos
    });
  } catch(e) {
    yield put({
      type: GET_VIDEOS_ERROR,
      error: true,
      payload: e
    })
  }
}

function* getVideosByPageTokenSaga() {
  const state = yield select();
  const pageToken = state.videos.videos.nextPageToken;

  try {
    if (pageToken === null) {
      yield put({
        type: GET_VIDEOS_BYPAGETOKEN_ERROR,
        error: true,
        payload: 'noMoreData'
      })
    } else {
      const videos = yield call(handlePagination, pageToken);
      yield put({
        type: GET_VIDEOS_BYPAGETOKEN_SUCCESS,
        payload: videos
      });
    }
  } catch(e) {
    yield put({
      type: GET_VIDEOS_BYPAGETOKEN_ERROR,
      error: true,
      payload: e
    })
  }
}

export function* videosSaga() {
  yield takeLatest(GET_VIDEOS, getVideosSaga);
  yield throttle(3000, GET_VIDEOS_BYPAGETOKEN, getVideosByPageTokenSaga);
}

export default function videos(state = reducerUtils.inital, action) {
  switch (action.type) {
    case GET_VIDEOS:
    case GET_VIDEOS_SUCCESS:
    case GET_VIDEOS_ERROR:
      return handleAsyncActions(GET_VIDEOS, 'videos')(state, action);
    case GET_VIDEOS_BYPAGETOKEN:
    case GET_VIDEOS_BYPAGETOKEN_SUCCESS:
    case GET_VIDEOS_BYPAGETOKEN_ERROR:
      return handleAsyncActionsByPageToken(GET_VIDEOS_BYPAGETOKEN, 'videos')(state, action);
    default:
      return state;
  }
}