import ballerina/grpc;
import ballerina/protobuf;

public const string SHOPPING_SYSTEM_DESC = "0A1573686F7070696E675F73797374656D2E70726F746F120873686F7070696E67222F0A14436865636B55736572547970655265717565737412170A07757365725F6964180120012809520675736572496422340A15436865636B5573657254797065526573706F6E7365121B0A09757365725F747970651801200128095208757365725479706522B0010A1141646450726F647563745265717565737412120A046E616D6518012001280952046E616D6512200A0B6465736372697074696F6E180220012809520B6465736372697074696F6E12140A0570726963651803200128025205707269636512250A0E73746F636B5F7175616E74697479180420012805520D73746F636B5175616E7469747912100A03736B751805200128095203736B7512160A06737461747573180620012809520673746174757322370A1241646450726F64756374526573706F6E736512210A0C70726F647563745F636F6465180120012809520B70726F64756374436F64652298010A11437265617465557365725265717565737412170A07757365725F69641801200128095206757365724964121B0A09757365725F7479706518022001280952087573657254797065121B0A09757365725F6E616D651803200128095208757365724E616D6512140A05656D61696C1804200128095205656D61696C121A0A0870617373776F7264180520012809520870617373776F7264222D0A134372656174655573657273526573706F6E736512160A06737461747573180120012809520673746174757322B3010A1455706461746550726F647563745265717565737412100A03736B751801200128095203736B7512120A046E616D6518022001280952046E616D6512200A0B6465736372697074696F6E180320012809520B6465736372697074696F6E12140A0570726963651804200128025205707269636512250A0E73746F636B5F7175616E74697479180520012805520D73746F636B5175616E7469747912160A067374617475731806200128095206737461747573222F0A1555706461746550726F64756374526573706F6E736512160A06737461747573180120012809520673746174757322280A1452656D6F766550726F647563745265717565737412100A03736B751801200128095203736B7522460A1552656D6F766550726F64756374526573706F6E7365122D0A0870726F647563747318012003280B32112E73686F7070696E672E50726F64756374520870726F6475637473221E0A1C4C697374417661696C61626C6550726F647563747352657175657374224E0A1D4C697374417661696C61626C6550726F6475637473526573706F6E7365122D0A0870726F647563747318012003280B32112E73686F7070696E672E50726F64756374520870726F647563747322280A1453656172636850726F647563745265717565737412100A03736B751801200128095203736B75226C0A1553656172636850726F64756374526573706F6E7365122D0A0770726F6475637418012001280B32112E73686F7070696E672E50726F647563744800520770726F64756374121A0A076D657373616765180220012809480052076D65737361676542080A06726573756C74223D0A10416464546F436172745265717565737412170A07757365725F6964180120012809520675736572496412100A03736B751802200128095203736B75222B0A11416464546F43617274526573706F6E736512160A06737461747573180120012809520673746174757322290A1552656D6F766546726F6D436172745265717565737412100A03736B751802200128095203736B7522300A1652656D6F766546726F6D43617274526573706F6E736512160A067374617475731801200128095206737461747573222A0A0F56696577436172745265717565737412170A07757365725F6964180120012809520675736572496422410A105669657743617274526573706F6E7365122D0A0870726F647563747318012003280B32112E73686F7070696E672E50726F64756374520870726F6475637473222C0A11506C6163654F726465725265717565737412170A07757365725F6964180120012809520675736572496422470A12506C6163654F72646572526573706F6E736512190A086F726465725F696418012001280952076F72646572496412160A06737461747573180220012809520673746174757322A6010A0750726F6475637412120A046E616D6518012001280952046E616D6512200A0B6465736372697074696F6E180220012809520B6465736372697074696F6E12140A0570726963651803200128025205707269636512250A0E73746F636B5F7175616E74697479180420012805520D73746F636B5175616E7469747912100A03736B751805200128095203736B7512160A06737461747573180620012809520673746174757322350A08436172744974656D12170A07757365725F6964180120012809520675736572496412100A03736B751802200128095203736B75228B010A045573657212170A07757365725F69641801200128095206757365724964121B0A09757365725F6E616D651802200128095208757365724E616D6512140A05656D61696C1803200128095205656D61696C121A0A0870617373776F7264180420012809520870617373776F7264121B0A09757365725F74797065180520012809520875736572547970653280070A0F53686F7070696E675365727669636512470A0A41646450726F64756374121B2E73686F7070696E672E41646450726F64756374526571756573741A1C2E73686F7070696E672E41646450726F64756374526573706F6E7365124B0A0B4372656174655573657273121B2E73686F7070696E672E43726561746555736572526571756573741A1D2E73686F7070696E672E4372656174655573657273526573706F6E7365280112500A0D55706461746550726F64756374121E2E73686F7070696E672E55706461746550726F64756374526571756573741A1F2E73686F7070696E672E55706461746550726F64756374526573706F6E736512500A0D52656D6F766550726F64756374121E2E73686F7070696E672E52656D6F766550726F64756374526571756573741A1F2E73686F7070696E672E52656D6F766550726F64756374526573706F6E736512680A154C697374417661696C61626C6550726F647563747312262E73686F7070696E672E4C697374417661696C61626C6550726F6475637473526571756573741A272E73686F7070696E672E4C697374417661696C61626C6550726F6475637473526573706F6E736512500A0D53656172636850726F64756374121E2E73686F7070696E672E53656172636850726F64756374526571756573741A1F2E73686F7070696E672E53656172636850726F64756374526573706F6E736512440A09416464546F43617274121A2E73686F7070696E672E416464546F43617274526571756573741A1B2E73686F7070696E672E416464546F43617274526573706F6E736512530A0E52656D6F766546726F6D43617274121F2E73686F7070696E672E52656D6F766546726F6D43617274526571756573741A202E73686F7070696E672E52656D6F766546726F6D43617274526573706F6E736512410A08566965774361727412192E73686F7070696E672E5669657743617274526571756573741A1A2E73686F7070696E672E5669657743617274526573706F6E736512470A0A506C6163654F72646572121B2E73686F7070696E672E506C6163654F72646572526571756573741A1C2E73686F7070696E672E506C6163654F72646572526573706F6E736512500A0D436865636B5573657254797065121E2E73686F7070696E672E436865636B5573657254797065526571756573741A1F2E73686F7070696E672E436865636B5573657254797065526573706F6E7365620670726F746F33";

