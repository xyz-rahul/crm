import { useQuery } from '@tanstack/react-query';
import { getAllLeads } from '@myorg/api-client';
import { Loader } from '@/components/ui/custom/Loader';
import Error from '@/components/ui/custom/Error';
import { useSearchParams } from 'react-router';
import PaginationNav from '@/components/PaginationNav';
import LeadsTable from '@/components/LeadsTable';

export default function Leads() {
    const [searchParams, setSearchParams] = useSearchParams({ page: "1", limit: "10" });
    const page = Number(searchParams.get("page"))
    const limit = Number(searchParams.get("limit"))

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getAllLeads(page),
        queryKey: ['leads', page],
    });
    if (isLoading) return <Loader />
    if (isError) return <Error />
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
            <div className="fixed bottom-0 w-full flex justify-center p-4">
                {data?.pageInfo?.totalCount > 0 &&
                    <PaginationNav page={page} totalPages={Math.ceil(data.pageInfo.totalCount / limit)} setSearchParams={setSearchParams} />
                }
            </div>
        </div>
    )
}

