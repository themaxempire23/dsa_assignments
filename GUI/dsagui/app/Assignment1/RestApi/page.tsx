"use client";

import {useState} from "react";
import {Programme} from "@/public/components/types"; // Adjust the path as needed
import {ProgrammeForm} from "@/public/components/ProgrammeForm";
import {ProgrammeList} from "@/public/components/ProgrammeList";
import {ErrorDisplay} from "@/public/components/ErrorDisplay";
import {InputForm} from "@/public/components/InputForm";
import Image from "next/image";

export default function Home() {
    const [programmes, setProgrammes] = useState<Programme[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectMode, setSelectMode] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [programmeData, setProgrammeData] = useState<Partial<Programme>>({});

    const fetchProgrammes = (endpoint: string) => {
        fetch(`http://localhost:9090/programmes${endpoint}`)
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(`Error ${response.status}: ${text}`);
                    });
                }
                return response.json();
            })
            .then((data) => {
                setProgrammes(Array.isArray(data) ? data : [data]);
                setError(null);
            })
            .catch((error) => setError(`Failed to load programmes: ${error.message}`));
    };

    const fetchDueForReview = () => {
        fetch(`http://localhost:9090/programmes/review/due`)
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(`Error ${response.status}: ${text}`);
                    });
                }
                return response.json();
            })
            .then((data) => {
                setProgrammes(Array.isArray(data) ? data : [data]);
                setError(null);
            })
            .catch((error) => setError(`Failed to load due for review programmes: ${error.message}`));
    };

    const submitFetch = () => {
        if (selectMode === "programmeCode") {
            fetchProgrammes(`/${inputValue}`);
        } else if (selectMode === "faculty") {
            fetchProgrammes(`/faculty/${inputValue}`);
        }
    };

    const formatDateToRFC3339 = (dateStr: string | number | Date) => {
        const date = new Date(dateStr);
        return date.toISOString(); // Returns the date in RFC 3339 format
    };


    const postProgramme = () => {
        // Format the registration date
        const formattedProgrammeData = {
            ...programmeData,
            registrationDate: programmeData.registrationDate ? formatDateToRFC3339(programmeData.registrationDate) : undefined
        };

        // Log the formatted date to check correctness
        console.log('Formatted Date:', formattedProgrammeData.registrationDate);

        // Send the request
        fetch(`http://localhost:9090/programmes`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify([formattedProgrammeData]),
        })
            .then((response) => response.json())
            .then((data) => {
                const programmesToAdd = Array.isArray(data) ? data : [data];
                setProgrammes((prev) => [...prev, ...programmesToAdd]);
                setProgrammeData({});
                setError(null);
            })
            .catch((error) => setError(`Failed to add programme: ${error.message}`));
    };

    const putProgramme = () => {
        // Format the registration date
        const formattedProgrammeData = {
            ...programmeData,
            registrationDate: programmeData.registrationDate ? formatDateToRFC3339(programmeData.registrationDate) : undefined
        };

        // Log the formatted date to check correctness
        console.log('Formatted Date:', formattedProgrammeData.registrationDate);

        // Send the PUT request
        fetch(`http://localhost:9090/programmes/${programmeData.programmeCode}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formattedProgrammeData),
        })
            .then((response) => response.json())
            .then((data) => {
                setProgrammes((prevProgrammes) =>
                    prevProgrammes.map((programme) =>
                        programme.programmeCode === data.programmeCode ? data : programme
                    )
                );
                setProgrammeData({});
                setError(null);
            })
            .catch((error) => setError(`Failed to update programme: ${error.message}`));
    };


    const handleEditProgramme = (programmeCode: string) => {
        const programmeToEdit = programmes.find(
            (programme) => programme.programmeCode === programmeCode
        );
        if (programmeToEdit) {
            setProgrammeData(programmeToEdit); // Pre-fill the form with existing programme data
            setSelectMode("update");
        }
    };

    const deleteProgramme = (programmeCode: string) => {
        fetch(`http://localhost:9090/programmes/${programmeCode}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    setProgrammes((prevProgrammes) =>
                        prevProgrammes.filter((programme) => programme.programmeCode !== programmeCode)
                    );
                    setError(null);
                } else {
                    response.text().then((text) => {
                         alert(`Error ${response.status}: ${text}`);
                    });
                }
            })
            .catch((error) => setError(`Failed to delete programme: ${error.message}`));
    };

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
                <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg flex flex-col items-center">
                    <div className="flex items-center justify-center mb-12">
                        <Image
                            src="https://i.imgur.com/V6426wB.png"
                            alt="NUST Logo"
                            width={100}
                            height={100}
                            className="rounded-lg"
                        />
                        <h1 className="text-4xl font-extrabold text-gray-800 mr-8">
                            Programme Management
                        </h1>
                    </div>

                    {/* Fetch and Add Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        {["All", "programmeCode", "faculty"].map((mode) => (
                            <button
                                key={mode}
                                onClick={() => {
                                    setSelectMode(mode);
                                    if (mode === "All") fetchProgrammes("");
                                }}
                                className={`py-2 px-4 rounded-lg shadow-md transition duration-300 ${
                                    selectMode === mode ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                                }`}
                            >
                                {mode === "All" ? "Fetch All Programmes" : `Fetch By ${mode}`}
                            </button>
                        ))}
                        <button
                            onClick={() => fetchDueForReview()}
                            className={`py-2 px-4 rounded-lg shadow-md transition duration-300 ${
                                selectMode === "dueForReview" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                            }`}
                        >
                            Fetch Due for Review
                        </button>
                        <button
                            onClick={() => setSelectMode("add")}
                            className={`py-2 px-4 rounded-lg shadow-md transition duration-300 ${
                                selectMode === "add" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                            }`}
                        >
                            Add Programme
                        </button>
                    </div>

                    {selectMode !== "All" && selectMode !== "add" && (
                        <div className="flex items-center space-x-4 w-full mb-6">
                            <div className="flex-1">
                                <InputForm
                                    label={`Enter ${selectMode}`}
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={`Enter ${selectMode}`}
                                />
                            </div>
                            <button
                                onClick={submitFetch}
                                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            >
                                Submit
                            </button>
                        </div>
                    )}

                    {/* Add/Update Programme Form */}
                    {["add", "update"].includes(selectMode!) && (
                        <ProgrammeForm
                            programmeData={programmeData}
                            setProgrammeData={setProgrammeData}
                            handleSubmit={selectMode === "add" ? postProgramme : putProgramme}
                            isAddMode={selectMode === "add"}
                        />
                    )}

                    {/* Display fetched programmes with edit option */}
                    <ProgrammeList
                        programmes={programmes}
                        onEditProgramme={handleEditProgramme}
                        onDeleteProgramme={deleteProgramme} // Pass the delete function
                    />

                    {/* Display errors */}
                    <ErrorDisplay error={error}/>
                </div>
            </main>
        </>
    );
}
