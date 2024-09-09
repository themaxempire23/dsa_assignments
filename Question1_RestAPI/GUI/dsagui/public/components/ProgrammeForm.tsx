import {Programme, Course} from "@/public/components/types"; // Adjust the path as needed
import {ChangeEvent} from "react";

interface ProgrammeFormProps {
    programmeData: Partial<Programme>;
    setProgrammeData: React.Dispatch<React.SetStateAction<Partial<Programme>>>;
    handleSubmit: () => void;
    isAddMode: boolean;
}

export const ProgrammeForm = ({
                                  programmeData,
                                  setProgrammeData,
                                  handleSubmit,
                                  isAddMode,
                              }: ProgrammeFormProps) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setProgrammeData((prev) => ({...prev, [name]: value}));
    };

    const handleCoursesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const courses = e.target.value.split(", ").map((course) => {
            const [courseCode, courseName] = course.split(": ");
            return {courseCode, courseName, nqfLevel: 0}; // Default nqfLevel or adjust accordingly
        });
        setProgrammeData((prev) => ({...prev, courses}));
    };

    return (
        <div className="w-full mb-8 text-black">
            <h2 className="text-xl font-semibold mb-4">{isAddMode ? "Add Programme" : "Update Programme"}</h2>
            <div className="w-full mb-4">
                <label className="block text-sm font-medium mb-2">Programme Code</label>
                <input
                    type="text"
                    name="programmeCode"
                    value={programmeData.programmeCode || ""}
                    onChange={handleInputChange}
                    placeholder="Programme Code"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div className="w-full mb-4">
                <label className="block text-sm font-medium mb-2">Faculty</label>
                <input
                    type="text"
                    name="faculty"
                    value={programmeData.faculty || ""}
                    onChange={handleInputChange}
                    placeholder="Faculty"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div className="w-full mb-4">
                <label className="block text-sm font-medium mb-2">Department</label>
                <input
                    type="text"
                    name="department"
                    value={programmeData.department || ""}
                    onChange={handleInputChange}
                    placeholder="Department"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div className="w-full mb-4">
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                    type="text"
                    name="title"
                    value={programmeData.title || ""}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>
            <div className="w-full mb-4">
    <label className="block text-sm font-medium mb-2">Registration Date</label>
    <input
        type="datetime-local"
        name="registrationDate"
        value={programmeData.registrationDate ? programmeData.registrationDate.slice(0, 16) : ""}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
    />
            </div>

            <div className="w-full mb-4">
                <label className="block text-sm font-medium mb-2">Courses (comma separated)</label>
                <textarea
                    value={
                        programmeData.courses
                            ?.map((course: Course) => `${course.courseCode}: ${course.courseName}`)
                            .join(", ") || ""
                    }
                    onChange={handleCoursesChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>
            <button
                onClick={handleSubmit}
                style={{
                    backgroundColor: '#3b82f6', // Blue-500
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem', // Rounded-lg
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Shadow-md
                    transition: 'background-color 0.3s ease', // Transition effect
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'} // Blue-600 on hover
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'} // Blue-500 on mouse out
            >
                {isAddMode ? "Add Programme" : "Update Programme"}
            </button>

        </div>
    );
};
