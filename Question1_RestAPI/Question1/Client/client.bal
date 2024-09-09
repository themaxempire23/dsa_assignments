import ballerina/http;
import ballerina/io;

http:Client programmeClient = check new("http://localhost:9090/programmes");

function displayMenuOptions() {
    io:println("Please select an option:");
    io:println("1. Add a new programme");
    io:println("2. Retrieve all programmes");
    io:println("3. Retrieve programme by code");
    io:println("4. Update a programme");
    io:println("5. Delete a programme");
    io:println("6. Retrieve programmes due for review");
    io:println("7. Retrieve programmes by faculty");
    io:println("0. Exit");
}

public function main() returns error? {
    io:println("Welcome to the Programme Management CLI!");

    while (true) {
        displayMenuOptions();
        string option = io:readln("Enter your option: ");

        match option {
            "1" => {
                error|http:Response result = addProgramme();
                if result is error {
                    io:println("Error adding programme");
                } else {
                    io:println("Programme added successfully");
                }
            }

            "2" => {
                error|http:Response result = getAllProgrammes();
                if result is error {
                    io:println("Error retrieving programmes");
                } else {
                    io:println("All Programmes: ");
                    io:println(result.getJsonPayload());
                }
            }

            "3" => {
                error|http:Response result = getProgrammeByCode();
                if result is error {
                    io:println("Error retrieving programme");
                } else {
                    io:println("Programme Details: ");
                    io:println(result.getJsonPayload());
                }
            }

            "4" => {
                error|http:Response result = updateProgramme();
                if result is error {
                    io:println("Error updating programme");
                } else {
                    io:println("Programme updated successfully");
                }
            }

            "5" => {
                error|http:Response result = deleteProgramme();
                if result is error {
                    io:println("Error deleting programme");
                } else {
                    io:println("Programme deleted successfully");
                }
            }

            "6" => {
                error|http:Response result = getProgrammesDueForReview();
                if result is error {
                    io:println("Error retrieving programmes due for review");
                } else {
                    io:println("Programmes Due for Review: ");
                    io:println(result.getJsonPayload());
                }
            }

            "7" => {
                error|http:Response result = getProgrammesByFaculty();
                if result is error {
                    io:println("Error retrieving programmes by faculty");
                } else {
                    io:println("Programmes by Faculty: ");
                    io:println(result.getJsonPayload());
                }
            }

            "0" => {
                // Exit the CLI
                break;
            }

            _ => {
                io:println("Invalid option");
            }
        }
    }
}

function addProgramme() returns error|http:Response {
    string programmeCode = check io:readln("Enter programme code: ");
    string programmeName = check io:readln("Enter programme name: ");
    string registrationDate = check io:readln("Enter registration date (YYYY-MM-DD): ");
    string faculty = check io:readln("Enter faculty: ");

    map<string> programme = {
        programmeCode: programmeCode,
        programmeName: programmeName,
        registrationDate: registrationDate,
        faculty: faculty
    };

    http:Request request = new;
    json jsonBody = programme.toJson();
    request.setPayload(jsonBody, "application/json");
    return programmeClient->post("/", request);
}

function getAllProgrammes() returns http:Response|error {
    return programmeClient->get("/");
}

function getProgrammeByCode() returns error|http:Response {
    string programmeCode = io:readln("Enter programme code: ");
    // Ensure there's a slash between "/programmes" and the programme code
    return programmeClient->get("/" + programmeCode);
}


function updateProgramme() returns error|http:Response {
    string programmeCode = check io:readln("Enter programme code: ");
    string programmeName = check io:readln("Enter programme name: ");
    string registrationDate = check io:readln("Enter registration date (YYYY-MM-DD): ");
    string faculty = check io:readln("Enter faculty: ");

    map<string> programme = {
        programmeCode: programmeCode,
        programmeName: programmeName,
        registrationDate: registrationDate,
        faculty: faculty
    };

    http:Request request = new;
    json jsonBody = programme.toJson();
    request.setPayload(jsonBody, "application/json");
    return programmeClient->put(programmeCode, request);
}

function deleteProgramme() returns error|http:Response {
    string programmeCode = io:readln("Enter programme code: ");
    return programmeClient->delete("/" + programmeCode);
}


function getProgrammesDueForReview() returns http:Response|error {
    return programmeClient->get("/review/due");
}

function getProgrammesByFaculty() returns error|http:Response {
    string facultyName = io:readln("Enter faculty name: ");
    return programmeClient->get("/faculty/" + facultyName);
}
