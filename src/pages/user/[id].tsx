import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import useSwr from 'swr';
import Loading from '../../components/Loading/Loading';

const fetcher = (url: any) => fetch(url).then((res) => res.json());

interface UserPageProps {
	documentTitle: string;
};

const User: NextPage<UserPageProps> = ({documentTitle}) => {
	const router = useRouter();
	const [title, setTitle] = useState('');
	const { data, error } = useSwr(
		router.query.id ? `/api/user/${router.query.id}` : null,
		fetcher
	);

	useEffect(() => {
		data ? setTitle(documentTitle+':'+String.fromCharCode(160) + data.name.toString()) : null;
	}, [data, documentTitle]);

	return (
		<>
			<Head>
				<title>{ !title ? documentTitle : title }</title>
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
