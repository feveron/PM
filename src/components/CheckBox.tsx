import Done from '../assets/icons/done-round-svgrepo-com.svg';
import React from 'react';

interface CheckBoxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export function CheckBox({ checked, onChange }: CheckBoxProps) {
    const [done, setDone] = React.useState(checked);

    const handleToggle = () => {
        onChange(!checked)
        setDone(!done)
    }

    return (
        <div
            data-testid="todo-checkbox"
            onClick={handleToggle}
            className="border-2 bg-white border-black w-6 h-6 flex items-center justify-center cursor-pointer rounded"
        >
           {done && (
                <img
                    src={Done}
                    alt="checkbox"
                />
            )}
        </div>
    )
}