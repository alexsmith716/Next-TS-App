import { Middleware } from 'redux';
import { AppState, ApiClient } from './store';

export default function clientMiddleware(httpClient: ApiClient): Middleware {
	return ({ dispatch, getState }) => next => action => {

		if (typeof action === 'function') {
			return action(dispatch, getState);
		}

		const { httpClientPromise, type } = action;

		if (!httpClientPromise) {
			return next(action);
		}

		const [REQUEST, SUCCESS, FAILURE] = type;

		next({ type: REQUEST });

		const promise = httpClientPromise(httpClient, dispatch);

		promise
			.then(
				(result: AppState) => {
					next({ result, type: SUCCESS });
				},
				(error: Error) => {
					next({ error, type: FAILURE });
				},
			)
			.catch((error: Error) => {
				next({ error, type: FAILURE });
			});

		return promise;
	}
};
