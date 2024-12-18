import { useQuery } from '@tanstack/react-query';
import { getAllLeads } from '@myorg/api-client';
import { Loader } from './ui/custom/Loader';
import Error from './ui/custom/Error';
import { LeadsResponse } from '@myorg/types';
import clsx from 'clsx';
import { Link } from 'react-router';

export default function Leads() {
    const { data, isLoading, error, isError } = useQuery({
        queryFn: getAllLeads,
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
                        <Link to={`/lead/${lead._id}`}>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {lead.name}
                            </td>
                        </Link>
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
                        <Link to={`/user/${lead.user._id}`}>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                <span className="py-2 px-4 rounded-2xl bg-gray-200" >
                                    {lead.user.name}
                                </span>
                            </td>
                        </Link>
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

