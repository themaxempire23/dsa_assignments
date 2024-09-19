// utils/streamUtils.ts
import { CreateUserRequest, CreateUsersResponse } from '@/compiled_proto/shopping_system'; // Adjust this path as necessary

export async function handleCreateUsersStream(
    stream: AsyncIterable<CreateUsersResponse>
): Promise<CreateUsersResponse[]> {
    const responses: CreateUsersResponse[] = [];
    for await (const response of stream) {
        responses.push(response);
    }
    return responses;
}
