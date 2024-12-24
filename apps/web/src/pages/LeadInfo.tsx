import { getLeadById } from '@myorg/api-client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react'
import { Params, useParams } from 'react-router'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { EditIcon, SaveIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/utils';
import clsx from 'clsx';

interface ParamTypes extends Params {
    id: string
}
export default function LeadInfo() {
    const { id } = useParams<ParamTypes>();
    const { data } = useQuery({
        queryFn: () => { if (id) return getLeadById(id) },
        queryKey: ['lead', { id }],
    });

    if (!id) return null
    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Lead Information</h1>
            </header>
            <section>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    General Information
                </h2>
                <div className="space-y-2">
                    <div className="text-gray-600">
                        <span className="font-semibold">ID:</span>{data?._id}
                    </div>
                    <EditableInputField id={id} title="Name:" property="name" value={data?.name} />
                    <EditableInputField id={id} title="Email:" property="email" value={data?.email} />
                    <EditableInputField id={id} title="Phone:" property="phone" value={data?.phone} />
                    <StatusDropDown id={id} title="Status:" property="status" value={data?.status} />
                </div>
            </section >
            <hr className="my-6 border-gray-300" />
            <section>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">User Details</h2>
                <div className="space-y-2">
                    <p className="text-gray-600">
                        <span className="font-semibold">User ID:</span> {data?.user?._id}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Name:</span> {data?.user?.name}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Role:</span> {data?.user?.role}
                    </p>
                </div>
            </section>
            <hr className="my-6 border-gray-300" />
            <section>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Timestamps</h2>
                <div className="space-y-2">
                    <p className="text-gray-600">
                        <span className="font-semibold">Created At:</span>
                        {data?.createdAt}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-semibold">Updated At:</span>
                        {data?.updatedAt}
                    </p>
                </div>
            </section>
        </div >
    )
}

function EditableInputField({ id, title, property, value }: { id: string, title: string, property: string, value: string | undefined }) {
    const [isEditing, setIsEditing] = useState(false);
    const [fieldValue, setFieldValue] = useState("");
    const queryClient = useQueryClient();
    const updateLeadInfoMutation = useMutation({
        mutationFn: async () => {
            await api.put(`/lead/${id}`, { [property]: fieldValue })
            queryClient.invalidateQueries(['lead'])
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


function StatusDropDown({ id, title, property, value }: { id: string, title: string, property: string, value: string | undefined }) {
    const [isEditing, setIsEditing] = useState(false);
    const [fieldValue, setFieldValue] = useState("");
    const queryClient = useQueryClient();
    const updateLeadInfoMutation = useMutation({
        mutationFn: async () => {
            await api.put(`/lead/${id}`, { [property]: fieldValue })
            queryClient.invalidateQueries(['lead'])
        },
        onSuccess: () => {
            setIsEditing(false)
        }
    })

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <span className="font-semibold pr-2">{title}</span>

                {!isEditing &&

                    <span
                        className={clsx(
                            "py-1 px-4 rounded-2xl text-white font-semibold",
                            value === "new" && "bg-blue-500",
                            value === "archived" && "bg-gray-400",
                            value === "contacted" && "bg-yellow-500",
                            value === "qualified" && "bg-green-500",
                            value === "converted" && "bg-purple-500",
                        )}
                    >
                        {value}
                    </span>
                }
                {isEditing &&
                    <Select
                        onValueChange={(e) => setFieldValue(e)}
                        defaultValue={value}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Set Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Select Status</SelectLabel>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="qualified">Qualified</SelectItem>
                                <SelectItem value="converted">Converted</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                }
            </div>
            {isEditing &&
                <div>

                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                        <XIcon />
                    </Button>
                    <Button variant="outline" onClick={() => updateLeadInfoMutation.mutate()}>
                        <SaveIcon />
                    </Button>
                </div>
            }
            {!isEditing &&
                <div>
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                        <EditIcon />
                    </Button>
                </div>
            }
        </div >
    );
}
