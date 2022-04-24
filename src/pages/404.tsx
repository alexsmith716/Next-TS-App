import React, { FC } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

interface NotFoundProps {};

const StyledHeadingOne = styled.h1`
	color: #000;
`;

const NotFound: FC<NotFoundProps> = () => {
	return (
		<>
			<Head>
				<title>Status Code 404</title>
			</Head>

			<div className="container">
				<StyledHeadingOne className="mt-4 mb-3">Status Code 404!</StyledHeadingOne>
				<div>
					<div>
						<p>Page Not Found.</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default NotFound;
