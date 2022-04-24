import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import { ActionLoadPromiseType, HydrateActionType } from '../../../types';
import { fetchBridgeRatings } from '../../../utils/fetchBridgeRatings';

const NYC_BRIDGE_RATINGS_LOAD = 'NYC_BRIDGE_RATINGS_LOAD';
const NYC_BRIDGE_RATINGS_LOAD_SUCCESS = 'NYC_BRIDGE_RATINGS_LOAD_SUCCESS';
const NYC_BRIDGE_RATINGS_LOAD_FAIL = 'NYC_BRIDGE_RATINGS_LOAD_FAIL';

const reducer = (state = {}, action: ActionLoadPromiseType | HydrateActionType) => {
	switch (action.type) {
		case HYDRATE:
			return {
				...state,
				...action.payload.nycBridgeRatingsReducer,
			};
		case NYC_BRIDGE_RATINGS_LOAD:
			return {
				...state,
				loading: true,
			};
		case NYC_BRIDGE_RATINGS_LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				dateNowData: action['result'],
			};
		case NYC_BRIDGE_RATINGS_LOAD_FAIL:
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

export function loadNYCBridgeRatings(): AnyAction {
	return {
		type: [NYC_BRIDGE_RATINGS_LOAD, NYC_BRIDGE_RATINGS_LOAD_SUCCESS, NYC_BRIDGE_RATINGS_LOAD_FAIL],
		httpClientPromise: () => fetchBridgeRatings()
			.then((response) => {
				return response.result;
			})
			.catch((error) => {
				return Promise.reject(error.result);
			})
	};
};
