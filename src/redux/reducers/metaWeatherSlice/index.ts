import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import { ActionLoadPromiseType, HydrateActionType } from '../../../types';
import { AxiosInstance } from 'axios';

const METAWEATHER_LOAD = 'METAWEATHER_LOAD';
const METAWEATHER_SUCCESS = 'METAWEATHER_SUCCESS';
const METAWEATHER_FAIL = 'METAWEATHER_FAIL';

const reducer = (state = {}, action: ActionLoadPromiseType | HydrateActionType) => {
	switch (action.type) {
		case HYDRATE:
			return {
				...state,
				...action.payload.metaWeatherReducer,
			};
		case METAWEATHER_LOAD:
			return {
				...state,
				loading: true,
			};
		case METAWEATHER_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				metaWeatherData: action['result'],
			};
		case METAWEATHER_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				metaWeatherData: {error: 'Error when attempting to fetch resource.'},
			};
		default:
			return {
				...state
			};
	}
};

export default reducer;

export function loadMetaWeather(): AnyAction {
	return {
		type: [METAWEATHER_LOAD, METAWEATHER_SUCCESS, METAWEATHER_FAIL],
		httpClientPromise: ({httpClient}: {httpClient: AxiosInstance}) => httpClient.get('http://localhost:3000/api/metaweather')
			.then((response) => {
				return response;
			})
			.catch((error) => {
				return Promise.reject(error);
			})
	};
};