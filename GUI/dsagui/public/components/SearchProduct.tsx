// components/SearchProduct.tsx
import { useState } from 'react';
import { client } from '@/compiled_proto/grpcClient';
import { SearchProductRequest, Product } from '@/compiled_proto/shopping_system';
import { FaSearch } from 'react-icons/fa';

export default function SearchProduct() {
    const [sku, setSku] = useState<string>('');
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showOverlay, setShowOverlay] = useState<boolean>(false);

    const handleSearch = async () => {
        try {
            const request: SearchProductRequest = { sku };
            const response = await client.searchProduct(request);

            if (response.product) {
                setProduct(response.product || null);
                setError(null);
                setShowOverlay(true); // Show overlay with product info
            } else if (response.message) {
                setProduct(null);
                setError(response.message || 'Product not found');
                setShowOverlay(false);
            } else {
                setProduct(null);
                setError('Unexpected response format');
                setShowOverlay(false);
            }
        } catch (err) {
            setProduct(null);
            // setError('Failed to search for product');
            setShowOverlay(false);
        }
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false);
    };

    const handleSkuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSku(e.target.value);
        setShowOverlay(false); // Hide overlay when user types a new SKU
    };

    return (
        <div className="relative p-4 text-black">
            <div className="flex items-center gap-2">
                <input
                    style={{backgroundColor:"#D8E3E9"}}
                    type="text"
                    value={sku}
                    onChange={handleSkuChange}
                    placeholder="Enter Product SKU"
                    className="text-black border p-2 rounded w-full"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 p-2 rounded flex items-center"
                >
                    <FaSearch />
                </button>
            </div>

            {showOverlay && product && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg relative max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
                        <p><strong>Name:</strong> {product.name}</p>
                        <p><strong>Description:</strong> {product.description}</p>
                        <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                        <p><strong>Stock Quantity:</strong> {product.stockQuantity}</p>
                        <p><strong>SKU:</strong> {product.sku}</p>
                        <p><strong>Status:</strong> {product.status}</p>
                        <button
                            onClick={handleCloseOverlay}
                            className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}
