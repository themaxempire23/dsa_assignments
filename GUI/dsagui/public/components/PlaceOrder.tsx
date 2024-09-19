// components/PlaceOrder.tsx
import { useState, useEffect, useRef } from 'react';
import { client } from '@/compiled_proto/grpcClient';
import { PlaceOrderRequest, PlaceOrderResponse, ViewCartRequest, ViewCartResponse, RemoveFromCartRequest } from '@/compiled_proto/shopping_system';

interface PlaceOrderProps {
    userId: string;
}

export default function PlaceOrder({ userId }: PlaceOrderProps) {
    const [orderId, setOrderId] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // State for overlay visibility
    const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation dialog

    const confirmationRef = useRef<HTMLDivElement | null>(null); // Ref for confirmation dialog

    // Function to place the order
    const handlePlaceOrder = async () => {
        setLoading(true);
        setStatus(null);
        setError(null);

        try {
            // Place the order
            const placeOrderRequest: PlaceOrderRequest = { userId };
            const placeOrderResponse: PlaceOrderResponse = await client.placeOrder(placeOrderRequest);

            if (placeOrderResponse.status === 'Order placed successfully') {
                // Clear the cart
                const viewCartRequest: ViewCartRequest = { userId };
                const viewCartResponse: ViewCartResponse = await client.viewCart(viewCartRequest);

                if (viewCartResponse.products.length > 0) {
                    for (const product of viewCartResponse.products) {
                        const removeFromCartRequest: RemoveFromCartRequest = { sku: product.sku };
                        await client.removeFromCart(removeFromCartRequest);
                    }
                }

                setOrderId(placeOrderResponse.orderId);
                setStatus('Order placed successfully');
            } else {
                setStatus('Order placement failed');
            }
        } catch (err) {
            setError('No items in Cart');
        } finally {
            setLoading(false);
            setShowOverlay(true); // Show the overlay after placing the order
            setShowConfirmation(false); // Hide confirmation dialog
        }
    };

    // Function to handle order confirmation
    const confirmPlaceOrder = () => {
        setShowConfirmation(true); // Show confirmation dialog
    };

    const handleConfirmYes = () => {
        handlePlaceOrder(); // Proceed with placing the order
    };

    const handleConfirmNo = () => {
        setShowConfirmation(false); // Hide confirmation dialog
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false); // Close the overlay
        // Clear the Order ID, status, and error when overlay is closed
        setOrderId(null);
        setStatus(null);
        setError(null);
    };

    // Close the confirmation dialog if clicked outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (confirmationRef.current && !confirmationRef.current.contains(event.target as Node)) {
                setShowConfirmation(false);
            }
        };

        if (showConfirmation) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showConfirmation]);

    return (
        <div className="p-4 text-black">
            <button
                onClick={confirmPlaceOrder}
                style={{backgroundColor:"#6F95AE"}}
                className="bg-blue-500 text-black p-2 rounded hover:bg-blue-600"
                disabled={loading}
            >
                {loading ? 'Placing Order...' : 'Place Order'}
            </button>

            {/* Confirmation dialog */}
            {showConfirmation && (
                <div className="text-black fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div ref={confirmationRef} className="bg-white p-4 rounded shadow-lg relative max-w-md w-full">
                        <h2 className="text-xl font-semibold mb-4">Confirm Order</h2>
                        <p>Are you sure you want to place the order?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleConfirmYes}
                                className="bg-blue-500 text-black p-2 rounded mr-2"
                            >
                                Yes
                            </button>
                            <button
                                onClick={handleConfirmNo}
                                className="bg-blue-500 text-black p-2 rounded"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay for showing order details */}
            {showOverlay && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded shadow-lg relative max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                        {status && <p className="text-green-500 mb-2">{status}</p>}
                        {orderId && <p className="mb-2">Order ID: {orderId}</p>}
                        {error && <p className="text-red-500 mb-2">{error}</p>}

                        <button
                            onClick={handleCloseOverlay}
                            className="absolute top-2 right-2 bg-blue-500  p-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
