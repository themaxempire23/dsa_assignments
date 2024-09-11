// types.ts

export interface Course {
    // The name of the course
    courseName: string;
    // The code of the course
    courseCode: string;
    // The NQF level of the course
    nqfLevel: number;
}

export interface Programme {
    // The unique identifier for a programme
    programmeCode: string;
    // The NQF level of the programme
    nqfLevel: number;
    // The name of the faculty to which the programme belongs
    faculty: string;
    // The name of the department to which the programme belongs
    department: string;
    // The title of the programme or qualification
    title: string;
    // The registration date of the programme
    registrationDate: string;
    // A list of courses that the programme comprises
    courses: Course[];
}
