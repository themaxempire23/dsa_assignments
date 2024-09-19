"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

// Define a context type
interface UserContextType {
    userId: string;
    setUserId: (id: string) => void;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export function UserProvider({ children }: { children: ReactNode }) {
    const [userId, setUserId] = useState<string>('');

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
}

// Custom hook to use the user context
export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
