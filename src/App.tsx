/* eslint-disable no-unused-vars */
import { MouseEvent, useEffect, useRef, useState } from 'react';

import './App.css';
import backgroundVideo from '@assets/background/background_video.mp4';

const A = () => <h1 className="title">what object reminds you of sarang?</h1>;
const B = () => (
    <h2 className="description">
        sarang is stste of mind that evokes <br />
        love for various aspects of life <br />
        including friend, family, nature, God, <br />
        furry friends and so many more...
    </h2>
);
const C = () => <div className="component">Component C</div>;

function App() {
    const [currentComponent, setCurrentComponent] = useState('A');
    const [animationClass, setAnimationClass] = useState('slide-in');

    useEffect(() => {
        const durations: any = {
            A: 4000,
            B: 4000,
            C: 12000,
        };

        const nextComponent: any = {
            A: 'B',
            B: 'C',
            C: 'A',
        };

        const timer = setTimeout(() => {
            setAnimationClass('slide-out');
            setTimeout(() => {
                setCurrentComponent(nextComponent[currentComponent]);
                setAnimationClass('slide-in');
            }, 500); // 애니메이션 시간
        }, durations[currentComponent] - 500); // 전환 전 애니메이션 시간을 고려하여 조정

        return () => clearTimeout(timer);
    }, [currentComponent]);

    return (
        <div className="App">
            <div className="contents">
                <video id="background-video" loop autoPlay>
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
                <div className={`container ${animationClass}`}>
                    {currentComponent === 'A' && <A />}
                    {currentComponent === 'B' && <B />}
                    {currentComponent === 'C' && <C />}
                </div>
            </div>
        </div>
    );
}

export default App;
