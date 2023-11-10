import React, { useContext, useEffect, useState, MouseEvent } from 'react';
import './AnswerModal.styled.css';

import instagram from '../assets/img/instagram.svg';
import trashcan from '../assets/img/icon_trash_can.svg';
import { InputContext } from '@hooks/useInputs';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    targetInput: {
        id: number;
        text: string;
        instagram: string | null;
    } | null;
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, targetInput }) => {
    const inputs = useContext(InputContext);
    const [input, setInput] = useState<{
        text: string;
        instagram: string | null;
    }>({
        text: '',
        instagram: null,
    });
    const [className, setClassName] = useState<string | null>(null);

    const answerRef = React.useRef<HTMLTextAreaElement>(null);
    const instaRef = React.useRef<HTMLInputElement>(null);

    const handleAnswerInput = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
    ) => {
        event.preventDefault();
        setInput((prev) => ({ ...prev, text: event.target.value }));
    };

    const handleInstagramInput = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        event.preventDefault();
        setInput((prev) => ({ ...prev, instagram: event.target.value }));
    };

    const handleOnclickTrashCan = (event: MouseEvent) => {
        event.stopPropagation();
        if (targetInput) {
            inputs.deleteInputs(targetInput.id);
        }
        onClose();
        setClassName('');
    };

    const setFullScreen = () => {
        const elem = document.documentElement as HTMLElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    };

    useEffect(() => {
        if (isOpen) {
            answerRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (targetInput) {
            setInput(targetInput);
        } else {
            setInput({
                text: '',
                instagram: '',
            });
        }
    }, [targetInput]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.isComposing || event.keyCode === 229) return;
            if (isOpen) {
                if (event.key === 'Escape') {
                    onClose();
                    setInput({
                        text: '',
                        instagram: '',
                    });
                    setFullScreen();
                }
                if (event.key === 'Enter') {
                    setFullScreen();
                    if (document.activeElement === answerRef.current) {
                        instaRef.current?.focus();
                        return;
                    }
                    if (document.activeElement === instaRef.current) {
                        setClassName('reduction');
                        setTimeout(() => {
                            setClassName('disappear');
                            if (input.text === '') return;
                            if (!targetInput) {
                                inputs.createInputs({
                                    id: inputs.inputs.length + 1,
                                    ...input,
                                });
                            } else {
                                inputs.updateInputs(targetInput.id, {
                                    id: targetInput.id,
                                    ...input,
                                });
                            }
                            onClose();
                            setInput({
                                text: '',
                                instagram: '',
                            });
                        }, 1000);
                        setTimeout(() => {
                            setClassName('');
                        }, 2000);
                        return;
                    }
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose, targetInput, input]);

    return (
        <React.Fragment>
            {isOpen && <div className="modal-overlay" onClick={onClose}></div>}
            <div
                className={`modal ${isOpen ? 'active' : ''} ${
                    className ? className : ''
                }`}
            >
                <div>
                    <textarea
                        className="answer"
                        ref={answerRef}
                        rows={3}
                        onChange={handleAnswerInput}
                        autoFocus
                        value={input.text}
                    />
                </div>
                <div className="insta">
                    <img
                        src={instagram}
                        alt="instagram"
                        width={12}
                        height={12}
                    />
                    <input
                        className="insta"
                        ref={instaRef}
                        type="text"
                        onChange={handleInstagramInput}
                        value={input?.instagram || ''}
                    />
                </div>
                <img
                    className="trash-can"
                    src={trashcan}
                    alt="trashcan"
                    width={14}
                    height={14}
                    onClick={handleOnclickTrashCan}
                />
            </div>
        </React.Fragment>
    );
};
