import { SearchItem } from "@myorg/types";
import clsx from "clsx";
import pDebounce from 'p-debounce';
import { useState } from "react";
import { Link } from "react-router";

export default function SearchBar({ onChange, data }: { onChange: React.Dispatch<React.SetStateAction<string>>, data: SearchItem[] | undefined }) {
    const [focused, setFocused] = useState(false)
    const debounceOnChange = pDebounce(onChange, 300);
    return (
        <div>
            <form className="max-w-md mx-auto">
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="outline-none block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Search..."
                        required
                        onChange={(e) => debounceOnChange(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                    />

                    <div
                        className={clsx(
                            focused ? "opacity-100" : "opacity-0",
                            "absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-600 mt-2"
                        )}
                    >

                        {data?.map((item, index) => (
                            <Link
                                key={index}
                                to={
                                    item.type === "lead"
                                        ? `/lead/${item._id}`
                                        : item.type === "user"
                                            ? `/user/${item._id}`
                                            : "#"
                                }
                                className="block"
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                            >
                                <div
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                >
                                    <p className="text-sm text-gray-900 dark:text-white">{item.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.type}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </form>
        </div>
    )
}

