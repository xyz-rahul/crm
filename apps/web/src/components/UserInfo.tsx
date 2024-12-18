import { getUserById } from '@myorg/api-client';
import { useQuery } from '@tanstack/react-query';
import { Params, useParams } from 'react-router';
import { Loader } from '@/components/ui/custom/Loader';
import Error from '@/components/ui/custom/Error';

interface ParamTypes extends Params {
    id: string;
}

export default function UserInfo() {
    const { id } = useParams<ParamTypes>();
    const { data, isLoading, error, isError } = useQuery({
        queryFn: () => {
            if (id) return getUserById(id);
        },
        queryKey: ['user', { id }],
    });

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
                                <p className="text-gray-600">
                                    <span className="font-semibold">Name:</span> {data?.name}
                                </p>
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

