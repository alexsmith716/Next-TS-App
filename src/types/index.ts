export type AboutCSVBPostType = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

export type HydrateActionType = {
	type: '__NEXT_REDUX_WRAPPER_HYDRATE__';
	payload: any;
};

export type ActionLoadPromiseType = {
	type: string[];
	httpClientPromise: Promise<any>;
};

export type BridgeRatingType = {
	Borough: string;
	Bridge: string;
	CurrentRating: number;
	VerbalRating: string;
	ReplacementCost: number;
};

export type StyledThemeType = {
	textColor: string;
	backgroundColor: string;
	navBarColor: string;
	spinnerColor: string;
	rutgersScarlet: string;
};

export type DateNowType = {
	time: number;
	message: string;
	status: number;
};

export type DateNowErrorType = {
	message: string;
	status: number;
};

export type User = {
	id: number;
	name: string;
};
