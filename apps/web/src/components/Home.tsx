import { Link } from 'react-router'
import { Button } from "@/components/ui/button"
import { PlusIcon } from 'lucide-react'
import { Loader } from './ui/custom/Loader'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useQuery } from '@tanstack/react-query'
import { getAllLeads } from '@myorg/api-client'
import Error from './ui/custom/Error'
import { LeadsResponse } from '@myorg/types'
import clsx from 'clsx'


export const Home = (props: {}) => {
    return (
        <div className="p-4">
            <div className="flex m-8">
                <AddLead />
            </div>
            <div className='border-black m-4'>
                <Leads />
            </div>
        </div>
    )
}


function AddLead() {
    return (
        <Link to="/add-lead">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Add new Lead</CardTitle>
                    <CardDescription>Click here to add new lead</CardDescription>
                </CardHeader>
                <CardContent className='flex justify-center'>
                    <PlusIcon size={63} />
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button className='w-full'>Deploy</Button>
                </CardFooter>
            </Card>
        </Link>
    )

}

function NewLeads() {
    return (
        <Link to="/add-lead">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Add new Lead</CardTitle>
                    <CardDescription>Click here to add new lead</CardDescription>
                </CardHeader>
                <CardContent className='flex justify-center'>
                    <PlusIcon size={63} />
                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button className='w-full'>Deploy</Button>
                </CardFooter>
            </Card>
        </Link>
    )

}




export default function Leads() {
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getAllLeads(1),
        queryKey: ['leads'],
    });
    return (
        <>
            {isLoading ? (
                <Loader />
            ) : isError ? (
                <Error />
            ) : (
                <>
                    <div className="flex flex-col items-center align-middle w-full">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Lead Name</th>
                                    <th scope="col" className="px-6 py-3">Phone</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">ManageBy</th>
                                </tr>
                            </thead>
                            <TableData data={data} />
                        </table>
                    </div>
                </>
            )}


        </>
    );
}

export function TableData({ data }: { data: LeadsResponse }) {
    return (
        <tbody>
            {data?.leads?.length > 0 ? (
                data.leads.map((lead) => (
                    <tr
                        key={lead._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            <Link to={`/lead/${lead._id}`}>
                                {lead.name}
                            </Link>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {lead.phone}
                        </td>
                        <td className="px-6 font-semibold text-gray-900 dark:text-white" >
                            <span className={
                                clsx(
                                    "py-1 px-4 rounded-2xl text-white font-semibold",
                                    lead.status === "new" && "bg-blue-500",
                                    lead.status === "archived" && "bg-gray-400",
                                    lead.status === "contacted" && "bg-yellow-500",
                                    lead.status === "qualified" && "bg-green-500",
                                    lead.status === "converted" && "bg-purple-500"
                                )
                            }>
                                {lead.status}
                            </span>

                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            <Link to={`/user/${lead.user._id}`}>
                                <span className="py-2 px-4 rounded-2xl bg-gray-200" >
                                    {lead.user.name}
                                </span>
                            </Link>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td
                        colSpan={4}
                        className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                        No leads found.
                    </td>
                </tr>
            )
            }
        </tbody >
    )
}
