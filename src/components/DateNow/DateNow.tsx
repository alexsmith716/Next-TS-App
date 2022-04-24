import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux/store';
import { loadDateNow } from '../../redux/reducers/dateNowSlice';
import Loading from '../Loading/Loading';
import Button from '../Button';
import * as Styles from './styles';

const DateNow = () => {
	const dispatch = useDispatch();

	const loading = useSelector((state: AppState) => state.dateNowReducer.loading);
	const loaded = useSelector((state: AppState) => state.dateNowReducer.loaded);
	const data = useSelector((state: AppState) => state.dateNowReducer.dateNowData);

	return (
		<div className="container">
			<Styles.DateNowContainerBgColor className="flex-column align-items-center mb-5">
				<Styles.DateNowContainer className="flex-column align-items-center">
					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{loading && <Loading text="Loading" />}

					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{!loading && (
						<Styles.DateNowContainerStyled className="flex-column-center">
							<div>
								DateNow message:&nbsp;
								{data && <>&apos;<Styles.DataMessage>{data.message}</Styles.DataMessage>&apos;</>}
							</div>

							<div>Status:&nbsp;{data && data.status}</div>

							<div>{data && loaded && data && new Date(data.time).toString()}</div>

							<div className="mt-2">
								<Button
									className="btn-primary btn-md"
									onClick={() => dispatch(loadDateNow(true, 1999))}
									buttonText="Reload"
								/>
							</div>
						</Styles.DateNowContainerStyled>
					)}
				</Styles.DateNowContainer>
			</Styles.DateNowContainerBgColor>
		</div>
	);
};

export default DateNow;
