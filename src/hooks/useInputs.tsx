import React, { createContext, useState } from 'react';

type InputType = {
    text: string;
    instagram: string | null;
};
interface IInputContext {
    inputs: InputType[];
    createInputs: (input: InputType) => void;
    deleteInputs: (text: string) => void;
}

const InputContext = createContext<IInputContext>({
    inputs: [],
    createInputs: () => {},
    deleteInputs: () => {},
});

interface Props {
    children: React.ReactNode;
}
const InputProvider: React.FC<Props> = ({ children }) => {
    const [inputs, setInputs] = useState<InputType[]>([]);

    const createInputs = (input: InputType) => {
        setInputs((prev) => [...prev, input]);
    };

    const deleteInputs = (text: string) => {
        setInputs((prev) => prev.filter((input) => input.text !== text));
    };

    return (
        <InputContext.Provider value={{ inputs, createInputs, deleteInputs }}>
            {children}
        </InputContext.Provider>
    );
};

export { InputContext, InputProvider };
