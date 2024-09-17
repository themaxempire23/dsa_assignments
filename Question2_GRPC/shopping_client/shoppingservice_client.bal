import ballerina/io;
// import ballerina/lang.runtime;

ShoppingServiceClient ep = check new ("http://localhost:9090");

function displayMenuOptions() {
    io:println("Please select an option:");
    io:println("1. Add a product");
    io:println("2. Update a product");
    io:println("3. Remove a product");
    io:println("4. List available products");
    io:println("5. Search product by SKU");
    io:println("6. Add to cart");
    io:println("7. Remove from cart");
    io:println("8. View cart");
    io:println("9. Place order");
    io:println("10. Check user type");
    io:println("11. Create users");
    io:println("0. Exit");
}

public function main() returns error? {
    io:println("Welcome to the Shopping System CLI!");
    
    while true {
        displayMenuOptions();
        string option = io:readln("Enter your option: ");
        
        if option == "1" {
            check addProduct();
        } else if option == "2" {
            check updateProduct();
        } else if option == "3" {
            check removeProduct();
        } else if option == "4" {
            check listAvailableProducts();
        } else if option == "5" {
          check  searchProduct();
        } else if option == "6" {
           check addToCart();
        } else if option == "7" {
           check removeFromCart();
        } else if option == "8" {
          check  viewCart();
        } else if option == "9" {
           check placeOrder();
        } else if option == "10" {
           check checkUserType();
        } else if option == "11" {
           check createUsers();
        } else if option == "0" {
            io:println("Exiting...");
            break;
        } else {
            io:println("Invalid option. Please try again.");
        }
    }
}

// Functions to handle each option
function addProduct() returns error? {
    AddProductRequest addProductRequest = {
        name: io:readln("Enter product name: "),
        description: io:readln("Enter product description: "),
        price: check 'float:fromString(io:readln("Enter price: ")),
        stock_quantity: check 'int:fromString(io:readln("Enter stock quantity: ")),
        sku: io:readln("Enter SKU: "),
        status: io:readln("Enter status (available/unavailable): ")
    };
    
    // Explicitly specify the type of response
    AddProductResponse response = check ep->AddProduct(addProductRequest);
    io:println("Product added with SKU: ", response.product_code);
}


function updateProduct() returns error? {
    UpdateProductRequest updateProductRequest = {
        sku: io:readln("Enter product SKU: "),
        name: io:readln("Enter new product name: "),
        description: io:readln("Enter new description: "),
        price: check 'float:fromString(io:readln("Enter new price: ")),
        stock_quantity: check 'int:fromString(io:readln("Enter new stock quantity: ")),
        status: io:readln("Enter new status: ")
    };
    UpdateProductResponse response = check ep->UpdateProduct(updateProductRequest);
    io:println(response.status);
}

function removeProduct() returns error? {
    RemoveProductRequest request = {sku: io:readln("Enter product SKU to remove: ")};
    RemoveProductResponse response = check ep->RemoveProduct(request);
    io:println("Remaining products: ", response.products);
}

function listAvailableProducts() returns error? {
    ListAvailableProductsResponse response = check ep->ListAvailableProducts({});
    io:println("Available products: ", response.products);
}

function searchProduct() returns error? {
    SearchProductRequest request = {sku: io:readln("Enter product SKU to search: ")};
    SearchProductResponse response = check ep->SearchProduct(request);
    io:println("Product details: ", response.product);
}

function addToCart() returns error? {
    AddToCartRequest request = {
        user_id: io:readln("Enter user ID: "),
        sku: io:readln("Enter product SKU to add to cart: ")
    };
    AddToCartResponse response = check ep->AddToCart(request);
    io:println(response.status);
}

function removeFromCart() returns error? {
    RemoveFromCartRequest request = {sku: io:readln("Enter product SKU to remove from cart: ")};
    RemoveFromCartResponse response = check ep->RemoveFromCart(request);
    io:println(response.status);
}

function viewCart() returns error? {
    ViewCartRequest request = {user_id: io:readln("Enter user ID to view cart: ")};
    ViewCartResponse response = check ep->ViewCart(request);
    io:println("Cart contents: ", response.products);
}

function placeOrder() returns error? {
    PlaceOrderRequest request = {user_id: io:readln("Enter user ID to place order: ")};
    PlaceOrderResponse response = check ep->PlaceOrder(request);
    io:println("Order ID: ", response.order_id, " Status: ", response.status);
}

function checkUserType() returns error? {
    CheckUserTypeRequest request = {user_id: io:readln("Enter user ID to check type: ")};
    CheckUserTypeResponse response = check ep->CheckUserType(request);
    io:println("User type: ", response.user_type);
}

function createUsers() returns error? {
    int numberOfUsers = check 'int:fromString(io:readln("How many users do you want to add? "));

    CreateUsersStreamingClient streamingClient = check ep->CreateUsers();

    foreach int i in 1...numberOfUsers {
        io:println("Adding user ", i);
        CreateUserRequest request = {
            user_id: io:readln("Enter new user ID: "),
            user_name: io:readln("Enter user name: "),
            email: io:readln("Enter email: "),
            password: io:readln("Enter password: "),
            user_type: io:readln("Enter user type: ")
        };
        check streamingClient->sendCreateUserRequest(request);
    }

    check streamingClient->complete();
    
    CreateUsersResponse? response = check streamingClient->receiveCreateUsersResponse();
    io:println("User creation status: ", response?.status);
}

