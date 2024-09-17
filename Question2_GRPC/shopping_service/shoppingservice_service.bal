import ballerina/grpc;
import ballerina/log;
import ballerina/time;

public function main() {
    log:printInfo("Shopping Service starting on port 9090");
}

@grpc:Descriptor {value: SHOPPING_SYSTEM_DESC}
service "ShoppingService" on new grpc:Listener(9090) {

    remote function AddProduct(AddProductRequest value) returns AddProductResponse|error {
        log:printInfo("Received request to add product with SKU: " + value.sku);

        // Check if product already exists using table's key
        Product? existingProduct = ProductTable[value.sku];
        if (existingProduct is Product) {
            log:printWarn("Product with SKU " + value.sku + " already exists");
            return error("Product with SKU already exists.");
        }

        // Insert new product into the table
        ProductTable.put({
            name: value.name,
            description: value.description,
            price: value.price,
            stock_quantity: value.stock_quantity,
            sku: value.sku,
            status: value.status
        });

        log:printInfo("Successfully added product with SKU: " + value.sku);
        return {product_code: value.sku};
    }

    remote function UpdateProduct(UpdateProductRequest value) returns UpdateProductResponse|error {
        log:printInfo(string `Received request to update product with SKU: ${value.sku}`);

        // Check if the product exists
        Product? existingProduct = ProductTable[value.sku];

        if (existingProduct is Product) {
            log:printInfo(string `Updating product with SKU: ${value.sku}`);
            // Update product details
            ProductTable.put({
                name: value.name,
                description: value.description,
                price: value.price,
                stock_quantity: value.stock_quantity,
                sku: value.sku,
                status: value.status
            });

            log:printInfo(string `Product with SKU: ${value.sku} updated successfully`);
            // Return a successful response
            return {status: "Product updated successfully"};
        } else {
            log:printError(string `Product with SKU: ${value.sku} does not exist. Update failed.`);
            // Return an error if the product does not exist
            return error(string `Product with SKU ${value.sku} does not exist.`);
        }
    }

    remote function RemoveProduct(RemoveProductRequest value) returns RemoveProductResponse|error {
        log:printInfo(string `Received request to remove product with SKU: ${value.sku}`);

        // Check if the product exists
        Product? existingProduct = ProductTable[value.sku];

        if (existingProduct is Product) {
            log:printInfo(string `Removing product with SKU: ${value.sku}`);
            // Remove the product from the table
            _ = ProductTable.remove(value.sku);

            log:printInfo("Creating list of remaining products");
            // Create a list of remaining products
            Product[] remainingProducts = [];
            foreach Product product in ProductTable {
                remainingProducts.push(product);
            }

            log:printInfo(string `Product with SKU: ${value.sku} removed successfully. ${remainingProducts.length()} products remaining.`);
            // Create and return the response with the updated list of products
            RemoveProductResponse response = {
                products: remainingProducts
            };
            return response;
        } else {
            log:printError(string `Product with SKU: ${value.sku} does not exist. Removal failed.`);
            // Return an error if the product does not exist
            return error(string `Product with SKU ${value.sku} does not exist.`);
        }
    }

    remote function ListAvailableProducts(ListAvailableProductsRequest value) returns ListAvailableProductsResponse|error {
        log:printInfo("Received request for ListAvailableProducts");

        // List to hold available products
        Product[] availableProducts = [];

        // Iterate over the ProductTable to find available products
        foreach Product product in ProductTable {
            if (product.status == "available") {
                availableProducts.push(product);
            }
        }

        log:printInfo("Returning " + availableProducts.length().toString() + " available products");

        // Return the available products in the response
        return {products: availableProducts};
    }

    remote function SearchProduct(SearchProductRequest value) returns SearchProductResponse|error {
        log:printInfo("Received request to search for product with SKU: " + value.sku);

        // Retrieve the product using SKU from the ProductTable
        Product? product = ProductTable[value.sku];

        if (product is Product) {
            log:printInfo("Found product with SKU: " + value.sku);
            // Create and return the response with the product details
            SearchProductResponse response = {
                product: product
            };
            return response;
        } else {
            log:printError("Product with SKU " + value.sku + " not found");
            // Return an error if the product does not exist
            return error("Product with SKU " + value.sku + " not found.");
        }
    }

    remote function AddToCart(AddToCartRequest value) returns AddToCartResponse|error {
        log:printInfo(string `Received request to add item to cart. User ID: ${value.user_id}, SKU: ${value.sku}`);

        // Create a CartItem record with immutable key
        CartItem item = {user_id: value.user_id, sku: value.sku};

        // Check if the product exists before adding to cart
        Product? product = ProductTable[value.sku];
        if (product is Product) {
            log:printInfo(string `Adding item with SKU: ${value.sku} to cart for User ID: ${value.user_id}`);

            // Add the item to the CartTable
            CartTable.put(item);

            log:printInfo(string `Item with SKU: ${value.sku} successfully added to cart for User ID: ${value.user_id}`);

            // Return success status
            return {status: "Item added to cart"};
        } else {
            log:printError(string `Failed to add item to cart. Product with SKU: ${value.sku} does not exist.`);
            return error(string `Product with SKU ${value.sku} does not exist.`);
        }
    }

    // Function to remove an item from the cart
    // Remote function to remove an item from the cart
    remote function RemoveFromCart(RemoveFromCartRequest value) returns RemoveFromCartResponse|error {
    log:printInfo(string `Received request to remove item from cart SKU: ${value.sku}`);

    // Try to retrieve the item with the given sku
    CartItem? itemToRemove = CartTable[value.sku];

    if (itemToRemove is CartItem) {
        log:printInfo(string `Item with SKU: ${value.sku} found in cart Proceeding to remove.`);

        // If the item exists, remove it from the CartTable
        _ = CartTable.remove(value.sku);

        log:printInfo(string `Item with SKU: ${value.sku} successfully removed from cart`);

        // Return success status
        return {status: "Item removed from cart"};
    } else {
        log:printError(string `Failed to remove item from cart. Item with SKU: ${value.sku} not found in cart`);
        
        // Return failure status if the item does not exist
        return {status: "Item not found in cart"};
    }
}


    // Remote function to view the cart for a specific user
    // Define the ViewCart function
    remote function ViewCart(ViewCartRequest value) returns ViewCartResponse|error {
    log:printInfo(string `Received request to view cart. User ID: ${value.user_id}`);

    // List to hold products in the cart
    Product[] productsInCart = [];

    // Iterate over the CartTable to find items for the given user_id
    foreach CartItem item in CartTable {
        if (item.user_id == value.user_id) {
            log:printInfo(string `Found item with SKU: ${item.sku} in cart for User ID: ${value.user_id}. Checking product availability.`);

            // Check if the product exists in the ProductTable
            Product? product = ProductTable[item.sku];

            if (product is Product) {
                log:printInfo(string `Product with SKU: ${item.sku} found in ProductTable. Adding to cart view.`);

                // Add the product to the list if found
                productsInCart.push(product);
            } else {
                log:printWarn(string `Product with SKU: ${item.sku} not found in ProductTable for User ID: ${value.user_id}.`);
            }
        }
    }

    log:printInfo(string `Completed viewing cart for User ID: ${value.user_id}. Total items in cart: ${productsInCart.length}`);

    // Return the products in the cart
    return {products: productsInCart};
}


    // Remote function to place an order
    remote function PlaceOrder(PlaceOrderRequest value) returns PlaceOrderResponse|error {
        // Generate a unique order ID
        string orderId = generateOrderId();

        // Create a list to hold products for the order
        Product[] orderedProducts = [];

        // Iterate over CartTable to find items for the given user_id
        foreach CartItem item in CartTable {
            if (item.user_id == value.user_id) {
                // Check if the product exists in ProductTable
                Product? product = ProductTable[item.sku];

                if (product is Product) {
                    // Add the product to the list if found
                    orderedProducts.push(product);

                    // Optionally, remove the item from the CartTable
                    _ = CartTable.remove(item.sku);
                }
            }
        }

        // Check if any products were ordered
        if (orderedProducts.length() == 0) {
            return error("No items found in the cart for user_id: " + value.user_id);
        }

        // Return the order ID and status
        return {order_id: orderId, status: "Order placed successfully"};
    }

    remote function CheckUserType(CheckUserTypeRequest value) returns CheckUserTypeResponse|error {
        // Retrieve the user record from UserTable using the user_id
        User? user = UserTable[value.user_id];

        // Check if the user was found
        if (user is User) {
            // Return the user_type from the user record
            return {user_type: user.user_type};
        } else {
            // Return an error if the user was not found
            return error("User with ID " + value.user_id + " not found");
        }
    }

    // Remote function to create users from a stream of CreateUserRequest messages
    remote function CreateUsers(stream<CreateUserRequest, grpc:Error?> clientStream) returns CreateUsersResponse|error {
        int successCount = 0;
        int failureCount = 0;

        // Iterate over the incoming stream of CreateUserRequest messages
        error? result = from CreateUserRequest req in clientStream
            do {
                // Check if user_id already exists
                if (UserTable[req.user_id] is User) {
                    // Log a message or increment failure count if user already exists
                    log:printInfo("User with user_id " + req.user_id + " already exists. Skipping.");
                    failureCount += 1;
                } else {
                    // Create a new User record
                    User newUser = {
                        user_id: req.user_id,
                        user_name: req.user_name,
                        email: req.email,
                        password: req.password,
                        user_type: req.user_type
                    };

                    // Add the new user to the UserTable
                    UserTable.add(newUser);
                    successCount += 1;
                }
            };

        if (result is error) {
            // Handle errors during stream processing
            log:printError("Error occurred while processing the stream.", 'error = result);
        }

        // Create response message based on success and failure counts
        string status = "Users processed successfully. Success: " + successCount.toString() + ", Failure: " + failureCount.toString();
        return {status: status};
    }

}

// Function to generate a unique order ID
function generateOrderId() returns string {
    time:Utc currentUtc = time:utcNow(); // Get current UTC time
    string orderId = "ORD-" + time:utcToString(currentUtc); // Generate unique ID using UTC time
    return orderId;
}
