// components/ErrorDisplay.tsx
interface ErrorDisplayProps {
    error: string | null;
}

export const ErrorDisplay = ({ error }: ErrorDisplayProps) => (
    error ? (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg shadow-md">
            <p>{error}</p>
        </div>
    ) : null
);