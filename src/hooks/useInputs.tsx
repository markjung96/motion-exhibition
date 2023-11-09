import React, { createContext, useEffect, useState } from 'react';

type InputType = {
    id: number;
    text: string;
    instagram: string | null;
};
interface IInputContext {
    inputs: InputType[];
    createInputs: (input: InputType) => void;
    deleteInputs: (id: number) => void;
    updateInputs: (id: number, input: InputType) => void;
}

const InputContext = createContext<IInputContext>({
    inputs: [],
    createInputs: () => {},
    deleteInputs: () => {},
    updateInputs: () => {},
});

interface Props {
    children: React.ReactNode;
}
const InputProvider: React.FC<Props> = ({ children }) => {
    const localInputs = localStorage.getItem('inputs');

    const [inputs, setInputs] = useState<InputType[]>(
        localInputs ? JSON.parse(localInputs) : [],
    );

    const createInputs = (input: InputType) => {
        setInputs((prev) => [...prev, input]);
        localStorage.setItem('inputs', JSON.stringify(inputs));
    };

    const deleteInputs = (id: number) => {
        setInputs((prev) => prev.filter((input) => input.id !== id));
        localStorage.setItem('inputs', JSON.stringify(inputs));
    };

    const updateInputs = (id: number, input: InputType) => {
        setInputs((prev) =>
            prev.map((prevInput) => (prevInput.id === id ? input : prevInput)),
        );
        localStorage.setItem('inputs', JSON.stringify(inputs));
    };

    return (
        <InputContext.Provider
            value={{ inputs, createInputs, deleteInputs, updateInputs }}
        >
            {children}
        </InputContext.Provider>
    );
};

export { InputContext, InputProvider };
