import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllUsers } from '@myorg/api-client';
import { Loader } from '@/components/ui/custom/Loader';
import Error from './ui/custom/Error';
import { UserAllResponse } from '@myorg/types';
import { Link, useSearchParams } from 'react-router';
import PaginationNav from './PaginationNav';

export default function Users() {
    const [searchParams, setSearchParams] = useSearchParams({ page: "1", limit: "10" });
    const page = Number(searchParams.get("page"))
    const limit = Number(searchParams.get("limit"))
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getAllUsers(page),
        queryKey: ['users', page],
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
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Role</th>
                                </tr>
                            </thead>
                            <TableData data={data} />
                        </table>

                        <div className="fixed bottom-0 w-full flex justify-center p-4">
                            {data.pageInfo.totalCount > 0 &&
                                <PaginationNav page={page} totalPages={Math.ceil(Number(data.pageInfo.totalCount) / limit)} setSearchParams={setSearchParams} />
                            }
                        </div>
                    </div>
                </>
            )}

        </>
    );
}

export function TableData({ data }: { data: UserAllResponse }) {
    return (
        <tbody>
            {data.users?.length > 0 ? (
                data.users.map((user) => (
                    <tr
                        key={user._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        <Link to={`/user/${user._id}`}>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {user.name}
                            </td>
                        </Link>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {user.email}
                        </td>
                        <td className="px-6 font-semibold text-gray-900 dark:text-white" >
                            {user.role}
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td
                        colSpan={4}
                        className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                        No Users found.
                    </td>
                </tr>
            )
            }
        </tbody >
    )
}


