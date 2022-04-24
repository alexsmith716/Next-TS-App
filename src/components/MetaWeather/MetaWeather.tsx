import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux/store';
import { loadMetaWeather } from '../../redux/reducers/metaWeatherSlice';
import Loading from '../Loading/Loading';
import Button from '../Button';
import * as Styles from './styles';

const MetaWeather = () => {
	const dispatch = useDispatch();

	const formatter = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	let metaWeatherDataST;
	let metaWeatherDataTP;

	const loading = useSelector((state: AppState) => state.metaWeatherReducer.loading);
	const loaded = useSelector((state: AppState) => state.metaWeatherReducer.loaded);
	const metaWeatherData = useSelector((state: AppState) => state.metaWeatherReducer.metaWeatherData);

	if(metaWeatherData && !metaWeatherData.error) {
		metaWeatherDataST = metaWeatherData.consolidated_weather[0].weather_state_name;
		metaWeatherDataTP = formatter.format(metaWeatherData.consolidated_weather[0].the_temp);
	}

	return (
		<div className="container">
			<Styles.MetaWeatherContainerBgColor className="flex-column align-items-center mb-5">
				<Styles.MetaWeatherContainer className="flex-column align-items-center">
					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADING >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{loading && <Loading text="Loading" />}

					{/* (>>>>>>>>>>>>>>>>>>>>>> LOADED >>>>>>>>>>>>>>>>>>>>>>>>) */}
					{!loading && (
						<Styles.MetaWeatherContainerStyled className="flex-column-center">
							<div>
								The Exclusive <i>MetaWeather.com</i>&nbsp;forecast{loaded && metaWeatherData && <>&nbsp;for:</>}
							</div>

							<div>
								{!loaded && metaWeatherData && metaWeatherData.error && <Styles.DataMessage>{metaWeatherData.error}</Styles.DataMessage>}
							</div>

							<div>
								{loaded && metaWeatherData && !metaWeatherData.error && <Styles.DataMessage>{metaWeatherData.title}&nbsp;{metaWeatherData.location_type}</Styles.DataMessage>}
							</div>

							<div>
								{loaded && metaWeatherData && !metaWeatherData.error && <>{metaWeatherDataST}&nbsp;<Styles.DataMessage>and</Styles.DataMessage>&nbsp;{metaWeatherDataTP}&nbsp;celsius</>}
							</div>

							<div className="mt-2">
								<Button
									className="btn-primary btn-md"
									onClick={() => dispatch(loadMetaWeather())}
									buttonText="Reload"
								/>
							</div>
						</Styles.MetaWeatherContainerStyled>
					)}
				</Styles.MetaWeatherContainer>
			</Styles.MetaWeatherContainerBgColor>
		</div>
	);
};

export default MetaWeather;