public isolated client class ShoppingServiceClient {
    *grpc:AbstractClientEndpoint;

    private final grpc:Client grpcClient;

    public isolated function init(string url, *grpc:ClientConfiguration config) returns grpc:Error? {
        self.grpcClient = check new (url, config);
        check self.grpcClient.initStub(self, SHOPPING_SYSTEM_DESC);
    }

    isolated remote function AddProduct(AddProductRequest|ContextAddProductRequest req) returns AddProductResponse|grpc:Error {
        map<string|string[]> headers = {};
        AddProductRequest message;
        if req is ContextAddProductRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/AddProduct", message, headers);
        [anydata, map<string|string[]>] [result, _] = payload;
        return <AddProductResponse>result;
    }

    isolated remote function AddProductContext(AddProductRequest|ContextAddProductRequest req) returns ContextAddProductResponse|grpc:Error {
        map<string|string[]> headers = {};
        AddProductRequest message;
        if req is ContextAddProductRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/AddProduct", message, headers);
        [anydata, map<string|string[]>] [result, respHeaders] = payload;
        return {content: <AddProductResponse>result, headers: respHeaders};
    }

    isolated remote function UpdateProduct(UpdateProductRequest|ContextUpdateProductRequest req) returns UpdateProductResponse|grpc:Error {
        map<string|string[]> headers = {};
        UpdateProductRequest message;
        if req is ContextUpdateProductRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/UpdateProduct", message, headers);
        [anydata, map<string|string[]>] [result, _] = payload;
        return <UpdateProductResponse>result;
    }

    isolated remote function UpdateProductContext(UpdateProductRequest|ContextUpdateProductRequest req) returns ContextUpdateProductResponse|grpc:Error {
        map<string|string[]> headers = {};
        UpdateProductRequest message;
        if req is ContextUpdateProductRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/UpdateProduct", message, headers);
        [anydata, map<string|string[]>] [result, respHeaders] = payload;
        return {content: <UpdateProductResponse>result, headers: respHeaders};
    }

    isolated remote function RemoveProduct(RemoveProductRequest|ContextRemoveProductRequest req) returns RemoveProductResponse|grpc:Error {
        map<string|string[]> headers = {};
        RemoveProductRequest message;
        if req is ContextRemoveProductRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/RemoveProduct", message, headers);
        [anydata, map<string|string[]>] [result, _] = payload;
        return <RemoveProductResponse>result;
    }

    isolated remote function RemoveProductContext(RemoveProductRequest|ContextRemoveProductRequest req) returns ContextRemoveProductResponse|grpc:Error {
        map<string|string[]> headers = {};
        RemoveProductRequest message;
        if req is ContextRemoveProductRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/RemoveProduct", message, headers);
        [anydata, map<string|string[]>] [result, respHeaders] = payload;
        return {content: <RemoveProductResponse>result, headers: respHeaders};
    }

    isolated remote function ListAvailableProducts(ListAvailableProductsRequest|ContextListAvailableProductsRequest req) returns ListAvailableProductsResponse|grpc:Error {
        map<string|string[]> headers = {};
        ListAvailableProductsRequest message;
        if req is ContextListAvailableProductsRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/ListAvailableProducts", message, headers);
        [anydata, map<string|string[]>] [result, _] = payload;
        return <ListAvailableProductsResponse>result;
    }

    isolated remote function ListAvailableProductsContext(ListAvailableProductsRequest|ContextListAvailableProductsRequest req) returns ContextListAvailableProductsResponse|grpc:Error {
        map<string|string[]> headers = {};
        ListAvailableProductsRequest message;
        if req is ContextListAvailableProductsRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/ListAvailableProducts", message, headers);
        [anydata, map<string|string[]>] [result, respHeaders] = payload;
        return {content: <ListAvailableProductsResponse>result, headers: respHeaders};
    }

    isolated remote function SearchProduct(SearchProductRequest|ContextSearchProductRequest req) returns SearchProductResponse|grpc:Error {
        map<string|string[]> headers = {};
        SearchProductRequest message;
        if req is ContextSearchProductRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/SearchProduct", message, headers);
        [anydata, map<string|string[]>] [result, _] = payload;
        return <SearchProductResponse>result;
    }

    isolated remote function SearchProductContext(SearchProductRequest|ContextSearchProductRequest req) returns ContextSearchProductResponse|grpc:Error {
        map<string|string[]> headers = {};
        SearchProductRequest message;
        if req is ContextSearchProductRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/SearchProduct", message, headers);
        [anydata, map<string|string[]>] [result, respHeaders] = payload;
        return {content: <SearchProductResponse>result, headers: respHeaders};
    }

    isolated remote function AddToCart(AddToCartRequest|ContextAddToCartRequest req) returns AddToCartResponse|grpc:Error {
        map<string|string[]> headers = {};
        AddToCartRequest message;
        if req is ContextAddToCartRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/AddToCart", message, headers);
        [anydata, map<string|string[]>] [result, _] = payload;
        return <AddToCartResponse>result;
    }

    isolated remote function AddToCartContext(AddToCartRequest|ContextAddToCartRequest req) returns ContextAddToCartResponse|grpc:Error {
        map<string|string[]> headers = {};
        AddToCartRequest message;
        if req is ContextAddToCartRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/AddToCart", message, headers);
        [anydata, map<string|string[]>] [result, respHeaders] = payload;
        return {content: <AddToCartResponse>result, headers: respHeaders};
    }

    isolated remote function RemoveFromCart(RemoveFromCartRequest|ContextRemoveFromCartRequest req) returns RemoveFromCartResponse|grpc:Error {
        map<string|string[]> headers = {};
        RemoveFromCartRequest message;
        if req is ContextRemoveFromCartRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/RemoveFromCart", message, headers);
        [anydata, map<string|string[]>] [result, _] = payload;
        return <RemoveFromCartResponse>result;
    }

    isolated remote function RemoveFromCartContext(RemoveFromCartRequest|ContextRemoveFromCartRequest req) returns ContextRemoveFromCartResponse|grpc:Error {
        map<string|string[]> headers = {};
        RemoveFromCartRequest message;
        if req is ContextRemoveFromCartRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/RemoveFromCart", message, headers);
        [anydata, map<string|string[]>] [result, respHeaders] = payload;
        return {content: <RemoveFromCartResponse>result, headers: respHeaders};
    }

    isolated remote function ViewCart(ViewCartRequest|ContextViewCartRequest req) returns ViewCartResponse|grpc:Error {
        map<string|string[]> headers = {};
        ViewCartRequest message;
        if req is ContextViewCartRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/ViewCart", message, headers);
        [anydata, map<string|string[]>] [result, _] = payload;
        return <ViewCartResponse>result;
    }

    isolated remote function ViewCartContext(ViewCartRequest|ContextViewCartRequest req) returns ContextViewCartResponse|grpc:Error {
        map<string|string[]> headers = {};
        ViewCartRequest message;
        if req is ContextViewCartRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/ViewCart", message, headers);
        [anydata, map<string|string[]>] [result, respHeaders] = payload;
        return {content: <ViewCartResponse>result, headers: respHeaders};
    }

    isolated remote function PlaceOrder(PlaceOrderRequest|ContextPlaceOrderRequest req) returns PlaceOrderResponse|grpc:Error {
        map<string|string[]> headers = {};
        PlaceOrderRequest message;
        if req is ContextPlaceOrderRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/PlaceOrder", message, headers);
        [anydata, map<string|string[]>] [result, _] = payload;
        return <PlaceOrderResponse>result;
    }

    isolated remote function PlaceOrderContext(PlaceOrderRequest|ContextPlaceOrderRequest req) returns ContextPlaceOrderResponse|grpc:Error {
        map<string|string[]> headers = {};
        PlaceOrderRequest message;
        if req is ContextPlaceOrderRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/PlaceOrder", message, headers);
        [anydata, map<string|string[]>] [result, respHeaders] = payload;
        return {content: <PlaceOrderResponse>result, headers: respHeaders};
    }

    isolated remote function CheckUserType(CheckUserTypeRequest|ContextCheckUserTypeRequest req) returns CheckUserTypeResponse|grpc:Error {
        map<string|string[]> headers = {};
        CheckUserTypeRequest message;
        if req is ContextCheckUserTypeRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/CheckUserType", message, headers);
        [anydata, map<string|string[]>] [result, _] = payload;
        return <CheckUserTypeResponse>result;
    }

    isolated remote function CheckUserTypeContext(CheckUserTypeRequest|ContextCheckUserTypeRequest req) returns ContextCheckUserTypeResponse|grpc:Error {
        map<string|string[]> headers = {};
        CheckUserTypeRequest message;
        if req is ContextCheckUserTypeRequest {
            message = req.content;
            headers = req.headers;
        } else {
            message = req;
        }
        var payload = check self.grpcClient->executeSimpleRPC("shopping.ShoppingService/CheckUserType", message, headers);
        [anydata, map<string|string[]>] [result, respHeaders] = payload;
        return {content: <CheckUserTypeResponse>result, headers: respHeaders};
    }

    isolated remote function CreateUsers() returns CreateUsersStreamingClient|grpc:Error {
        grpc:StreamingClient sClient = check self.grpcClient->executeClientStreaming("shopping.ShoppingService/CreateUsers");
        return new CreateUsersStreamingClient(sClient);
    }
}

