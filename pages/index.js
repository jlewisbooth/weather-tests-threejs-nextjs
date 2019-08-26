import styled from 'styled-components';
import { useEffect, useState, addReducer, setGlobal, useGlobal } from 'reactn';
import AnimationController from '../src/three-animation/AnimationController';
import WeatherReporter from '../components/WeatherReporter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSunRain } from '@fortawesome/free-solid-svg-icons';

const AnimationContainer = styled.div`

    width: 100vw;
    height: 100vh;
    z-index: 0;
`;

const Canvas = styled.canvas`

    width: 100%;
    height: 100%; 
`;

const WeatherIcon = styled(FontAwesomeIcon)`

    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 1;
    cursor: pointer;
`;

setGlobal({
    showWeatherReport: false
})

const Index = (props) => {

    const [animationContainer, setContainer] = useState(null);
    const [animationController, setAnimationController] = useState(null);
    const [showWeatherReport, changeVisibilityOfReport] = useGlobal('showWeatherReport');

    useEffect(() => {
        if(animationContainer !== null) {
            setAnimationController(new AnimationController);
        }
    },[animationContainer]);

    useEffect(() => {
        if(animationController) {
            animationController.updateConfig({ showWeatherReport: showWeatherReport })
        }
    }, [showWeatherReport]);

    return (
        <AnimationContainer ref={(mount) => {
            setContainer(mount);
        }}>
            <WeatherReporter weather_report={props.weather_report}/>
            <Canvas id='animation-canvas'></Canvas>
            <WeatherIcon    icon={faCloudSunRain}
                            size={"3x"}
                            color={'red'}
                            onClick={() => {
                                changeVisibilityOfReport(!showWeatherReport)
                            }} />
        </AnimationContainer>
    )
}



Index.getInitialProps = async function() {

    // let res = await fetch('https://api.darksky.net/forecast/ceec1978a3c6474afa99f765e463cb84/37.8267,-122.4233')
    // let data = await res.json();
  
    return {
      weather_report: {}
    };
};

export default Index;