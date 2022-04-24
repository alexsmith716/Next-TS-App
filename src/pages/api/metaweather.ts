import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
// AxiosResponse

//@ts-ignore
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const returned = await axios('https://www.metaweather.com/api/location/2459115');
		res.status(returned.status).json(returned.data);
	} catch (error) {
		// const typedError = error as Error;
		// error.isAxiosError
		res.status(400).json({error: 'error'});
	}
};