public isolated client class CreateUsersStreamingClient {
    private final grpc:StreamingClient sClient;

    isolated function init(grpc:StreamingClient sClient) {
        self.sClient = sClient;
    }

    isolated remote function sendCreateUserRequest(CreateUserRequest message) returns grpc:Error? {
        return self.sClient->send(message);
    }

    isolated remote function sendContextCreateUserRequest(ContextCreateUserRequest message) returns grpc:Error? {
        return self.sClient->send(message);
    }

    isolated remote function receiveCreateUsersResponse() returns CreateUsersResponse|grpc:Error? {
        var response = check self.sClient->receive();
        if response is () {
            return response;
        } else {
            [anydata, map<string|string[]>] [payload, _] = response;
            return <CreateUsersResponse>payload;
        }
    }

    isolated remote function receiveContextCreateUsersResponse() returns ContextCreateUsersResponse|grpc:Error? {
        var response = check self.sClient->receive();
        if response is () {
            return response;
        } else {
            [anydata, map<string|string[]>] [payload, headers] = response;
            return {content: <CreateUsersResponse>payload, headers: headers};
        }
    }

    isolated remote function sendError(grpc:Error response) returns grpc:Error? {
        return self.sClient->sendError(response);
    }

    isolated remote function complete() returns grpc:Error? {
        return self.sClient->complete();
    }
}

