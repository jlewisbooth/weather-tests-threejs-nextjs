import styled from 'styled-components';
import { useGlobal, useDispatch, useEffect } from 'reactn';
import posed from 'react-pose';
import fetch from 'isomorphic-fetch';

const AnimatedDiv = posed.div({
    visible: {
        x: '0px',
        opacity: 1,
        delay: 500,
        delayChildren: 200,
        staggerChildren: 100
    },
    hidden: {
        x: '-100%',
        opacity: 0
    }
});

const WeatherDiv = styled(AnimatedDiv)`

    position: absolute;
    left: 20px;
    top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 200px;
    height: 200px;
    background-color: grey;
    border-radius: 20px;
    z-index: 1;
`;

const AnimatedIcon = posed.object({
    visible: {
        x: '0px',
        opacity: 1
    },
    hidden: {
        x: '-100%',
        opacity: 0
    }
})

const WeatherIcon = styled(AnimatedIcon)`

    flex: 1;
`

export default function WeatherReporter(props) {

    const [showWeatherReport] = useGlobal('showWeatherReport');

    useEffect(() => {
        
    },[showWeatherReport]);


    return (
        <WeatherDiv pose={ showWeatherReport ? "visible" : "hidden"}> 
            <WeatherIcon data={'/static/img/weather-icons/Cloud-Rain.svg'} />
            <p>Rainy and Cloudy</p>
        </WeatherDiv>
    )
}