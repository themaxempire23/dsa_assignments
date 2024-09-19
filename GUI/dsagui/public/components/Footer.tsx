export function Footer() {
    return (
        <footer className="text-black bg-gray-800  py-6">
            <div className="container mx-auto flex flex-col items-center justify-between">
                <div className="mt-4 text-sm opacity-50">
                    © {new Date().getFullYear()} Frans Distributed Systems - GUIs
                </div>
            </div>
        </footer>
    );
}
