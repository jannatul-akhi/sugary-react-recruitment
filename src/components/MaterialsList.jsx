import { useEffect, useState } from 'react';
import API from '../api';

const PAGE_LIMIT = 20;

const getEncodedFilter = (skip = 0, limit = PAGE_LIMIT) =>
    btoa(JSON.stringify({ Skip: skip, Limit: limit, Types: [1] }));

const MaterialsList = () => {
    const [materials, setMaterials] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchMaterials = async (pageNum) => {
        const skip = (pageNum - 1) * PAGE_LIMIT;
        const filter = getEncodedFilter(skip);

        setLoading(true);
        try {
            const res = await API.get(`/Materials/GetAll/?filter=${filter}`);
            setMaterials(res.data.Materials);
            setTotal(res.data.TotalCount);
        } catch (err) {
            console.error("Failed to load materials", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMaterials(page);
    }, [page]);

    const totalPages = Math.ceil(total / PAGE_LIMIT);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Materials</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {materials.map((item) => (
                        <div
                            key={item.Id}
                            className="border-1 border-orange-500 rounded p-4 shadow-sm bg-white"
                        >
                            <img
                                src={`https://d1wh1xji6f82aw.cloudfront.net/${item.CoverPhoto}`}
                                alt={item.Title}
                                className="w-full h-40 object-cover mb-2 rounded"
                            />
                            <h3 className="font-medium">{item.Title}</h3>
                            <p className="text-sm text-gray-500">
                                {item.BrandName}
                            </p>
                            <p className="text-green-600 font-semibold">
                                ৳{item.SalesPrice}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 gap-2">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="px-3 py-1">{page} / {totalPages}</span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MaterialsList;
