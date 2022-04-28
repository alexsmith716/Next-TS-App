import { AppProps } from 'next/app';
import { wrapper } from '../redux/store';
import { ThemeContext } from '../styled/ThemeContext';
import { Layout } from '../components/Layout';
import { actionSetUserAgent } from '../redux/reducers/userAgentSlice';
import { loadMetaWeatherServer } from '../redux/reducers/metaWeatherSlice';
import { getUserAgent, isBot } from '../utils/userAgent';
import '../styled/fonts.css';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<ThemeContext>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeContext>
		</>
	);
};

App.getInitialProps = wrapper.getInitialAppProps((store) => async ({ Component, ctx }) => {
	const isServer = typeof window === 'undefined' && !ctx.req?.url?.startsWith('/_next/data');

	if (isServer) {
		store.dispatch(actionSetUserAgent(getUserAgent(ctx?.req?.headers['user-agent']!), isBot(ctx?.req?.headers['user-agent']!)));
	}

	if (isServer) {
		await store.dispatch(loadMetaWeatherServer())
			.catch((error: Error) => {
				console.error(error);
			})
	}

	const pageProps = {
		...(Component.getInitialProps
			? await Component.getInitialProps({
					...ctx,
					store,
				})
			: {}),
		documentTitle: 'Alex Smith\'s App',
	};

	return {
		pageProps,
	};
});

export default wrapper.withRedux(App);
