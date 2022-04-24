import styled from 'styled-components';
import { AppColors } from '../../styled';

export const MetaWeatherContainerBgColor = styled.div`
	background-color: ${AppColors.colors.grayFour};
`;

export const MetaWeatherContainer = styled.div`
	padding: 16px;
	text-align: center;
`;

export const MetaWeatherContainerStyled = styled.div`
	font-family: 'PhilosopherBold', sans-serif;
`;

export const DataMessage = styled.span`
	color: ${AppColors.colors.crimson};
	font-family: 'RobotoMonoV4LatinRegular', sans-serif;
`;
