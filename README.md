# Distributed Systems - Programme Management Web GUI

This is a web-based GUI for managing programmes, developed as part of a distributed systems assignment. The application interacts with a backend service running on `localhost:9090` to fetch, add, update, and delete programme records.

## Features

- Fetch all programmes or filter them by programme code or faculty.
- Fetch programmes due for review.
- Add, update, or delete programme records.
- Display programme information in a clean, intuitive UI.

## Getting Started

First, run the backend service on port 9090. Then, start the development server for the web interface.

### Running the Web GUI

You can use any of the following commands to run the development server:

```bash
npm run dev
```
Once started, open [http://localhost:3000](http://localhost:3000) in your browser.

## Backend API

The web interface communicates with a backend running at [http://localhost:9090](http://localhost:9090). {//Palema advised change this to ip, try NGROK}

## Project Structure

The application is built using Next.js, React, and Tailwind CSS. Key components include:

- **ProgrammeForm**: Handles the form for adding or updating a programme.
- **ProgrammeList**: Displays a list of programmes with options to edit or delete.
- **ErrorDisplay**: Shows error messages in case of failed operations.
- **InputForm**: Allows the user to input programme details or search by filters.

## How to Use

- **Fetching Programmes**: Use the buttons to fetch all programmes or filter by `programmeCode` or `faculty`.
- **Add a Programme**: Click "Add Programme," fill in the form, and submit.
- **Update a Programme**: Click the "Edit" button next to a programme, make changes in the form, and submit.
- **Delete a Programme**: Click the "Delete" button next to a programme to remove it.

## Programme Data

When adding or updating a programme, the registration date is automatically formatted as RFC 3339 before being sent to the server.

