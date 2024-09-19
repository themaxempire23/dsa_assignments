// components/AdminPanel.tsx
import {useState} from 'react';
import {FaPlus, FaEdit, FaTrash} from 'react-icons/fa';
import AddProduct from '@/public/components/AddProduct';
import UpdateProduct from '@/public/components/UpdateProduct';
import RemoveProduct from '@/public/components/RemoveProduct';

const AdminPanel = () => {
    const [activeComponent, setActiveComponent] = useState<string | null>(null);

    return (
        <div className="p-4 flex flex-col items-center">
            {/* Buttons container */}
            <div
                style={{backgroundColor: "#6F95AE"}}
                className="flex gap-4 mb-4 justify-center  bg-white dark:bg-gray-800 w-auto py-4 shadow-md">
                <button
                    onClick={() => setActiveComponent('add')}
                    className={`flex items-center gap-2 p-2 rounded ${activeComponent === 'add' ? 'bg-blue-500 text-white' : 'bg-green-600'}`}
                >
                    <FaPlus/>
                    Add Product
                </button>
                <button
                    onClick={() => setActiveComponent('update')}
                    className={`flex items-center gap-2 p-2 rounded ${activeComponent === 'update' ? 'bg-blue-500 text-white' : 'bg-green-600'}`}
                >
                    <FaEdit/>
                    Update Product
                </button>
                <button
                    onClick={() => setActiveComponent('remove')}
                    className={`flex items-center gap-2 p-2 rounded ${activeComponent === 'remove' ? 'bg-blue-500 text-white' : 'bg-green-600'}`}
                >
                    <FaTrash/>
                    Remove Product
                </button>
            </div>

            {/* Content section */}
            <div className="mt-24 w-full">
                {activeComponent === 'add' && <AddProduct/>}
                {activeComponent === 'update' && <UpdateProduct/>}
                {activeComponent === 'remove' && <RemoveProduct/>}
            </div>
        </div>
    );
};

export default AdminPanel;
