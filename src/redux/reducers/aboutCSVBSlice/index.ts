import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux';
import { ActionLoadPromiseType, HydrateActionType } from '../../../types';
import { AxiosInstance } from 'axios';

const ABOUTCSVB_LOAD = 'ABOUTCSVB_LOAD';
const ABOUTCSVB_SUCCESS = 'ABOUTCSVB_SUCCESS';
const ABOUTCSVB_FAIL = 'ABOUTCSVB_FAIL';

const reducer = (state = {}, action: ActionLoadPromiseType | HydrateActionType) => {
	switch (action.type) {
		case HYDRATE:
			return {
				...state,
				...action.payload.aboutCSVBReducer,
			};
		case ABOUTCSVB_LOAD:
			return {
				...state,
				loading: true,
			};
		case ABOUTCSVB_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				aboutCSVBData: action['result'],
			};
		case ABOUTCSVB_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				aboutCSVBData: {error: 'Error when attempting to fetch resource.'},
			};
		default:
			return {
				...state
			};
	}
};

export default reducer;

export function loadAboutCSVB(): AnyAction {
	const limit: number = Math.floor(Math.random() * 6) + 1;
	return {
		type: [ABOUTCSVB_LOAD, ABOUTCSVB_SUCCESS, ABOUTCSVB_FAIL],
		httpClientPromise: ({httpClient}: {httpClient: AxiosInstance}) => httpClient.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
			.then((response) => {
				return {props: {posts: response,}};
			})
			.catch(() => {
				return Promise.reject();
			})
	};
};
