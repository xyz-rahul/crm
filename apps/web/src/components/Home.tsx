import React from 'react'
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
import { getAllLeads, getLeadReport, getSearchResult } from '@myorg/api-client'
import Error from './ui/custom/Error'
import { LeadsResponse } from '@myorg/types'
import clsx from 'clsx'
import SearchBar from './SearchBar'
import LeadsTable from './LeadsTable'


export const Home = () => {
    const getAllLeadsQuery = useQuery({
        queryFn: () => getAllLeads(1),
        queryKey: ['leads'],
    });

    const leadSummaryQuery = useQuery({
        queryFn: () => getLeadReport(),
        queryKey: ['leadSummary'],
    });

    const [filter, setFilter] = React.useState<string>("")
    const searchQuery = useQuery({
        queryFn: () => {
            if (filter.length > 0)
                return getSearchResult(filter)
        },
        queryKey: [filter],
    })
    console.log('lead err', leadSummaryQuery.error)
    return (
        <div className="p-4">
            <SearchBar onChange={setFilter} data={searchQuery.data} />
            <div className="flex m-8 gap-8">
                <AddLead />
                {leadSummaryQuery.isLoading ? (
                    <Loader />
                ) : leadSummaryQuery.isError ? (
                    <Error />
                ) : (
                    <LeadSummary data={leadSummaryQuery.data} />
                )}
            </div>
            <div className='border-black m-4'>
                {getAllLeadsQuery.isLoading ? (
                    <Loader />
                ) : getAllLeadsQuery.isError ? (
                    <Error />
                ) : (
                    <Leads data={getAllLeadsQuery.data} />
                )}
            </div>
        </div>
    )
}




export default function Leads({ data }: { data: LeadsResponse }) {
    return (
        <div className="flex flex-col items-center align-middle w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Lead Name</th>
                        <th scope="col" className="px-6 py-3">Phone</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">ManageBy</th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <LeadsTable data={data} />
            </table>
        </div>
    );
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
                    <Button className='w-full'>Add Lead</Button>
                </CardFooter>
            </Card>
        </Link>
    )

}

function LeadSummary({ data }: { data: any }) {
    return (
        <div className="max-w-sm mx-auto px-6 py-4 bg-white border border-gray-200 rounded-lg shadow-md space-y-6">
            <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">Lead Summary</h2>
                <p className="text-sm text-gray-500">
                    Overview of this year's, month's, and week's data
                </p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <tbody>
                        <tr className="border-b">
                            <td className="px-6 py-2 text-sm font-medium text-gray-800">
                                {data?.thisYear?.count}
                            </td>
                            <td className="px-6 py-2 text-sm text-gray-500">This Year</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-6 py-2 text-sm font-medium text-gray-800">
                                {data?.thisMonth?.count}
                            </td>
                            <td className="px-6 py-2 text-sm text-gray-500">This Month</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-6 py-2 text-sm font-medium text-gray-800">
                                {data?.thisWeek?.count}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">This Week</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}


