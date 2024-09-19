// // components/CreateUsers.tsx
// import { useState } from 'react';
// import { client } from '@/compiled_proto/grpcClient'; // Adjust this path as necessary
// import { CreateUserRequest, CreateUsersResponse } from '@/compiled_proto/shopping_system'; // Adjust this path as necessary
// import { handleCreateUsersStream } from '@/public/components/streamUtils'; // Adjust this path as necessary
//
// export default function CreateUsers() {
//     const [userId, setUserId] = useState('');
//     const [userType, setUserType] = useState('');
//     const [userName, setUserName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [response, setResponse] = useState<CreateUsersResponse | null>(null);
//     const [error, setError] = useState<string | null>(null);
//
//     // Create an AsyncIterable from the CreateUserRequest
//     const createUserAsyncIterable = async function* (request: CreateUserRequest): AsyncIterable<CreateUserRequest> {
//         yield request;
//     };
//
//     const handleSubmit = async () => {
//         try {
//             const request: CreateUserRequest = { userId, userType, userName, email, password };
//             // Convert the request into an AsyncIterable
//             const asyncIterable = createUserAsyncIterable(request);
//             const stream = client.createUsers(asyncIterable);
//
//             // Handle the streaming responses
//             const collectedResponses = await handleCreateUsersStream(stream);
//
//             // Process the responses (e.g., use the last response or aggregate data)
//             if (collectedResponses.length > 0) {
//                 setResponse(collectedResponses[collectedResponses.length - 1]);
//             }
//         } catch (err) {
//             setError('Failed to create user');
//         }
//     };
//
//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4">Create User</h1>
//             <div className="mb-2">
//                 <label className="block mb-1">User ID</label>
//                 <input
//                     type="text"
//                     value={userId}
//                     onChange={(e) => setUserId(e.target.value)}
//                     placeholder="User ID"
//                     className="border p-2 w-full"
//                 />
//             </div>
//             <div className="mb-2">
//                 <label className="block mb-1">User Type</label>
//                 <input
//                     type="text"
//                     value={userType}
//                     onChange={(e) => setUserType(e.target.value)}
//                     placeholder="User Type"
//                     className="border p-2 w-full"
//                 />
//             </div>
//             <div className="mb-2">
//                 <label className="block mb-1">User Name</label>
//                 <input
//                     type="text"
//                     value={userName}
//                     onChange={(e) => setUserName(e.target.value)}
//                     placeholder="User Name"
//                     className="border p-2 w-full"
//                 />
//             </div>
//             <div className="mb-2">
//                 <label className="block mb-1">Email</label>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     className="border p-2 w-full"
//                 />
//             </div>
//             <div className="mb-2">
//                 <label className="block mb-1">Password</label>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     className="border p-2 w-full"
//                 />
//             </div>
//             <button
//                 onClick={handleSubmit}
//                 className="bg-blue-500 text-white p-2 rounded"
//             >
//                 Create User
//             </button>
//             {response && <p className="text-green-500 mt-4">Status: {response.status}</p>}
//             {error && <p className="text-red-500 mt-4">{error}</p>}
//         </div>
//     );
// }
