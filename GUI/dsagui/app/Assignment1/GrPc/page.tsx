"use client";
import {useEffect, useState} from 'react';
import {Footer} from '@/public/components/Footer';
import {client} from '@/compiled_proto/grpcClient';
import {
    ListAvailableProductsRequest,
    ListAvailableProductsResponse,
    Product,
    CheckUserTypeRequest,
    CheckUserTypeResponse
} from '@/compiled_proto/shopping_system';
import AdminPanel from '@/public/components/AdminPanel';
import UserPanel from '@/public/components/UserPanel';
import ViewCart from '@/public/components/ViewCart';
import {useUser} from '@/public/components/UserContext';

export default function Home() {
    const {userId, setUserId} = useUser();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState<ListAvailableProductsResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [cartStatus, setCartStatus] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const request: ListAvailableProductsRequest = {};
                const response = await client.listAvailableProducts(request);
                setProducts(response);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        }

        if (isAuthenticated) {
            fetchProducts();
        }
    }, [isAuthenticated]);

    const handleCheckUserType = async () => {
        try {
            // Special case for admin access
            if (userId.toLowerCase() === 'admin') {
                setUserRole('admin');
                setIsAuthenticated(true);
                return;
            }

            const request: CheckUserTypeRequest = {userId};
            const response: CheckUserTypeResponse = await client.checkUserType(request);
            setUserRole(response.userType);
            setIsAuthenticated(true);
        } catch (err) {
            // setError('Failed to check user type');
        }
    };

    const handleAddToCart = async (product: Product) => {
        if (!userId) {
            setError('Please enter a user ID to add to the cart.');
            return;
        }

        try {
            const request = {
                userId,
                sku: product.sku,
            };
            const response = await client.addToCart(request);
            // setCartStatus(response.status || 'Failed to add to cart');
        } catch (err) {
            setCartStatus('Failed to add to cart');
        }
    };

    return (
        <>
            <main style={{backgroundColor:"#BFD7EA"}} className="bg-[#FFFFFF] flex min-h-screen flex-col">
                <div className="flex flex-col gap-2 items-center justify-center flex-grow p-24">
                    {!isAuthenticated ? (
                        <div style={{backgroundColor:"#6F95AE"}} className="w-full max-w-sm mx-auto bg-white  border-gray-300 p-6 rounded shadow-md">
                            <h1 className="text-2xl font-bold mb-4">Enter Your User ID</h1>
                            <input
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                placeholder="User ID"
                                className="border  text-black  p-2 w-full mb-4"
                            />
                            <button
                                onClick={handleCheckUserType}
                                className="bg-blue-500  p-2 rounded hover:bg-blue-600"
                            >
                                Check Role
                            </button>
                            {error && <p className="mt-4 text-red-500">{error}</p>}
                        </div>
                    ) : (
                        <>
                            {/* Fixed product list container */}
                            <div className="w-full overflow-y-auto max-h-[400px]">
                                <h1 className="text-black text-2xl font-bold mb-4">Available Products</h1>

                                {loading && <p>Loading products...</p>}
                                {error && <p className="text-red-500">{error}</p>}
                                {cartStatus && <p className="text-green-500">{cartStatus}</p>}

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {products && products.products.map((product, index) => (
                                        <div key={index}
                                             style={{backgroundColor:"#91AEC1"}}
                                             className="text-black p-4 rounded shadow-md hover:shadow-lg transition-shadow">
                                            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                            <p className="mb-2">{product.description}</p>
                                            <p className="mb-2">Price: ${product.price.toFixed(2)}</p>
                                            <p className="mb-2">Stock Quantity: {product.stockQuantity}</p>
                                            <p className="mb-2">SKU: {product.sku}</p>
                                            <p className="mb-4">Status: {product.status}</p>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="bg-blue-500  p-2 rounded hover:bg-blue-600"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Dynamic content below */}
                            <div className="mt-8">
                                {userRole === 'admin' ? (
                                    <AdminPanel/>
                                ) : (
                                    <UserPanel userId={userId}/>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <div className="py-2">
                    <Footer/>
                </div>
            </main>
        </>
    );
}
