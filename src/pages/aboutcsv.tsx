import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import * as Styles from '../styles/styles-about';

interface AboutCSVPageProps {
	documentTitle: string;
};

const AboutCSV: NextPage<AboutCSVPageProps> = ({documentTitle}) => {
	const [title, setTitle] = useState('');

	useEffect(() => {
		setTitle(documentTitle+':'+String.fromCharCode(160)+'AboutCSV');
	}, [documentTitle]);

	return (
		<>
			<Head>
				<title>{ !title ? documentTitle : title }</title>
			</Head>

			<div className="container">

				<h1 className="mt-4 mb-3">AboutCSV</h1>

				<div className="row-grid grid-six bg-lightskyblue-1 mb-5">
					<div className="col-grid mb-4">
						<Styles.AboutImageMain
							className="img-fluid rounded"
							src={'/about-750-450.png'}
							alt={''}
						/>
					</div>

					<div className="col-grid">
						<h2>AboutCSV</h2>
						<p>
							<b>This component utilizes the AboutCSV.</b>
						</p>
						<p>
							AboutCSV.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutCSV;
