import { useState } from 'react';
import { FaSearch, FaShoppingCart, FaClipboardCheck } from 'react-icons/fa'; // Icons for search, cart, and order
import SearchProduct from '@/public/components/SearchProduct';
import ViewCart from '@/public/components/ViewCart';
import PlaceOrder from "@/public/components/PlaceOrder";

interface UserPanelProps {
    userId: string;
}

const UserPanel = ({ userId }: UserPanelProps) => {
    const [activePanel, setActivePanel] = useState<'search' | 'cart' | 'order'>('search');

    const handlePanelClick = (panel: 'search' | 'cart' | 'order') => {
        setActivePanel(panel);
    };

    return (
        <div className="p-4 flex flex-col items-center">
            {/* Buttons container */}
            <div style={{backgroundColor:"#91AEC1"}} className="bg-topnav flex gap-4 mb-4 justify-center fixed top-0 z-10  w-full py-1 shadow-md">
                {/* Search Products Button */}
                <SearchProduct />

                {/* View Cart Button */}
                <ViewCart userId={userId} />

                {/* Place Order Button */}
                <PlaceOrder userId={userId} />
            </div>

        </div>
    );
};

export default UserPanel;
