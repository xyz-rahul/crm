import { getUserById } from '@myorg/api-client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Params, useParams } from 'react-router';
import { Loader } from '@/components/ui/custom/Loader';
import Error from '@/components/ui/custom/Error';
import { useState } from 'react';
import { api } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { EditIcon, SaveIcon, XIcon } from 'lucide-react';

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

    if (!id) return null
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
                                <EditableInputField id={id} title="Name:" property="name" value={data?.name} />
                                <p className="text-gray-600">
                                    <span className="font-semibold">Email:</span> {data?.email}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Role:</span> {data?.role}
                                </p>
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
                    </div>
                </>
            )}
        </>
    );
}

function EditableInputField({ id, title, property, value }: { id: string, title: string, property: string, value: string | undefined }) {
    const [isEditing, setIsEditing] = useState(false);
    const [fieldValue, setFieldValue] = useState("");
    const queryClient = useQueryClient();
    const updateLeadInfoMutation = useMutation({
        mutationFn: async () => {
            await api.put(`/user/${id}`, { [property]: fieldValue })
            queryClient.invalidateQueries(['user'])
        },
        onSuccess: () => {
            setIsEditing(false)
        }
    })

    return (
        <div className="flex justify-between items-center">
            <div>
                <span className="font-semibold pr-2">{title}</span>
                {!isEditing && value}
            </div>

            {isEditing ? (
                <>
                    <Input
                        onChange={(e) => setFieldValue(e.target.value)}
                        defaultValue={value}
                    />
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                        <XIcon />
                    </Button>
                    <Button variant="outline" onClick={() => updateLeadInfoMutation.mutate()}>
                        <SaveIcon />
                    </Button>
                </>
            ) : (
                <>
                    <div>
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                            <EditIcon />
                        </Button>
                    </div>
                </>
            )
            }
        </div >
    );
}
