import { useQuery } from '@tanstack/react-query';
import { getAllLeads } from '@myorg/api-client';
import { Loader } from './ui/custom/Loader';
import Error from './ui/custom/Error';
import { LeadsResponse } from '@myorg/types';
import clsx from 'clsx';
import { Link, useSearchParams } from 'react-router';
import PaginationNav from './PaginationNav';

export default function Leads() {
    const [searchParams, setSearchParams] = useSearchParams({ page: "1", limit: "10" });
    const page = Number(searchParams.get("page"))
    const limit = Number(searchParams.get("limit"))

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getAllLeads(page),
        queryKey: ['leads', page],
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
                        <div className="fixed bottom-0 w-full flex justify-center p-4">
                            {data?.pageInfo?.totalCount &&
                                <PaginationNav page={page} totalPages={Math.ceil(data.pageInfo.totalCount / limit)} setSearchParams={setSearchParams} />
                            }
                        </div>
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





