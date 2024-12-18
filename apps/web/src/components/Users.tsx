import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@myorg/api-client';
import { Loader } from '@/components/ui/custom/Loader';
import Error from './ui/custom/Error';
import { LeadsResponse, User } from '@myorg/types';
import clsx from 'clsx';
import { Link } from 'react-router';

export default function Users() {
    const { data, isLoading, error, isError } = useQuery({
        queryFn: getAllUsers,
        queryKey: ['users'],
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
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                            </tr>
                        </thead>
                        <TableData data={data} />
                    </table>
                </>
            )}

        </>
    );
}

export function TableData({ data }: { data: User[] }) {
    return (
        <tbody>
            {data?.length > 0 ? (
                data.map((user) => (
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


