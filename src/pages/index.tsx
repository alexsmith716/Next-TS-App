import type { NextPage } from 'next';
import Head from 'next/head';
import Home from '../components/Home/Home';

const IndexPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Home</title>
			</Head>
			<Home />
		</>
	)
};

export default IndexPage;
