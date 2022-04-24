import { HYDRATE } from 'next-redux-wrapper';
import { HydrateActionType } from '../../../types';

const SET_USER_AGENT = 'SET_USER_AGENT';

type UserAgentType = string;
type IsBotType = string;

type ActionSetUserAgentType = {
	type: typeof SET_USER_AGENT;
	userAgent: UserAgentType;
	isBot: IsBotType;
};

const reducer = (state = {}, action: ActionSetUserAgentType | HydrateActionType) => {
	switch (action.type) {
		case HYDRATE:
			return {
				...state,
				...action.payload.userAgentReducer,
			};
		case SET_USER_AGENT: {
			return {
				...state,
				userAgent: action.userAgent,
				isBot: action.isBot,
			};
		}
		default: {
			return state;
		}
	}
};

export default reducer;

export const actionSetUserAgent = (userAgent: UserAgentType, isBot: IsBotType) => ({
	type: SET_USER_AGENT,
	userAgent,
	isBot,
});
