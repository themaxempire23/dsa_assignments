# Distributed Systems Assignment - Programme Management

This project is part of the Distributed Systems Assignment (Assignment 1). It includes a web-based GUI and CLI client
for managing programmes.

## Group Members

- [Frans Nekongo- 221004351]
- [Max Haikali- 221128220]
- [Abisai Sem - 221084703]
- [Nokutenda Ray Katananga - 221113657]

## Assignment 1

### Question 1: REST API

This section contains a web-based GUI for managing programmes. It interacts with a backend service running on
`localhost:9090` to perform CRUD operations on programme records.

**Features:**

- Fetch all programmes or filter by programme code or faculty.
- Fetch programmes due for review.
- Add, update, or delete programme records.
- Display programme information in an intuitive UI.

**Getting Started:**

1. Run the backend service on port 9090.
2. Start the development server for the web interface:

   ```bash
   npm run dev
   ```



**Backend API:**
The web interface communicates with the backend service at [http://localhost:9090](http://localhost:9090).

**Usage:**

- **Fetching Programmes:** Use buttons to fetch all or filter by `programmeCode` or `faculty`.
- **Add a Programme:** Click "Add Programme," fill in the form, and submit.
- **Update a Programme:** Click "Edit," modify the form, and submit.
- **Delete a Programme:** Click "Delete" next to a programme to remove it.

### Running the Service and Client

1. **Run the Service:**
   Execute the following command to start the service:

   ```bash
   bal run ../{path to service folder}
   ```

2. **Run the Client:**
   After starting the service, run the GUI or CLI client with:
   ```bash
   bal run client.bal
   ```

3. **Use Web Client:**
   use the gui:
   ```bash
   https://tinyurl.com/RestApiDSA1
   ```

**Programme Data:**
Dates are formatted as RFC 3339 when adding or updating programmes.


### Question 2: gRPC - Online Shopping System

This section contains instructions for running and interacting with the **Online Shopping System** using gRPC.

#### Running the gRPC Service

1. **Start the gRPC Shopping Service:**
   Navigate to the folder containing the Ballerina shopping service and execute the following command to start the service:

   ```bash
   bal run ../shopping_service
   ```

This will start the gRPC server responsible for managing shopping-related functionalities such as fetching products, managing cart items, and processing orders.

### Running Envoy Proxy

**Run Envoy:** In a separate terminal, navigate to the folder where your Envoy configuration is located, and execute the following command to start the Envoy proxy:

```bash
envoy --config-path envoy.yaml


```
The Envoy proxy will act as a bridge to allow gRPC-web clients to communicate with the gRPC backend service.

### Accessing the gRPC Web Client

**Access the gRPC Client:** Once both the shopping service and Envoy are running, you can access the **Online Shopping System** via the gRPC web client at the following URL:

[https://tinyurl.com/gRPCDSA1](https://tinyurl.com/gRPCDSA1)

**Login credentials:**

- Username: `user1`
- Username: `admin1`
