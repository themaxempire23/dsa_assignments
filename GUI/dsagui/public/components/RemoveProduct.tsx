// components/RemoveProduct.tsx
import { useEffect, useState } from 'react';
import { client } from '@/compiled_proto/grpcClient'; // Adjust this path as necessary
import { ListAvailableProductsRequest, ListAvailableProductsResponse, RemoveProductRequest, RemoveProductResponse, Product } from '@/compiled_proto/shopping_system'; // Adjust this path as necessary

export default function RemoveProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedSku, setSelectedSku] = useState<string>('');
    const [response, setResponse] = useState<RemoveProductResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const request: ListAvailableProductsRequest = {};
                const response = await client.listAvailableProducts(request);
                setProducts(response.products);
            } catch (err) {
                setError('Failed to fetch products');
            }
        }

        fetchProducts();
    }, []);

    const handleRemove = async () => {
        try {
            const request: RemoveProductRequest = { sku: selectedSku };
            const result = await client.removeProduct(request);

            // Update the product list after removal
            if (result) {
                const updatedProducts = products.filter(product => product.sku !== selectedSku);
                setProducts(updatedProducts);
                setResponse(result);
                setError(null); // Clear previous errors on success
            } else {
                setError('No response received');
            }
        } catch (err) {
            setResponse(null); // Clear previous response on error
            setError('Failed to remove product');
        }
    };

    return (
        <div
            style={{backgroundColor:"#91AEC1"}}
            className="bg-[#C0C5C1] dark:bg-gray-700 p-6 max-w-lg mx-auto rounded-lg shadow-md dark:text-black">
            <h1 className="text-2xl font-bold mb-6 text-center">Remove Product</h1>

            <div className="mb-4 dark:text-black">
                <label className="block mb-2 font-semibold">Select Product to Remove</label>
                <select
                    value={selectedSku}
                    onChange={(e) => setSelectedSku(e.target.value)}
                    className="text-black  w-full p-3 border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                        <option key={product.sku} value={product.sku}>
                            {product.name} (SKU: {product.sku})
                        </option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleRemove}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                disabled={!selectedSku}
            >
                Remove Product
            </button>

            {response && <p className="mt-4 text-green-500 text-center">Product removed successfully.</p>}
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
    );
}
