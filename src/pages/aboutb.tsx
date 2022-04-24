import type { NextPage } from 'next';
import Head from 'next/head';
import Loading from '../components/Loading/Loading';
import * as Styles from '../styles/styles-about';

import useSwr from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AboutB: NextPage = () => {
	const { data, error } = useSwr('/api/users', fetcher);

	//if (error) return <div>Failed to load users</div>;
	//if (!data) return <div>Loading...</div>;

	return (
		<>
			<Head>
				<title>AboutB</title>
			</Head>

			<div className="container">

				<h1 className="mt-4 mb-3">AboutB (API / users.js)</h1>

				<div className="row-grid grid-six bg-lightskyblue-1 mb-5">
					<div className="col-grid mb-4">
						<Styles.AboutImageMain
							className="img-fluid rounded"
							src={'/about-750-450.png'}
							alt={''}
						/>
					</div>

					<div className="col-grid">
						<h2>AboutB</h2>
						<p>
							<b>This component utilizes SWR.</b>
						</p>

						<div className="custom-pp">AboutB.</div>

						{/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}
						{!data && <Loading text="Loading" />}

						{/* (>>>>>>>>>>>>>>>>>>>>>> ERROR >>>>>>>>>>>>>>>>>>>>>>>>) */}
						{error && (
							<div className="bg-warn-red container-padding-radius-10 text-color-white">
								Failed to load user
							</div>
						)}

						{/* (>>>>>>>>>>>>>>>>>>>>>> LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}
						{data && (
							<div className="block-element-p">
								<ul>
									{data.map(({id}: {id: any}) => (
										<li key={`user_${id}`}>
											<Link href="/user/[id]" as={`/user/${id}`}>
												<a>{`User ${id}`}</a>
											</Link>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutB;