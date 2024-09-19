// components/ViewCart.tsx
import { useState, useEffect, useRef } from 'react';
import { client } from '@/compiled_proto/grpcClient';
import { ViewCartRequest, ViewCartResponse, Product, RemoveFromCartRequest, RemoveFromCartResponse } from '@/compiled_proto/shopping_system';
import { FaShoppingCart } from 'react-icons/fa'; // Import an icon for the cart button

interface ViewCartProps {
    userId: string;
}

export default function ViewCart({ userId }: ViewCartProps) {
    const [cartProducts, setCartProducts] = useState<Product[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // State to control the visibility of the overlay
    const overlayRef = useRef<HTMLDivElement | null>(null); // Ref for the overlay container

    // Function to fetch the cart contents
    const handleViewCart = async () => {
        setLoading(true);
        try {
            const request: ViewCartRequest = { userId };
            const response: ViewCartResponse = await client.viewCart(request);

            // Set cart products from the response
            setCartProducts(response.products || []);
            setError(null);
        } catch (err) {
            setCartProducts(null);
            // setError('Failed to fetch cart contents');
        } finally {
            setLoading(false);
        }
    };

    // Automatically call `handleViewCart` when the component mounts
    useEffect(() => {
        handleViewCart();
    }, []); // Empty dependency array to run only once when the component mounts

    // Handle removing an item from the cart and refresh the cart
    const handleRemoveFromCart = async (sku: string) => {
        setLoading(true);
        try {
            const request: RemoveFromCartRequest = { sku };
            const response: RemoveFromCartResponse = await client.removeFromCart(request);

            if (response.status === 'success') {
                // Refresh the cart contents after removing the product
                await handleViewCart();
            }
        } catch (err) {
            setError('Failed to remove product from cart');
        } finally {
            setLoading(false);
        }
    };

    const toggleOverlay = async () => {
        if (!showOverlay) {
            // Refresh cart contents when opening the overlay
            await handleViewCart();
        }
        setShowOverlay(!showOverlay); // Toggle the overlay visibility
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false); // Close the overlay
    };

    // Close overlay if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
                handleCloseOverlay();
            }
        };

        if (showOverlay) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showOverlay]);

    return (
        <div className="p-4 text-black">
            {/* Button to toggle the overlay */}
            <button
                onClick={toggleOverlay}
                style={{backgroundColor:"#6F95AE"}}
                className="bg-blue-500 p-2 rounded flex items-center gap-2"
            >
                <FaShoppingCart />
                View Cart Items
            </button>

            {/* Display loading or error messages */}
            {loading && <p className="mt-4">Loading cart...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}

            {/* Overlay to display cart items */}
            {showOverlay && (
                <div className="text-black fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div ref={overlayRef} className="bg-white p-4 rounded shadow-lg relative max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-4">Cart Items</h2>

                        {cartProducts && cartProducts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {cartProducts.map((product, index) => (
                                    <div key={index} className="bg-gray-500 p-4 rounded shadow-md text-black">
                                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                        <p className="mb-2">{product.description}</p>
                                        <p className="mb-2">Price: ${product.price.toFixed(2)}</p>
                                        <p className="mb-2">Stock Quantity: {product.stockQuantity}</p>
                                        <p className="mb-2">SKU: {product.sku}</p>
                                        <p className="mb-2">Status: {product.status}</p>
                                        <button
                                            onClick={() => handleRemoveFromCart(product.sku)}
                                            className="bg-blue-500 p-2 rounded"
                                        >
                                            Remove from Cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Your cart is empty.</p>
                        )}

                        {/* Close button for the overlay */}
                        <button
                            onClick={handleCloseOverlay}
                            className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
