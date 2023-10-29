/* eslint-disable no-unused-vars */
import { MouseEvent, useEffect, useRef, useState } from 'react';

import './App.css';
import backgroundVideo from '@assets/background/video.mp4';

interface Dot {
    x: number;
    y: number;
    size: number;
    opacity: number;
    createdAt: number;
}

const isDot = (dot: unknown): dot is Dot => {
    if ((dot as Dot).x !== undefined && (dot as Dot).y !== undefined) return true;
    return false;
};

function App() {
    const [isQuestionBoxShown, setIsQuestionBoxShown] = useState(false);
    const [positions, setPositions] = useState<Dot[]>([]);
    const lastMousePosition = useRef<{ x: number; y: number } | null>(null);
    const lastTimestamp = useRef<number | null>(null);

    const handleMouseMove = (event: MouseEvent) => {
        const currentTimestamp = performance.now();
        const currentMousePosition = { x: event.clientX, y: event.clientY };

        if (lastMousePosition.current && lastTimestamp.current) {
            const deltaX = currentMousePosition.x - lastMousePosition.current.x;
            const deltaY = currentMousePosition.y - lastMousePosition.current.y;
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
            const deltaTime = currentTimestamp - lastTimestamp.current;
            const speed = distance / deltaTime;

            // if (speed > 1.5) {
            // 임계값 (0.5)보다 클 경우에만 원을 추가
            setPositions((prev) =>
                [
                    ...prev,
                    { x: event.clientX, y: event.clientY, size: 300, opacity: 0.5, createdAt: performance.now() },
                ].slice(-20),
            );
            // }
        }

        lastMousePosition.current = currentMousePosition;
        lastTimestamp.current = currentTimestamp;
    };

    const shrinkDots = () => {
        setPositions((prev) => {
            const newDots = [...prev];
            const reductionFactor = 0.99;

            for (let i = newDots.length - 1; i >= 0; i--) {
                const factor = i === newDots.length - 1 ? 1 : reductionFactor ** (newDots.length - 1 - i);
                const newDot = newDots[i];
                if (newDot && isDot(newDot)) {
                    newDots[i] = {
                        ...newDot,
                        size: newDot.size * factor,
                        opacity: newDot.opacity * factor,
                    };
                }
            }
            return newDots.filter((dot) => dot.size > 5);
        });
    };

    // when click app, QuestionBox will be hidden or shown
    const HandleOnlclickApp = () => {
        setIsQuestionBoxShown(!isQuestionBoxShown);
    };

    const latestDot = positions[positions.length - 1];

    useEffect(() => {
        const intervalId = setInterval(shrinkDots, 32);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="App" onClick={HandleOnlclickApp} onMouseMove={handleMouseMove}>
            <video className="videoTag" autoPlay loop muted>
                <source src={backgroundVideo} />
            </video>
            <svg className="gooey" width="100%" height="100%" onMouseMove={handleMouseMove}>
                {/* <defs>
                    <filter id="blurFilter">
                        <feGaussianBlur stdDeviation="10" />
                    </filter>
                    {latestDot && (
                        <mask id="latestDotMask">
                            <rect width="100%" height="100%" fill="white" />
                            <circle
                                cx={latestDot.x}
                                cy={latestDot.y}
                                r={latestDot.size / 2}
                                filter="url(#blurFilter)"
                            />
                        </mask>
                    )}
                </defs>
                {positions.slice(0, -1).map((pos, idx) => (
                    <circle
                        key={idx}
                        cx={pos.x}
                        cy={pos.y}
                        r={pos.size / 2}
                        fill="white" // 원의 색상을 흰색으로 설정
                        mask={latestDot ? 'url(#latestDotMask)' : undefined}
                        style={{ mixBlendMode: 'difference' }} // 배경색의 반전된 색상으로 설정
                        filter="url(#blurFilter)" // 원에 블러 필터 적용
                    />
                ))}
                {latestDot && (
                    <circle
                        cx={latestDot.x}
                        cy={latestDot.y}
                        r={latestDot.size / 2}
                        fill="white" // 원의 색상을 흰색으로 설정
                        style={{ mixBlendMode: 'difference' }} // 배경색의 반전된 색상으로 설정
                        filter="url(#blurFilter)" // 원에 블러 필터 적용
                    />
                )} */}
            </svg>
        </div>
    );
}

export default App;
