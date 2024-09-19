// components/UpdateProduct.tsx
import { useEffect, useState } from 'react';
import { client } from '@/compiled_proto/grpcClient'; // Adjust this path as necessary
import { ListAvailableProductsRequest, ListAvailableProductsResponse, UpdateProductRequest, UpdateProductResponse, Product } from '@/compiled_proto/shopping_system'; // Adjust this path as necessary

export default function UpdateProduct() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedSku, setSelectedSku] = useState<string>('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [stockQuantity, setStockQuantity] = useState<number | ''>('');
    const [status, setStatus] = useState('');
    const [response, setResponse] = useState<UpdateProductResponse | null>(null);
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

    const handleProductChange = (sku: string) => {
        const selectedProduct = products.find(product => product.sku === sku);
        if (selectedProduct) {
            setSelectedSku(selectedProduct.sku);
            setName(selectedProduct.name);
            setDescription(selectedProduct.description);
            setPrice(selectedProduct.price);
            setStockQuantity(selectedProduct.stockQuantity);
            setStatus(selectedProduct.status);
        }
    };

    const handleSubmit = async () => {
        try {
            const request: UpdateProductRequest = {
                sku: selectedSku,
                name,
                description,
                price: typeof price === 'number' ? price : 0,
                stockQuantity: typeof stockQuantity === 'number' ? stockQuantity : 0,
                status,
            };

            const result = await client.updateProduct(request);
            setResponse(result);
            setError(null); // Clear previous errors on success
        } catch (err) {
            setResponse(null); // Clear previous response on error
            setError('Failed to update product');
        }
    };

    return (
        <div
            style={{backgroundColor:"#91AEC1"}}
            className="bg-[#C0C5C1] dark:bg-gray-700 p-6 max-w-lg mx-auto rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center">Update Product</h1>

            <div className="mb-4">
                <label className="block mb-2 font-semibold">Select Product</label>
                <select
                    value={selectedSku}
                    onChange={(e) => handleProductChange(e.target.value)}
                    className="text-black w-full p-3 border border-gray-300 rounded-md shadow-sm"
                >
                    <option value="">Select a product</option>
                    {products.map((product) => (
                        <option key={product.sku} value={product.sku}>
                            {product.name} (SKU: {product.sku})
                        </option>
                    ))}
                </select>
            </div>

            {selectedSku && (
                <div className="space-y-4">
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            className="text-black w-full p-3 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            className="text-black w-full p-3 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Price</label>
                        <input
                            type="number"
                            value={typeof price === 'number' ? price : ''}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder="Price"
                            className="text-black w-full p-3 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Stock Quantity</label>
                        <input
                            type="number"
                            value={typeof stockQuantity === 'number' ? stockQuantity : ''}
                            onChange={(e) => setStockQuantity(Number(e.target.value))}
                            placeholder="Stock Quantity"
                            className="text-black w-full p-3 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Status</label>
                        <input
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            placeholder="Status"
                            className="text-black w-full p-3 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Update Product
                    </button>
                </div>
            )}

            {response && <p className="mt-4 text-green-500 text-center">Status: {response.status}</p>}
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
    );
}
