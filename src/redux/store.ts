import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, combineReducers, createStore, compose, Middleware } from 'redux';
import { AxiosInstance } from 'axios';
//@ts-ignore
import persistStore from 'redux-persist/es/persistStore';
import clientMiddleware from './clientMiddleware';
import userAgentReducer from './reducers/userAgentSlice';
import dateNowReducer from './reducers/dateNowSlice';
import nycBridgeRatingsReducer from './reducers/nycBridgeRatingsSlice';
import metaWeatherReducer from './reducers/metaWeatherSlice';
import aboutCSVBReducer from './reducers/aboutCSVBSlice';
import apiClient from '../utils/apiClient';
//import storage from './create_sync_storage';
//import storage from 'localforage';

export interface ApiClient {
	httpClient: AxiosInstance;
};

const rootReducer = combineReducers({
	userAgentReducer,
	dateNowReducer,
	nycBridgeRatingsReducer,
	metaWeatherReducer,
	aboutCSVBReducer,
});

const logger: Middleware = store => next => action => {
	console.group(action.type)
	console.info('dispatching', action)
	let result = next(action)
	console.log('next state', store.getState())
	console.groupEnd()
	return result
}

const bindMiddleware = (middleware: any) => {
	if (process.env.NODE_ENV !== 'production') {
		return compose(applyMiddleware(...middleware, logger))
	}
	return applyMiddleware(...middleware)
}

const makeStore = () => {
	const api = apiClient();
	const providers = { httpClient: api };
	const isServer = typeof window === 'undefined';

	// *********** will ASAP be converted to RTK ***********
	if (isServer) {
		return createStore(rootReducer, bindMiddleware([clientMiddleware(providers)]) );
	} else {
		const { persistStore, persistReducer } = require('redux-persist');
		const storage = require('redux-persist/lib/storage').default;

		const persistConfig = {
			key: 'root',
			whitelist: [
				'userAgentReducer',
				'dateNowReducer',
				'nycBridgeRatingsReducer',
				'metaWeatherReducer',
				'aboutCSVBReducer',
			],
			storage,
		};

		const persistedReducer = persistReducer(persistConfig, rootReducer);

		const store = createStore(persistedReducer, bindMiddleware([clientMiddleware(providers)]) );

		// create a persistor object & enable persistability
		persistStore(store);

		return store;
	}
};

export type AppState = ReturnType<typeof rootReducer>;

export const wrapper = createWrapper(makeStore);
