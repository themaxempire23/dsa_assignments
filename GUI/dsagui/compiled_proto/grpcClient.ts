// grpcClient.ts
import { createChannel, createClient } from 'nice-grpc-web';
import { ShoppingServiceClient, ShoppingServiceDefinition } from './shopping_system';

const channel = createChannel('http://localhost:8080'); // Replace with your server address
const client = createClient(ShoppingServiceDefinition, channel);

export { client };
