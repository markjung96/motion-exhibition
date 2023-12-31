/* eslint-disable no-unused-vars  */
import { MouseEvent, useContext, useEffect, useRef, useState } from 'react';

import backgroundVideo from '@assets/background/background_video.mp4';
import { Modal } from '@components/AnswerModal.tsx';
import { CardStack } from '@components/CardStack.tsx';

import './App.css';
import { InputContext } from './hooks/useInputs.tsx';

import CloseFull from '@assets/img/icon_close_full.svg';
import OpenFull from '@assets/img/icon_open_full.svg';

interface ITargetInput {
    id: number;
    text: string;
    instagram: string | null;
}

const A = () => (
    <h1 className="title">
        What object reminds you of <br />
        <span>Sarang?</span>
    </h1>
);
const B = () => (
    <h2 className="description">
        Sarang is a state of mind that evokes <br />
        love for various aspects of life <br />
        including friend, family, nature, God, <br />
        furry friends and so many more...
    </h2>
);

const durations: any = {
    A: 10000,
    B: 10000,
    C: 30000,
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
    const [targetInput, setTargetInput] = useState<ITargetInput | null>(null);

    const setTimeAnimation = () =>
        setTimeout(() => {
            setAnimationClass('slide-out');
            setTimeout(() => {
                setCurrentComponent((prev) => nextComponent[prev]);
                setAnimationClass('slide-in');
            }, 500); // 애니메이션 시간
        }, durations[currentComponent] - 500);

    const setFullScreen = () => {
        const elem = document.documentElement as HTMLElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    };

    const handleOnOpen = () => {
        setCurrentComponent('D');
        clearInterval(timer ? timer : 0);
        setIsOpen(true);
    };

    const handleOnClose = (event?: MouseEvent) => {
        event?.stopPropagation();
        setIsOpen(false);
        setTargetInput(null);
        setCurrentComponent('C');
    };

    const handleTargetInput = (targetInput: ITargetInput) => {
        setTargetInput(targetInput);
    };

    const handleToggleClickFullScreen = (event: MouseEvent) => {
        event.stopPropagation();
        setFullScreen();
    };

    useEffect(() => {
        const interval = setTimeAnimation();

        setTimer(interval);

        return () => clearTimeout(timer ? timer : 0);
    }, [currentComponent]);

    useEffect(() => {
        document.addEventListener('keypress', (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleOnOpen();
            }
        });

        return () => {
            document.removeEventListener('keypress', () => {});
        };
    }, []);

    return (
        <div className="App">
            <div className="full-screen" onClick={handleToggleClickFullScreen}>
                <img
                    src={
                        document.fullscreenElement === null
                            ? OpenFull
                            : CloseFull
                    }
                    alt="fullscreen"
                    width={16}
                    height={16}
                />
            </div>
            <div className="contents" onClick={handleOnOpen}>
                <Modal
                    targetInput={targetInput}
                    isOpen={isOpen}
                    onClose={handleOnClose}
                />
                <video id="background-video" loop autoPlay muted preload="auto">
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
                <div className={`title ${animationClass}`}>
                    {currentComponent === 'A' && <A />}
                    {currentComponent === 'B' && <B />}
                </div>
                {currentComponent === 'C' && (
                    <>
                        <p className="c-text">
                            What object reminds you of Sarang?
                            <br />
                            Click the background to let your story unfold.
                        </p>
                        <CardStack
                            inputs={input.inputs}
                            setTargetInput={handleTargetInput}
                        />
                    </>
                )}
                {currentComponent === 'D' && (
                    <>
                        <p className="c-text">
                            Let us know your instagram account to share Sarang
                            with others.
                            <br />
                            Press return to continue.
                        </p>
                    </>
                )}
                {/* <>
                    <p className="c-text">
                        What object reminds you of Sarang?
                        <br />
                        Click the background to let your story unfold.
                    </p>
                    <CardStack
                        inputs={input.inputs}
                        setTargetInput={handleTargetInput}
                    />
                </> */}
            </div>
        </div>
    );
}

export default App;
