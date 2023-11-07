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
    const localInputs = localStorage.getItem('inputs');

    const [inputs, setInputs] = useState<InputType[]>(
        localInputs ? JSON.parse(localInputs) : [],
    );

    const createInputs = (input: InputType) => {
        console.log('');
        setInputs((prev) => [...prev, input]);
        localStorage.setItem('inputs', JSON.stringify(inputs));
    };

    const deleteInputs = (text: string) => {
        setInputs((prev) => prev.filter((input) => input.text !== text));
        localStorage.setItem('inputs', JSON.stringify(inputs));
    };

    return (
        <InputContext.Provider value={{ inputs, createInputs, deleteInputs }}>
            {children}
        </InputContext.Provider>
    );
};

export { InputContext, InputProvider };
