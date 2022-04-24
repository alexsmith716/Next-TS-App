import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import { ActionLoadPromiseType, HydrateActionType } from '../../../types';
import dateNow from '../../../utils/dateNow';

const DATE_NOW_LOAD = 'DATE_NOW_LOAD';
const DATE_NOW_LOAD_SUCCESS = 'DATE_NOW_LOAD_SUCCESS';
const DATE_NOW_LOAD_FAIL = 'DATE_NOW_LOAD_FAIL';

const reducer = (state = {}, action: ActionLoadPromiseType | HydrateActionType) => {
	switch (action.type) {
		case HYDRATE:
			return {
				...state,
				...action.payload.dateNowReducer,
			};
		case DATE_NOW_LOAD:
			return {
				...state,
				loading: true,
			};
		case DATE_NOW_LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				dateNowData: action['result'],
			};
		case DATE_NOW_LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				dateNowData: action['error'],
			};
		default:
			return {
				...state
			};
	}
};

export default reducer;

export function loadDateNow(requestFound: boolean, delay: number): AnyAction {
	return {
		type: [DATE_NOW_LOAD, DATE_NOW_LOAD_SUCCESS, DATE_NOW_LOAD_FAIL],
		httpClientPromise: () => dateNow({requestFound: requestFound, delay: delay})
			.then((response) => {
				if (response.status >= 300) {
					return Promise.reject(response);
				}
				return response;
			})
	};
};