public type ContextCreateUserRequestStream record {|
    stream<CreateUserRequest, error?> content;
    map<string|string[]> headers;
|};

public type ContextViewCartRequest record {|
    ViewCartRequest content;
    map<string|string[]> headers;
|};

public type ContextCheckUserTypeRequest record {|
    CheckUserTypeRequest content;
    map<string|string[]> headers;
|};

public type ContextAddProductResponse record {|
    AddProductResponse content;
    map<string|string[]> headers;
|};

public type ContextListAvailableProductsRequest record {|
    ListAvailableProductsRequest content;
    map<string|string[]> headers;
|};

public type ContextListAvailableProductsResponse record {|
    ListAvailableProductsResponse content;
    map<string|string[]> headers;
|};

public type ContextAddToCartResponse record {|
    AddToCartResponse content;
    map<string|string[]> headers;
|};

public type ContextRemoveFromCartRequest record {|
    RemoveFromCartRequest content;
    map<string|string[]> headers;
|};

public type ContextRemoveProductResponse record {|
    RemoveProductResponse content;
    map<string|string[]> headers;
|};

public type ContextAddProductRequest record {|
    AddProductRequest content;
    map<string|string[]> headers;
|};

public type ContextUpdateProductRequest record {|
    UpdateProductRequest content;
    map<string|string[]> headers;
|};

