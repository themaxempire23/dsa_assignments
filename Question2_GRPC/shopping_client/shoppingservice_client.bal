import ballerina/io;

ShoppingServiceClient ep = check new ("http://localhost:9090");

public function main() returns error? {
    AddProductRequest addProductRequest = {name: "ballerina", description: "ballerina", price: 1, stock_quantity: 1, sku: "ballerina", status: "ballerina"};
    AddProductResponse addProductResponse = check ep->AddProduct(addProductRequest);
    io:println(addProductResponse);

    UpdateProductRequest updateProductRequest = {sku: "ballerina", name: "ballerina", description: "ballerina", price: 1, stock_quantity: 1, status: "ballerina"};
    UpdateProductResponse updateProductResponse = check ep->UpdateProduct(updateProductRequest);
    io:println(updateProductResponse);

    RemoveProductRequest removeProductRequest = {sku: "ballerina"};
    RemoveProductResponse removeProductResponse = check ep->RemoveProduct(removeProductRequest);
    io:println(removeProductResponse);

    ListAvailableProductsRequest listAvailableProductsRequest = {};
    ListAvailableProductsResponse listAvailableProductsResponse = check ep->ListAvailableProducts(listAvailableProductsRequest);
    io:println(listAvailableProductsResponse);

    SearchProductRequest searchProductRequest = {sku: "ballerina"};
    SearchProductResponse searchProductResponse = check ep->SearchProduct(searchProductRequest);
    io:println(searchProductResponse);

    AddToCartRequest addToCartRequest = {user_id: "ballerina", sku: "ballerina"};
    AddToCartResponse addToCartResponse = check ep->AddToCart(addToCartRequest);
    io:println(addToCartResponse);

    RemoveFromCartRequest removeFromCartRequest = {sku: "ballerina"};
    RemoveFromCartResponse removeFromCartResponse = check ep->RemoveFromCart(removeFromCartRequest);
    io:println(removeFromCartResponse);

    ViewCartRequest viewCartRequest = {user_id: "ballerina"};
    ViewCartResponse viewCartResponse = check ep->ViewCart(viewCartRequest);
    io:println(viewCartResponse);

    PlaceOrderRequest placeOrderRequest = {user_id: "ballerina"};
    PlaceOrderResponse placeOrderResponse = check ep->PlaceOrder(placeOrderRequest);
    io:println(placeOrderResponse);

    CheckUserTypeRequest checkUserTypeRequest = {user_id: "ballerina"};
    CheckUserTypeResponse checkUserTypeResponse = check ep->CheckUserType(checkUserTypeRequest);
    io:println(checkUserTypeResponse);

    CreateUserRequest createUsersRequest = {user_id: "ballerina", user_type: "ballerina", user_name: "ballerina", email: "ballerina", password: "ballerina"};
    CreateUsersStreamingClient createUsersStreamingClient = check ep->CreateUsers();
    check createUsersStreamingClient->sendCreateUserRequest(createUsersRequest);
    check createUsersStreamingClient->complete();
    CreateUsersResponse? createUsersResponse = check createUsersStreamingClient->receiveCreateUsersResponse();
    io:println(createUsersResponse);
}

