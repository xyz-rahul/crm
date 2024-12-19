import { getLeadById, updateLeadById } from '@myorg/api-client';
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
import { Loader2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from './ui/label';
import EditableField from './EditableField';

interface ParamTypes extends Params {
    id: string
}
export default function LeadInfo() {
    const queryClient = useQueryClient();

    const { id } = useParams<ParamTypes>();
    const { data } = useQuery({
        queryFn: () => { if (id) return getLeadById(id) },
        queryKey: ['lead', { id }],
    });
    const [isInputActive, setIsInputActive] = useState<{ [key: string]: boolean | undefined }>({ phone: false });
    const [inputField, setInputField] = useState<{ [key: string]: string | undefined }>({}); // State for the editable data
    const updateLeadInfoMutation = useMutation({
        mutationFn: async () => {
            console.log('aaaa', id, inputField)
            if (id) updateLeadById(id, inputField)
            queryClient.invalidateQueries(['lead'])
            setIsInputActive({})
            console.log('bbbb')
        }
    })


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
                            keyField="phone"
                            inputField={inputField}
                            setInputField={setInputField}
                            isInputActive={isInputActive}
                            setIsInputActive={setIsInputActive}
                            value={data?.phone}
                        >
                            <Label htmlFor="phone" className="text-lg">Phone:</Label>
                        </EditableField>
                    </div>
                    <p className="text-gray-600 flex gap-2 items-center">
                        <span className="font-semibold">Status:</span>
                        <Select onValueChange={(e) => console.log(e)} defaultValue={data?.status}>
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
                    </p>
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
        </div >
    )
}