public type ContextSearchProductRequest record {|
    SearchProductRequest content;
    map<string|string[]> headers;
|};

public type ContextAddToCartRequest record {|
    AddToCartRequest content;
    map<string|string[]> headers;
|};

public type ContextPlaceOrderResponse record {|
    PlaceOrderResponse content;
    map<string|string[]> headers;
|};

public type ContextViewCartResponse record {|
    ViewCartResponse content;
    map<string|string[]> headers;
|};

public type ContextCheckUserTypeResponse record {|
    CheckUserTypeResponse content;
    map<string|string[]> headers;
|};

public type ContextPlaceOrderRequest record {|
    PlaceOrderRequest content;
    map<string|string[]> headers;
|};

public type ContextRemoveProductRequest record {|
    RemoveProductRequest content;
    map<string|string[]> headers;
|};

public type ContextCreateUserRequest record {|
    CreateUserRequest content;
    map<string|string[]> headers;
|};

public type ContextSearchProductResponse record {|
    SearchProductResponse content;
    map<string|string[]> headers;
|};

public type ContextRemoveFromCartResponse record {|
    RemoveFromCartResponse content;
    map<string|string[]> headers;
|};

public type ContextCreateUsersResponse record {|
    CreateUsersResponse content;
    map<string|string[]> headers;
|};

public type ContextUpdateProductResponse record {|
    UpdateProductResponse content;
    map<string|string[]> headers;
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type CheckUserTypeRequest record {|
    string user_id = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type User record {|
    string user_id = "";
    string user_name = "";
    string email = "";
    string password = "";
    string user_type = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type Product record {|
    string name = "";
    string description = "";
    float price = 0.0;
    int stock_quantity = 0;
    string sku = "";
    string status = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type CartItem record {|
    string user_id = "";
    string sku = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type RemoveProductResponse record {|
    Product[] products = [];
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type UpdateProductRequest record {|
    string sku = "";
    string name = "";
    string description = "";
    float price = 0.0;
    int stock_quantity = 0;
    string status = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type SearchProductRequest record {|
    string sku = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type AddToCartRequest record {|
    string user_id = "";
    string sku = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type PlaceOrderResponse record {|
    string order_id = "";
    string status = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type CheckUserTypeResponse record {|
    string user_type = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type RemoveProductRequest record {|
    string sku = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type SearchProductResponse record {|
    Product product?;
    string message?;
|};

isolated function isValidSearchproductresponse(SearchProductResponse r) returns boolean {
    int resultCount = 0;
    if r?.product !is () {
        resultCount += 1;
    }
    if r?.message !is () {
        resultCount += 1;
    }
    if resultCount > 1 {
        return false;
    }
    return true;
}

isolated function setSearchProductResponse_Product(SearchProductResponse r, Product product) {
    r.product = product;
    _ = r.removeIfHasKey("message");
}

isolated function setSearchProductResponse_Message(SearchProductResponse r, string message) {
    r.message = message;
    _ = r.removeIfHasKey("product");
}

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type UpdateProductResponse record {|
    string status = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type ViewCartRequest record {|
    string user_id = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type AddProductResponse record {|
    string product_code = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type ListAvailableProductsRequest record {|
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type ListAvailableProductsResponse record {|
    Product[] products = [];
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type AddToCartResponse record {|
    string status = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type RemoveFromCartRequest record {|
    string sku = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type AddProductRequest record {|
    string name = "";
    string description = "";
    float price = 0.0;
    int stock_quantity = 0;
    string sku = "";
    string status = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type ViewCartResponse record {|
    Product[] products = [];
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type PlaceOrderRequest record {|
    string user_id = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type CreateUserRequest record {|
    string user_id = "";
    string user_type = "";
    string user_name = "";
    string email = "";
    string password = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type RemoveFromCartResponse record {|
    string status = "";
|};

@protobuf:Descriptor {value: SHOPPING_SYSTEM_DESC}
public type CreateUsersResponse record {|
    string status = "";
|};

