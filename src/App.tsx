/* eslint-disable no-unused-vars  */
import { MouseEvent, useContext, useEffect, useRef, useState } from 'react';

import backgroundVideo from '@assets/background/background_video.mp4';
import { Modal } from '@components/AnswerModal.tsx';
import { CardStack } from '@components/CardStack.tsx';

import './App.css';
import { InputContext } from './hooks/useInputs.tsx';

const A = () => (
    <h1 className="title">
        what object reminds you of <br />
        <span>Sarang?</span>
    </h1>
);
const B = () => (
    <h2 className="description">
        sarang is stste of mind that evokes <br />
        love for various aspects of life <br />
        including friend, family, nature, God, <br />
        furry friends and so many more...
    </h2>
);

const durations: any = {
    A: 4000,
    B: 4000,
    C: 20000,
    D: 200000,
};

const nextComponent: any = {
    A: 'B',
    B: 'C',
    C: 'A',
};

function App() {
    const input = useContext(InputContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentComponent, setCurrentComponent] = useState('A');
    const [animationClass, setAnimationClass] = useState('slide-in');
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const setTimeAnimation = () =>
        setTimeout(() => {
            setAnimationClass('slide-out');
            setTimeout(() => {
                setCurrentComponent((prev) => nextComponent[prev]);
                setAnimationClass('slide-in');
            }, 500); // 애니메이션 시간
        }, durations[currentComponent] - 500);

    useEffect(() => {
        console.log('currentComponent', currentComponent);
        const interval = setTimeAnimation();

        setTimer(interval);

        return () => clearTimeout(timer ? timer : 0);
    }, [currentComponent]);

    const handleOnEnter = () => {
        if (currentComponent === 'C') {
            setCurrentComponent('A');
            setTimeout(() => {
                setCurrentComponent('C');
            });
        } else setCurrentComponent('C');
        clearInterval(timer ? timer : 0);
    };

    const handleOnOpen = () => {
        setCurrentComponent('D');
        clearInterval(timer ? timer : 0);
        setIsOpen(true);
    };

    const handleOnClose = (event?: MouseEvent) => {
        event?.stopPropagation();
        setIsOpen(false);
        setCurrentComponent('C');
    };

    return (
        <div className="App">
            <div className="contents" onClick={handleOnOpen}>
                <Modal
                    isOpen={isOpen}
                    onClose={handleOnClose}
                    onEnter={handleOnEnter}
                />
                <video id="background-video" loop autoPlay muted preload="auto">
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
                <div className={`${animationClass}`}>
                    {currentComponent === 'A' && <A />}
                    {currentComponent === 'B' && <B />}
                </div>
                {currentComponent === 'C' && (
                    <>
                        <p className="c-text">
                            What object reminds you of Sarang?
                        </p>
                        <CardStack inputs={input.inputs} />
                    </>
                )}
                {currentComponent === 'D' && (
                    <>
                        <p className="c-text">
                            What object reminds you of Sarang?
                        </p>
                    </>
                )}
                {/* <CardStack inputs={input.inputs} /> */}
            </div>
        </div>
    );
}

export default App;
