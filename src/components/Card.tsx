import { useEffect, useRef, useState } from 'react';
import instagram from '../assets/img/instagram.svg';
import './Card.styled.css';

interface Props {
    index: number;
    total: number;
    input: {
        id: number;
        text: string;
        instagram: string | null;
    };
    setTargetInput: (input: {
        id: number;
        text: string;
        instagram: string | null;
    }) => void;
}

export const Card = ({ input, index, total, setTargetInput }: Props) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({
        zIndex: index,
        transform: `rotate(${0}deg) translateY(-250%)`,
        transition: 'all 3s ease-in-out',
    });

    const handleOnClickCard = () => {
        setTargetInput(input);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            // 30% 확률로 카드를 강조한다.
            const random = Math.random();
            if (random < 0.15) {
                setStyle((prev) => ({
                    ...prev,
                    zIndex: 1000,
                    transform: `${prev.transform}`,
                    transition: 'all 0.5s ease',
                    width: '330px',
                    height: '440px',
                }));
            } else {
                setStyle((prev) => ({
                    ...prev,
                    zIndex: index,
                    transform: `${prev.transform}`,
                    width: '300px',
                    height: '400px',
                }));
            }
        }, 7000);

        const deg =
            (360 / total) * index > 180
                ? (360 / total) * index - 360
                : (360 / total) * index;

        setTimeout(() => {
            setStyle({
                zIndex: index,
                transform: `rotate(${deg}deg) translateY(-250%)`,
                transition: 'all 3s ease-in-out',
            });
            cardRef.current?.addEventListener('mouseenter', () => {
                setStyle((prev) => ({
                    ...prev,
                    zIndex: 1000,
                    transform: `${prev.transform}`,
                    transition: 'all 0.5s ease',
                    width: '330px',
                    height: '440px',
                }));
            });
            cardRef.current?.addEventListener('mouseleave', () => {
                setStyle((prev) => ({
                    ...prev,
                    zIndex: index,
                    transform: `${prev.transform}`,
                    width: '300px',
                    height: '400px',
                }));
            });
        }, 1000);

        return () => {
            clearInterval(interval);
            cardRef.current?.removeEventListener('mouseenter', () => {});
            cardRef.current?.removeEventListener('mouseleave', () => {});
        };
    }, []);

    return (
        <div
            className="card"
            ref={cardRef}
            style={style}
            onClick={handleOnClickCard}
        >
            <textarea value={input.text} readOnly />
            {/* <div className="card-text">
                <p>{input.text}</p>
            </div> */}
            <div className="card-instagram">
                <img src={instagram} alt="instagram" width={10} height={10} />
                <p>{input.instagram}</p>
            </div>
            <p className="card-index">No.{input.id}</p>
        </div>
    );
};
