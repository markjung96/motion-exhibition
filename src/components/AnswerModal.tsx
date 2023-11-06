import React, { useContext, useEffect, useState } from 'react';
import './AnswerModal.styled.css';

import instagram from '../assets/img/instagram.svg';
import { InputContext } from '@hooks/useInputs';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onEnter: () => void;
    targetInput?: {
        text: string;
        instagram: string | null;
    };
}

export const Modal: React.FC<Props> = ({
    isOpen,
    onClose,
    onEnter,
    targetInput,
}) => {
    const [input, setInput] = useState({
        text: '',
        instagram: '',
    });
    const [className, setClassName] = useState<string | null>(null);
    const inputs = useContext(InputContext);
    const answerRef = React.useRef<HTMLInputElement>(null);
    const instaRef = React.useRef<HTMLInputElement>(null);

    const handleAnswerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput((prev) => ({ ...prev, text: event.target.value }));
    };

    const handleInstagramInput = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setInput((prev) => ({ ...prev, instagram: event.target.value }));
    };

    const handleOnEnter = () => {
        if (input.text === '') return;
        onEnter();
        inputs.createInputs(input);
        setInput({
            text: '',
            instagram: '',
        });
    };

    useEffect(() => {
        if (isOpen) {
            answerRef.current?.focus();

            if (targetInput) {
                setInput({
                    ...targetInput,
                    instagram: targetInput.instagram || '',
                });
            }
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isOpen) {
                if (event.key === 'Escape') {
                    onClose();
                    setInput({
                        text: '',
                        instagram: '',
                    });
                }
                if (event.key === 'Enter') {
                    if (document.activeElement === answerRef.current) {
                        instaRef.current?.focus();
                        return;
                    }
                    if (document.activeElement === instaRef.current) {
                        setClassName('reduction');
                        setTimeout(() => {
                            setClassName('disappear');
                            handleOnEnter();
                        }, 1000);
                        setTimeout(() => {
                            setClassName('');
                        }, 2000);
                        onClose();
                        return;
                    }
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose, handleOnEnter]);

    return (
        <React.Fragment>
            {isOpen && <div className="modal-overlay" onClick={onClose}></div>}
            <div
                className={`modal ${isOpen ? 'active' : ''} ${
                    className ? className : ''
                }`}
            >
                <input
                    className="answer"
                    ref={answerRef}
                    type="text"
                    onChange={handleAnswerInput}
                    autoFocus
                    value={input.text}
                />
                <div className="insta">
                    <img
                        src={instagram}
                        alt="instagram"
                        width={13}
                        height={13}
                    />
                    <input
                        className="insta"
                        ref={instaRef}
                        type="text"
                        onChange={handleInstagramInput}
                        value={input.instagram}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};
