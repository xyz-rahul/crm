import { getUserById, updateUserById } from '@myorg/api-client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Params, useParams } from 'react-router';
import { Loader } from '@/components/ui/custom/Loader';
import Error from '@/components/ui/custom/Error';
import EditableField from './EditableField';
import { useState } from 'react';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Loader2Icon } from 'lucide-react';

interface ParamTypes extends Params {
    id: string;
}

export default function UserInfo() {
    const { id } = useParams<ParamTypes>();
    const { data, isLoading, isError } = useQuery({
        queryFn: () => {
            if (id) return getUserById(id);
        },
        queryKey: ['user', { id }],
    });


    const queryClient = useQueryClient();

    const [isInputActive, setIsInputActive] = useState<{ [key: string]: boolean | undefined }>({ phone: false });
    const [inputField, setInputField] = useState<{ [key: string]: string | undefined }>({}); // State for the editable data
    const updateLeadInfoMutation = useMutation({
        mutationFn: async () => {
            if (id) updateUserById(id, inputField)
            queryClient.invalidateQueries(['user'])
            setIsInputActive({})
            console.log('bbbb')
        }
    })
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <Error />
            ) : (
                <>
                    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
                        <header className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">User Information</h1>
                        </header>
                        <section>
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                General Information
                            </h2>
                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    <span className="font-semibold">ID:</span> {data?._id}
                                </p>
                                <div className="text-gray-600">
                                    <EditableField
                                        keyField="name"
                                        inputField={inputField}
                                        setInputField={setInputField}
                                        isInputActive={isInputActive}
                                        setIsInputActive={setIsInputActive}
                                        value={data?.name}
                                    >
                                        <Label htmlFor="name" className="text-lg">Name:</Label>
                                    </EditableField>
                                    <EditableField
                                        keyField="email"
                                        inputField={inputField}
                                        setInputField={setInputField}
                                        isInputActive={isInputActive}
                                        setIsInputActive={setIsInputActive}
                                        value={data?.email}
                                    >
                                        <Label htmlFor="email" className="text-lg">Email:</Label>
                                    </EditableField>
                                    <EditableField
                                        keyField="role"
                                        inputField={inputField}
                                        setInputField={setInputField}
                                        isInputActive={isInputActive}
                                        setIsInputActive={setIsInputActive}
                                        value={data?.role}
                                    >
                                        <Label htmlFor="role" className="text-lg">Role:</Label>
                                    </EditableField>
                                </div>
                            </div>
                        </section>
                        <hr className="my-6 border-gray-300" />
                        <section>
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">Timestamps</h2>
                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    <span className="font-semibold">Created At:</span> {data?.createdAt}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Updated At:</span> {data?.updatedAt}
                                </p>
                            </div>
                        </section>

                        <Button
                            onClick={() => {
                                updateLeadInfoMutation.mutate()
                            }}
                            disabled={updateLeadInfoMutation.isLoading}
                            className="my-4"
                        >
                            {updateLeadInfoMutation.isLoading ?
                                <>
                                    <Loader2Icon className="animate-spin" />
                                    Please wait
                                </>
                                :
                                <> Update </>
                            }
                        </Button>
                    </div>
                </>
            )}
        </>
    );
}

