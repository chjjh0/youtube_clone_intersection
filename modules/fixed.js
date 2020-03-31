import { call, put, select, takeLatest, throttle } from 'redux-saga/effects';

const TOGGLE_FIXED = 'fixed/TOGGLEFIXED';

export const toggleFixed = () => ({ type: TOGGLE_FIXED });

const initalState = {
  fixed: false,
};

export default function fixed(state = initalState, action) {
  switch (action.type) {
    case TOGGLE_FIXED:
      return {
        fixed: !state.fixed,
      };
    default:
      return state;
  }
}
