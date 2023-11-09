import { useContext, useEffect, useState } from 'react';

import { Card } from './Card.tsx';
import './CardStack.styled.css';
import { isNotUndefined } from '@utils/typeguard.ts';
import { InputContext } from '@hooks/useInputs.tsx';

interface IInput {
    id: number;
    text: string;
    instagram: string | null;
}
interface Props {
    inputs: IInput[];
    setTargetInput: (input: IInput) => void;
}

const MAX_CARD_COUNT = 20;

export const CardStack = ({ inputs, setTargetInput }: Props) => {
    // const inputs = useContext(InputContext);
    const [cards, setCards] = useState<IInput[]>([]);
    const [className, setClassName] = useState<string | null>(null);

    useEffect(() => {
        setCards([]);
        const setCard = setTimeout(() => {
            if (inputs.length === 0) {
                setCards([]);
            } else {
                let cardFiltered: IInput[] = [];
                const lastInput = inputs[inputs.length - 1];
                if (inputs.length > MAX_CARD_COUNT) {
                    // randomly pick 50 cards from inputs except for the last card
                    const randomIndices: number[] = [];
                    while (randomIndices.length < MAX_CARD_COUNT) {
                        const randomIndex = Math.floor(
                            Math.random() * (inputs.length - 1),
                        );
                        if (!randomIndices.includes(randomIndex)) {
                            randomIndices.push(randomIndex);
                        }
                    }
                    cardFiltered = randomIndices
                        .map((index) => inputs[index])
                        .filter(isNotUndefined);
                    if (lastInput) cardFiltered.push(lastInput);
                } else {
                    while (cardFiltered.length < MAX_CARD_COUNT) {
                        if (
                            MAX_CARD_COUNT - cardFiltered.length <
                            inputs.length
                        ) {
                            cardFiltered = cardFiltered.concat(
                                inputs.slice(
                                    0,
                                    MAX_CARD_COUNT - cardFiltered.length - 1,
                                ),
                            );
                            break;
                        } else cardFiltered = cardFiltered.concat(inputs);
                    }
                    if (lastInput) cardFiltered.push(lastInput);
                }
                setCards(cardFiltered);
            }
        });

        return () => {
            clearTimeout(setCard);
        };
    }, [inputs, setCards]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setClassName((prev) => `${prev} rotate`);
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            {cards.length > 0 && (
                <div className={`card-stack ${className ? className : ''}`}>
                    {cards.map((card, index) => {
                        return (
                            <div
                                className="card-wrapper"
                                key={`${index}_${card.text}`}
                            >
                                <Card
                                    key={card.text}
                                    input={card}
                                    index={index}
                                    total={cards.length}
                                    setTargetInput={setTargetInput}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};
