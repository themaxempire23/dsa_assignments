table<CartItem> key(sku) CartTable = table [
    {user_id: "user1", sku: "sku123"}, //customer cart
    {user_id: "user1", sku: "sku456"},
    {user_id: "user2", sku: "sku789"}
];

public final table<Product> key(sku) ProductTable = table [
    {
        name: "Laptop",
        description: "A high-performance laptop",
        price: 1200.00,
        stock_quantity: 10,
        sku: "P001",
        status: "available"
    },
    {
        name: "Smartphone",
        description: "Latest model smartphone",
        price: 800.00,
        stock_quantity: 20,
        sku: "P002",
        status: "available"
    }
];

public final table<User> key(user_id) UserTable = table [
    {
        user_id: "user1",
        user_name: "Alice",
        email: "alice@example.com",
        password: "password123",
        user_type: "customer"
    },
    {
        user_id: "admin1",
        user_name: "Bob",
        email: "bob@example.com",
        password: "adminpass",
        user_type: "admin"
    }
];