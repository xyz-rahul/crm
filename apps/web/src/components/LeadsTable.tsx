import { LeadResponse, LeadsResponse } from "@myorg/types";
import clsx from "clsx";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/utils";

async function deleteLead(id: string) {
    await api.delete(`/lead/${id}`);
}

export default function LeadsTable({ data: leadResponse }: { data: LeadsResponse }) {
    return (
        <tbody>
            {leadResponse?.leads?.length > 0 ? (
                leadResponse.leads.map((lead) => (
                    <LeadRow key={lead._id} lead={lead} />
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
            )}
        </tbody>
    );
}

function LeadRow({ lead }: { lead: LeadResponse }) {
    const queryClient = useQueryClient();
    const deleteMutation = useMutation<unknown, unknown, string>({
        mutationFn: deleteLead,
        onSuccess: () => {
            queryClient.invalidateQueries(["leads"]);
        },
    });
    return (
        <tr
            key={lead._id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <Link to={`/lead/${lead._id}`}>{lead.name}</Link>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {lead.phone}
            </td>
            <td className="px-6 font-semibold text-gray-900 dark:text-white">
                <span
                    className={clsx(
                        "py-1 px-4 rounded-2xl text-white font-semibold",
                        lead.status === "new" && "bg-blue-500",
                        lead.status === "archived" && "bg-gray-400",
                        lead.status === "contacted" && "bg-yellow-500",
                        lead.status === "qualified" && "bg-green-500",
                        lead.status === "converted" && "bg-purple-500",
                    )}
                >
                    {lead.status}
                </span>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <Link to={`/user/${lead.user._id}`}>
                    <span className="py-2 px-4 rounded-2xl bg-gray-200">
                        {lead.user.name}
                    </span>
                </Link>
            </td>

            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white flex justify-center">
                {deleteMutation.isLoading ?
                    <>
                        <Loader2Icon className="animate-spin" />
                    </> :
                    <Button onClick={() => deleteMutation.mutate(lead._id)} variant="outline" className="hover:border-red-600">
                        <Trash2Icon />
                    </Button>
                }
            </td>
        </tr>
    )
}
