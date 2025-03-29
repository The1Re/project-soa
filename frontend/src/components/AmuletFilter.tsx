import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type Filter = {
    search: string;
    minPrice: number;
    maxPrice: number;
};

function AmuletFilter({ onFilterChange }: { onFilterChange?: (filter: Filter) => void }) {
    const [filter, setFilter] = useState<Filter>({
        search: "",
        minPrice: 0,
        maxPrice: 100000,
    });

    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        onFilterChange?.(filter);
    }, [filter, onFilterChange]);

    const handleSearch = () => {
        console.log("Searching with:", filter);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Search Box */}
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <input
                        type="text"
                        placeholder="ค้นหาชื่อพระ..."
                        className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={filter.search}
                        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                    />
                </div>
                <button
                    className="border border-gray-300 text-gray-700 rounded-xl px-5 py-2 text-sm hover:bg-gray-100 transition w-full sm:w-2xs items-center justify-center gap-2"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    ตัวกรอง {isExpanded ? "▲" : "▼"}
                </button>


                <button
                    className="bg-orange-600 text-white rounded-xl px-6 py-2 text-sm hover:bg-orange-700 transition w-full sm:w-auto flex items-center justify-center gap-2"
                    onClick={handleSearch}
                >
                    <FontAwesomeIcon icon={faSearch} />
                    ค้นหา
                </button>


            </div>

            {/* Advanced Filter */}
            {isExpanded && (
                <div className="mt-6 border-t pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        ช่วงราคา: <span className="font-semibold text-orange-600">฿{filter.minPrice.toLocaleString()}</span> - <span className="font-semibold text-orange-600">฿{filter.maxPrice.toLocaleString()}</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Min:</span>
                            <input
                                type="number"
                                min={0}
                                max={filter.maxPrice}
                                value={filter.minPrice}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        minPrice: Math.min(Number(e.target.value), filter.maxPrice),
                                    })
                                }
                                className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                            />
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="1000"
                            value={filter.minPrice}
                            onChange={(e) =>
                                setFilter({
                                    ...filter,
                                    minPrice: Math.min(Number(e.target.value), filter.maxPrice),
                                })
                            }
                            className="w-full accent-orange-600"
                        />

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Max:</span>
                            <input
                                type="number"
                                min={filter.minPrice}
                                max={100000}
                                value={filter.maxPrice}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        maxPrice: Math.max(Number(e.target.value), filter.minPrice),
                                    })
                                }
                                className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                            />
                        </div>

                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="1000"
                            value={filter.maxPrice}
                            onChange={(e) =>
                                setFilter({
                                    ...filter,
                                    maxPrice: Math.max(Number(e.target.value), filter.minPrice),
                                })
                            }
                            className="w-full accent-orange-600"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default AmuletFilter;
