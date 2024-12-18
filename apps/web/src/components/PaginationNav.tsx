import { SetURLSearchParams } from "react-router";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export default function PaginationNav({
    page,
    totalPages,
    setSearchParams
}: {
    page: number;
    totalPages: number;
    setSearchParams: SetURLSearchParams
}) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {page - 1 > 0 && (
                        <PaginationPrevious
                            onClick={() => {
                                const prevPage = String(page - 1);

                                setSearchParams({ page: prevPage });
                            }}
                            className="cursor-pointer"
                        />
                    )}
                </PaginationItem>
                <PaginationItem>
                    {page - 1 > 0 && (
                        <PaginationLink
                            onClick={() => {
                                const prevPage = String(page - 1);
                                setSearchParams({ page: prevPage });
                            }}
                            className="cursor-pointer"
                        >
                            {page - 1}
                        </PaginationLink>
                    )}
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink isActive className="cursor-pointer">
                        {page}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    {totalPages &&
                        page + 1 <= totalPages && (
                            <PaginationLink
                                onClick={() => {
                                    const nextPage = String(page + 1);
                                    setSearchParams({ page: nextPage });
                                }}
                                className="cursor-pointer"
                            >
                                {page + 1}
                            </PaginationLink>
                        )}
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    {totalPages &&
                        page + 1 <= totalPages && (
                            <PaginationNext
                                onClick={() => {
                                    const nextPage = String(page + 1);
                                    setSearchParams({ page: nextPage });
                                }}
                                className="cursor-pointer"
                            />
                        )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}



