import { useContext, useEffect, useState } from 'react';
import { InputContext } from '@hooks/useInputs';

import { Card } from './Card.tsx';
import './CardStack.styled.css';

interface Props {
    inputs: {
        text: string;
        instagram: string | null;
    }[];
}
export const CardStack = ({ inputs }: Props) => {
    const [cards, setCards] = useState(inputs);
    const [className, setClassName] = useState<string | null>(null);

    useEffect(() => {
        setCards(inputs);
    }, [inputs]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setClassName((prev) => `${prev} rotate`);
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className={`card-stack ${className ? className : ''}`}>
            {cards.map((card, index) => {
                return (
                    <div className="card-wrapper" key={`${index}_${card.text}`}>
                        <Card
                            key={card.text}
                            input={card}
                            index={index}
                            total={cards.length}
                        />
                    </div>
                );
            })}
        </div>
    );
};
