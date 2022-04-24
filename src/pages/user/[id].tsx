import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Head from 'next/head';
import useSwr from 'swr';
import Loading from '../../components/Loading/Loading';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const User: NextPage = () => {
	const router = useRouter()
	const { data, error } = useSwr(
		router.query.id ? `/api/user/${router.query.id}` : null,
		fetcher
	)

	return (
		<>
			<Head>
				<title>{data && data.name}</title>
			</Head>

			<div className="container">

				<h1 className="mt-4 mb-3">{data && data.name}</h1>

				<div className="row-grid grid-six bg-lightskyblue-1 mb-5">

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
						<div className="col-grid">
							<h2>{data && data.name}</h2>
							<p>
								<b>This component utilizes the {data.name}.</b>
							</p>
							<p>
								{data && data.name}.
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default User;
