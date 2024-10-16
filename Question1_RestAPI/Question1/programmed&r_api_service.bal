
// This file is auto-generated in the year 7076 by computer overlords

import ballerina/http;
import ballerina/log;
import ballerina/time;

// import ballerina/time;

listener http:Listener ep0 = new (9090, config = {host: "localhost"});

const SECONDS_IN_A_YEAR = 31536000; // Approximate number of seconds 
                                    //in a year why? why not!!!

// Service-level CORS configuration
@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"], // Allow all origins or specify your allowed origins
        allowCredentials: false,
        allowHeaders: ["Content-Type", "Authorization"],
        exposeHeaders: ["X-Custom-Header"],
        maxAge: 3600
    }
}

service / on ep0 {
    resource function options programme() returns http:Response {
        // Create a response object with status code 204 and appropriate CORS headers
        http:Response response = new;

        response.statusCode = 204; // No Content
        response.reasonPhrase = "No Content";

        // Add CORS headers using appropriate methods
        response.addHeader("Access-Control-Allow-Origin", "*"); // or specify allowed origins
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.addHeader("Access-Control-Max-Age", "3600");

        return response;
    }

    // # Delete a programme's record by programme code
    resource function delete programmes/[string programmeCode]() returns http:NoContent|http:NotFound {
        log:printInfo("Received request to delete programme with code: " + programmeCode);

        // Check if the programme exists
        Programme? existingProgramme = ProgrammeTable[programmeCode];

        if (existingProgramme is ()) {
            // Log programme not found
            log:printWarn("Programme with code " + programmeCode + " not found");

            // Programme not found, return NotFound
            return {
                body: {
                    errmsg: string `Programme with code ${programmeCode} not found`
                }
            };
        }

        // Log programme deletion process
        log:printInfo("Deleting programme with code: " + programmeCode);

        // Remove the programme from the table
        _ = ProgrammeTable.remove(programmeCode);

        // Log successful deletion
        log:printInfo("Programme with code " + programmeCode + " deleted successfully");

        // Return NoContent status code
        return {
            body: {
                errmsg: string `Programme with code ${programmeCode} deleted successfully`
            }
        };
    }

    // # Retrieve a list of all programmes
    resource function get programmes() returns Programme[]|http:InternalServerError {
    log:printInfo("Received request to retrieve all programmes");

    // Attempt to retrieve the programmes from the table
    Programme[] programmes = ProgrammeTable.toArray();

    if (programmes.length() == 0) {
        // Log if no programmes were found
        log:printWarn("No programmes found in the ProgrammeTable");
    } else {
        // Log the number of programmes retrieved
        log:printInfo("Returning " + programmes.length().toString() + " programmes");
    }

    // Return the retrieved programmes
    return programmes;
}


    // # Retrieve a specific programme by programme code
    resource function get programmes/[string programmeCode]() returns Programme|http:NotFound {
    log:printInfo("Received request to retrieve programme with code: " + programmeCode);

    // Attempt to retrieve the programme from the table
    Programme? programme = ProgrammeTable[programmeCode];

    if (programme is ()) {
        // Log if the programme is not found
        log:printWarn("Invalid programme code: " + programmeCode + ". Programme not found");

        // Return NotFound with an error message
        return {
            body: {
                errmsg: string `Invalid programme code: ${programmeCode}`
            }
        };
    }

    // Log successful retrieval of the programme
    log:printInfo("Programme with code " + programmeCode + " retrieved successfully");

    // Return the programme
    return programme;
}


    // # Retrieve all programmes that belong to the same faculty
    resource function get programmes/faculty/[string facultyName]() returns Programme[]|http:NotFound {
    log:printInfo("Received request to retrieve programmes for faculty: " + facultyName);

    // List to hold found programmes
    Programme[] foundProgrammes = [];

    // Iterate over the ProgrammeTable to find programmes that match the faculty name
    foreach var programme in ProgrammeTable {
        // Log each programme being checked
        log:printDebug("Checking programme:  for faculty: " + facultyName);
        
        // Use member access to safely check if faculty is present and matches
        if (programme.faculty is string && programme.faculty == facultyName) {
            log:printInfo("Found matching programme: ");
            foundProgrammes.push(programme);
        }
    }

    if (foundProgrammes.length() == 0) {
        // Log if no programmes were found for the given faculty
        log:printWarn("No programmes found for the faculty: " + facultyName);
        
        // Return NotFound with an error message
        return {
            body: {
                errmsg: string `No programmes found for the faculty: ${facultyName}`
            }
        };
    }

    // Log the number of programmes found
    log:printInfo("Returning " + foundProgrammes.length().toString() + " programmes for faculty: " + facultyName);

    // Return the found programmes
    return foundProgrammes;
}


    // # Retrieve all programmes that are due for review
    resource function get programmes/review/due() returns Programme[]|http:NotFound {
    log:printInfo("Received request to retrieve programmes due for review");

    // Get the current UTC time
    time:Utc currentUtc = time:utcNow();
    log:printInfo("Current UTC time: " + currentUtc.toString());

    // Create a list to store programmes due for review
    Programme[] dueForReview = [];

    // Define the number of seconds in 5 years (including leap years)
    int secondsInFiveYearsInt = 5 * 365 * 24 * 60 * 60 + 2 * 24 * 60 * 60; // Approximation for leap years

    // Cast the int seconds to time:Seconds
    time:Seconds secondsInFiveYears = <time:Seconds>secondsInFiveYearsInt;

    // Iterate through the ProgrammeTable to check each programme
    foreach Programme programme in ProgrammeTable {
        log:printDebug("Checking programme: " + programme.title);

        // Ensure the registrationDate is present and valid
        if (programme.registrationDate is string) {
            // Convert the registrationDate string to time:Utc
            time:Utc|time:Error registrationUtc = time:utcFromString(programme.registrationDate);

            // Handle the case where conversion fails
            if (registrationUtc is time:Error) {
                // Log the error and skip this entry
                log:printError("Error converting registration date for programme: " + programme.title, registrationUtc);
                continue; // Skip this entry and move to the next one
            }

            // Log successful registration date conversion
            log:printDebug("Converted registration date for programme: " + programme.title + " to UTC: " + registrationUtc.toString());

            // Calculate the time when the programme would be due for review
            time:Utc reviewDueUtc = time:utcAddSeconds(registrationUtc, secondsInFiveYears);

            // Log the calculated review due date
            log:printDebug("Review due date for programme: " + programme.title + " is: " + reviewDueUtc.toString());

            // Check if the current UTC time is past the review due time
            if (currentUtc >= reviewDueUtc) {
                log:printInfo("Programme " + programme.title + " is due for review.");
                dueForReview.push(programme);
            }
        } else {
            // Log if the registrationDate is missing
            
        }
    }

    // Check if any programmes are due for review
    if (dueForReview.length() == 0) {
        log:printWarn("No programmes are due for review");
        return {
            body: {
                errmsg: "No programmes are due for review."
            }
        };
    }

    log:printInfo("Returning " + dueForReview.length().toString() + " programmes due for review");

    return dueForReview;
}


    // # Add a new programme
    resource function post programmes(@http:Payload Programme[] programmes) returns Programme[]|error {
    log:printInfo("Received request to add programmes");

    string[] conflictingProgrammeCodes = from Programme programme in programmes
        where ProgrammeTable.hasKey(programme.programmeCode)
        select programme.programmeCode;

    if (conflictingProgrammeCodes.length() > 0) {
        // Log the conflicting programme codes
        log:printWarn("Conflicting programme codes found: " + conflictingProgrammeCodes.toString());

        // Manually concatenate the conflicting programme codes
        string errorMsg = "CONFLICTING PROGRAMME CODES: ";
        foreach string code in conflictingProgrammeCodes {
            errorMsg += code + " ";
        }
        // Trim the trailing space
        errorMsg = errorMsg.trim();

        // Log the error message before returning
        log:printError(errorMsg);
        
        return error(errorMsg);
    } else {
        foreach Programme programme in programmes {
            log:printInfo("Adding programme: " + programme.programmeCode);
            ProgrammeTable.add(programme);
        }

        log:printInfo("Successfully added " + programmes.length().toString() + " programmes");
        return programmes;
    }
}


    // # Update an existing programme's information
    resource function put programmes/[string programmeCode](@http:Payload Programme payload) returns Programme|InvalidProgrammeCodeError {
    log:printInfo("Received request to update programme with code: " + programmeCode);

    Programme? existingProgramme = ProgrammeTable[programmeCode];

    if (existingProgramme is ()) {
        log:printWarn("Invalid programme code: " + programmeCode);
        return {
            body: {
                errmsg: "Invalid programme code: " + programmeCode
            }
        };
    }

    log:printInfo("Updating programme: " + existingProgramme.programmeCode);

    Programme updatedProgramme = {
        programmeCode: existingProgramme.programmeCode, // Use the existing programmeCode
        nqfLevel: payload.nqfLevel,
        faculty: payload.faculty,
        department: payload.department,
        title: payload.title,
        registrationDate: payload.registrationDate,
        courses: payload.courses
    };

    // Log the details of the updated programme
    log:printDebug("Updated programme details: " + updatedProgramme.toString());

    _ = ProgrammeTable.remove(programmeCode);
    ProgrammeTable.add(updatedProgramme);

    log:printInfo("Successfully updated programme: " + updatedProgramme.programmeCode);

    return updatedProgramme;
}


}
