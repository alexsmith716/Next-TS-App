import type { NextPage } from 'next';
import Head from 'next/head';
import * as Styles from '../styles/styles-about';

const AboutCSV: NextPage = () => {

	return (
		<>
			<Head>
				<title>AboutCSV</title>
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
							<b>This component utilizes React.</b>
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
