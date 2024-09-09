// ProgrammeList.tsx
import {Programme} from './types';

interface ProgrammeListProps {
    programmes: Programme[];
    onEditProgramme: (programmeCode: string) => void;
    onDeleteProgramme: (programmeCode: string) => void; // Added prop for delete function
}

export const ProgrammeList = ({programmes, onEditProgramme, onDeleteProgramme}: ProgrammeListProps) => {
    return (
        <div className="text-black w-full">
            {programmes.length > 0 && (
                <div className="bg-gray-100 p-6 rounded-lg ">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Fetched Programmes
                    </h2>
                    <ul className="space-y-4">
                        {programmes.map((programme) => (
                            <li
                                key={programme.programmeCode}
                                className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                    {programme.programmeCode}: {programme.title}
                                </h3>
                                <p className="text-gray-700 mb-2">
                                    <strong className="font-medium">Faculty:</strong> {programme.faculty}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <strong className="font-medium">Department:</strong> {programme.department}
                                </p>
                                <p className="text-gray-700 mb-2">
                                    <strong className="font-medium">Registration
                                        Date:</strong> {programme.registrationDate}
                                </p>
                                <p className="text-gray-700 mb-4">
                                    <strong className="font-medium">Courses:</strong> {programme.courses
                                    ?.map((course) => `${course.courseCode}: ${course.courseName}`)
                                    .join(', ')}
                                </p>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => onEditProgramme(programme.programmeCode)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition duration-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm(`Are you sure you want to delete ${programme.programmeCode}?`)) {
                                                onDeleteProgramme(programme.programmeCode);
                                            }
                                        }}
                                        style={{
                                            backgroundColor: '#dc2626',  // bg-red-600
                                            color: 'white',
                                            padding: '8px 16px',  // py-2 px-4
                                            borderRadius: '8px',  // rounded-lg
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',  // shadow-md
                                            transition: 'background-color 0.3s ease',
                                            fontSize: '16px',
                                            fontWeight: '500',
                                            border: 'none',
                                            cursor: 'pointer',
                                            textAlign: 'center'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}  // hover:bg-red-700
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}  // bg-red-600
                                    >
                                        Delete
                                    </button>

                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
