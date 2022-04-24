import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';
import * as Styles from './styles';

const UserAgent = () => {
	const userAgent = useSelector((state: AppState) => state.userAgentReducer.userAgent);
	const isBot = useSelector((state: AppState) => state.userAgentReducer.isBot);

	return (
		<div className="container">
			<div className="flex-column align-items-center mb-5">
				<Styles.UserAgentStyled className="flex-column align-items-center">

					<Styles.UserAgentUserAgent>{`device 'userAgent' store state is ${userAgent} !`}</Styles.UserAgentUserAgent>

					<Styles.UserAgentIsBot>{`device 'bot' store state is ${isBot} !`}</Styles.UserAgentIsBot>

					<Styles.UserAgentBlurb>UserAgentStyled!</Styles.UserAgentBlurb>
				</Styles.UserAgentStyled>
			</div>
		</div>
	);
};

export default UserAgent;
