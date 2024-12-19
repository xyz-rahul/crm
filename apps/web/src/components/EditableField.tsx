import React from 'react'
import { EditIcon, XIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import clsx from 'clsx';

type EditableFieldProps = {
    keyField: string
    value: string | undefined
    isInputActive: { [key: string]: boolean | undefined };
    setIsInputActive: React.Dispatch<React.SetStateAction<{ [key: string]: boolean | undefined }>>;
    inputField: { [key: string]: string | undefined };
    setInputField: React.Dispatch<React.SetStateAction<{ [key: string]: string | undefined }>>;
    children: React.ReactNode;
};


export default function EditableField({
    keyField,
    isInputActive,
    setIsInputActive,
    inputField,
    setInputField,
    value,
    children,
}: EditableFieldProps) {
    return (
        <div className="flex max-w-sm items-center gap-1.5">
            {children}
            <Label
                className={clsx(isInputActive[keyField] ? "hidden" : "")}
                htmlFor={String(keyField)}>
                {value}
            </Label>
            <Button
                variant="ghost"
                className={clsx(isInputActive[keyField] ? "hidden" : "")}
                onClick={() =>
                    setIsInputActive({ ...isInputActive, [keyField]: true })
                }
            >
                <EditIcon />
            </Button>

            <Input
                placeholder={String(keyField)}
                className={clsx(isInputActive[keyField] ? "" : "hidden")}
                value={inputField[keyField]}
                onChange={(e) =>
                    setInputField({
                        ...inputField,
                        [keyField]: e.target.value,
                    })
                }
            />
            <Button
                variant="ghost"
                hidden={!isInputActive[keyField]}
                className={clsx(isInputActive[keyField] ? "" : "hidden")}
                onClick={() => {
                    setInputField({ ...inputField, [keyField]: undefined }); // Clear the specific input field
                    setIsInputActive({ ...isInputActive, [keyField]: false }); // Deactivate the specific input field
                }}
            >
                <XIcon />
            </Button>
        </div>
    );
}
