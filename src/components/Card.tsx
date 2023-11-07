import { useEffect, useState } from 'react';
import instagram from '../assets/img/instagram.svg';
import './Card.styled.css';

interface Props {
    index: number;
    total: number;
    input: {
        text: string;
        instagram: string | null;
    };
    isCenter?: boolean;
}

export const Card = ({ input, isCenter, index, total }: Props) => {
    const [style, setStyle] = useState({
        zIndex: index,
        transform: `rotate(${0}deg)`,
        transition: `all 0.5s ease-in-out`,
    });

    useEffect(() => {
        const deg =
            (360 / total) * index > 180
                ? (360 / total) * index - 360
                : (360 / total) * index;

        setTimeout(() => {
            setStyle({
                zIndex: index,
                transform: `rotate(${deg}deg)`,
                transition: `all 3s ease-in-out`,
            });
        }, 1000);
    }, []);

    return (
        <div className="card" style={style}>
            <div className="card-text">
                <p>{input.text}</p>
            </div>
            <div className="card-instagram">
                <img src={instagram} alt="instagram" width={8} height={8} />
                <p>{input.instagram}</p>
            </div>
            <p className="card-index">No.{index}</p>
        </div>
    );
};
