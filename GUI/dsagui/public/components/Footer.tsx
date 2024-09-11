export function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto flex flex-col items-center justify-between">
                <div className="flex flex-col items-center">
                    <p className="text-lg font-semibold">Frans Nekongo</p>
                    <p className="text-sm opacity-75">Software Development Student</p>
                    <p className="text-sm opacity-75">Student Number: 221004351</p>
                </div>
                <div className="mt-4 flex space-x-4">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 .5C5.373.5 0 5.873 0 12.5c0 5.299 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577v-2.04c-3.338.726-4.033-1.61-4.033-1.61-.546-1.387-1.332-1.756-1.332-1.756-1.089-.745.082-.73.082-.73 1.204.085 1.837 1.244 1.837 1.244 1.07 1.833 2.809 1.303 3.495.996.107-.775.419-1.303.763-1.603-2.665-.303-5.467-1.332-5.467-5.93 0-1.31.469-2.383 1.235-3.222-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.228.96-.267 1.986-.4 3.006-.404 1.02.004 2.047.137 3.008.404 2.289-1.55 3.294-1.228 3.294-1.228.654 1.652.242 2.873.12 3.176.769.839 1.233 1.912 1.233 3.222 0 4.61-2.806 5.624-5.479 5.92.43.371.814 1.103.814 2.222v3.293c0 .317.216.692.824.575C20.566 22.299 24 17.798 24 12.5 24 5.873 18.627.5 12 .5z"/>
                        </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.23 0H1.77C.792 0 0 .774 0 1.73v20.54C0 23.226.792 24 1.77 24h20.46c.978 0 1.77-.774 1.77-1.73V1.73C24 .774 23.208 0 22.23 0zM7.079 20.452H3.672V9.045h3.407v11.407zM5.376 7.634c-1.09 0-1.977-.894-1.977-1.997 0-1.104.886-1.998 1.977-1.998s1.977.894 1.977 1.998c0 1.103-.886 1.997-1.977 1.997zm14.923 12.818h-3.405v-5.682c0-1.354-.024-3.094-1.884-3.094-1.886 0-2.173 1.471-2.173 2.992v5.784H9.43V9.045h3.272v1.556h.046c.455-.859 1.566-1.763 3.225-1.763 3.45 0 4.088 2.27 4.088 5.218v6.396z"/>
                        </svg>
                    </a>
                </div>
                <div className="mt-4 text-sm opacity-50">
                    © {new Date().getFullYear()} Distributed Systems - GUIs Assignments
                </div>
            </div>
        </footer>
    );
}
