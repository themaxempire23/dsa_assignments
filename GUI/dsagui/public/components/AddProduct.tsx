// pages/AddProduct.tsx
import { useState } from 'react';
import { client } from '@/compiled_proto/grpcClient';
import { AddProductRequest, AddProductResponse } from '@/compiled_proto/shopping_system'; // Update this path as necessary

export default function AddProduct() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stockQuantity, setStockQuantity] = useState(0);
    const [sku, setSku] = useState('');
    const [status, setStatus] = useState('');
    const [response, setResponse] = useState<AddProductResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            const request: AddProductRequest = { name, description, price, stockQuantity, sku, status };
            const res = await client.addProduct(request);
            setResponse(res);
            setError(null); // Clear previous errors on success
        } catch (err) {
            setResponse(null); // Clear previous response on error
            setError('Failed to add product');
        }
    };

    return (
        <div
            style={{backgroundColor:"#91AEC1"}}
            className="bg-[#C0C5C1] dark:bg-gray-700 p-6 max-w-md mx-auto rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Add Product</h1>
            <div className="text-black space-y-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                    className="text-black w-full p-2 border rounded-md shadow-sm"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full p-2 border rounded-md shadow-sm"
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    placeholder="Price"
                    className="w-full p-2 border rounded-md shadow-sm"
                />
                <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(parseInt(e.target.value))}
                    placeholder="Stock Quantity"
                    className="w-full p-2 border rounded-md shadow-sm"
                />
                <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="SKU"
                    className="w-full p-2 border rounded-md shadow-sm"
                />
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Status"
                    className="w-full p-2 border rounded-md shadow-sm"
                />
            </div>
            <button
                onClick={handleSubmit}
                className="mt-6 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                Add Product
            </button>
            {response && <p className="mt-4 text-green-500 text-center">Product added with code: {response.productCode}</p>}
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
    );
}
