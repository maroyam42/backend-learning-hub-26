//____________________________
//PART 1
//____________________________
function calculateOrderTotal(items:{price:number,qty:number}[],discount:number):number{
    //we here added the data type of each parameter
    let total = 0;
  for (const item of items) {
    total += item.price * item.qty;
  }
  return total - discount;
}

const order = {
  customer: "Layla",
  items: [
    { price: "250 EGP", qty: 2 },
    { price: 100, qty: 1 },
  ],
};

//console.log(calculateOrderTotal(order.items, "50"));
//console.log(order.shippingAddress.city);
/*
PART 1
Compiler error
TypeScript stops the program before it can run because one product price is text
("250 EGP") instead of a number, and the discount is also text ("50") instead of
a number
and shippingAddress does not exist
*/
//____________________________
//PART 2
//____________________________
type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

function canCancelOrder(status: OrderStatus): boolean {
  return status === "pending" || status === "shipped";
}

console.log(canCancelOrder("pending"));    // t
console.log(canCancelOrder("shipped"));    // t
console.log(canCancelOrder("delivered"));  // f
console.log(canCancelOrder("cancelled"));  // f
// console.log(canCancelOrder("refunded")); //error

/*
Compiler error
TypeScript rejects "refunded" because it is not one of the valid order statuses
defined by the system
*/
//____________________________
//PART 3
//____________________________
type warehouse=[asile:number,shelf:number]
const binForOrder:warehouse=[4,12];
//const badBin: WarehouseBin = [4, 12, "extra"] ;
/*
Compiler error (explained for the manager):
WarehouseBin must contain exactly two values:
1. aisle number
2. shelf number
A value like [4, 12, "extra"] is rejected because the warehouse scanner
expects exactly two pieces of information (two numbers)
*/
class Repository<T extends { id: string }> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}
interface Product {
  id: string;
  name: string;
  price: number;
  costPrice: number; // internal, never shown to customers
}

const productRepo = new Repository<Product>();

productRepo.add({
  id: "1",
  name: "Laptop",
  price: 25000,
  costPrice:3000,
});

productRepo.add({
  id: "2",
  name: "Mouse",
  price: 350,
  costPrice:500,
});
console.log(productRepo.findById("1"));
interface Customer {
  id: string;
  name: string;
  email: string;
}

const customerRepo = new Repository<Customer>();

customerRepo.add({
  id: "1",
  name: "mariam",
  email: "mariam@gmail.com",
});

customerRepo.add({
  id: "2",
  name: "ahmed",
  email: "ahmed@gmail.com",
});

console.log(customerRepo.findById("2"));
/*
Why Generics help:
Instead of writing separate findById logic for products, customers,
and orders, one generic Repository<T> works for every collection.
This removes duplicated code and ensures the same tested logic is
used everywhere.
If someone tries to add an object without an "id", TypeScript reports
a compile-time error because Repository<T> requires every item to have
an id:string. This prevents invalid data from entering the repository.
*/
//____________________________
//PART 4
//____________________________
//Price interface is above i only updated on it
interface OrderItem {
  product: Product;
  qty: number;
}

interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  status: OrderStatus;        // reuse Part 2's type
  shippedAt?: string;         // optional — only exists once shipped
  readonly createdAt: string; // set once, never changes
}
//1-pending order
const order1: Order = {
  id: "O1",
  customer: "mariam",
  status: "pending",
  createdAt: new Date().toISOString(),

  items: [
    {
      product: {
        id: "P1",
        name: "laptop",
        price: 25000,
        costPrice: 21000,
      },
      qty: 1,
    },
    {
      product: {
        id: "P2",
        name: "mouse",
        price: 350,
        costPrice: 200,
      },
      qty: 2,
    },
  ],
};
//ship order
function shipOrder(order: Order): Order {
  return {
    ...order,
    status: "shipped",
    shippedAt: new Date().toISOString(),
  };
}
const shippedOrder = shipOrder(order1);
console.log(order1);
console.log(shippedOrder);
//order1.createdAt = "2026-07-06";
/*
compiler error

TypeScript does not allow changing createdAt because it is marked
as readonly. This prevents developers from accidentally rewriting
an order's history after it has been created
*/

// Updated calculateOrderTotal

function calculateOrderTotal1(
  items: Order["items"],
  discount: number
): number {
  let total = 0;

  for (const item of items) {
    total += item.product.price * item.qty;
  }

  return total - discount;
}

console.log(calculateOrderTotal1(order1.items, 50));

//____________________________
//PART 5
//____________________________
// Customer-facing Product (hide costPrice)
type PublicProduct = Omit<Product, "costPrice">;

// Input when creating a product
type CreateProductInput = Omit<Product, "id">;

// Input when updating a product
type UpdateProductInput = Partial<Product>;

// Product lookup table
type ProductCatalog = Record<string, Product>;

// Convert Product -> PublicProduct
function toPublicProduct(product: Product): PublicProduct {
  const { costPrice, ...publicProduct } = product;
  return publicProduct;
}
// Fake ID Generator
let productCounter = 1;
function createProduct(input: CreateProductInput): Product {
  return {
    id: `P${productCounter++}`,
    ...input,
  };
}
// Update Product
function updateProduct(
  product: Product,
  changes: UpdateProductInput
): Product {
  return {
    ...product,
    ...changes,
  };
}
// Create Products
const keyboard = createProduct({
  name: "Keyboard",
  price: 600,
  costPrice: 450,
});

const monitor = createProduct({
  name: "screen",
  price: 5000,
  costPrice: 4300,
});
// Public Product
console.log(toPublicProduct(keyboard));
// Update Product
const updatedKeyboard = updateProduct(keyboard, {
  price: 650,
});

console.log(updatedKeyboard);
// Product Catalog
const catalog: ProductCatalog = {
  [keyboard.id]: keyboard,
  [monitor.id]: monitor,
};

console.log(catalog[keyboard.id]);
/*
In the old JavaScript codebase, developers maintained separate copies
of the Product structure. If a new field such as discountPercent was
added to Product but someone forgot to update the public version, the
different copies could become inconsistent, leading to missing or
incorrect data
With TypeScript utility types such as Omit and Partial, these types are
derived automatically from Product. Any change to Product is reflected
everywhere
*/
//____________________________
//PART 6
//____________________________
/*
For a small team like CodeMart I would choose colocated types because
keeping types close to the code that uses them makes them easier to find and maintain, For a large organization
I would choose centralized types because shared domain models stay consistent across projects
making them easier to discover and reducing duplicate definitions. This also helps teams avoid
inconsistent models, although the shared file should be organized carefully to reduce merge
conflicts 
*/
//____________________________
//PART 7
//____________________________
function getExternalWarehouseData() {
  return {
    id: "w-99",
    name: "Desk Lamp",
    price: 150,
    costPrice: 60,
    extra: "ignored",
  };
}

function receiveFromWarehouse(product: Product): void {
  console.log(`Received product: ${product.name}`);
}

// This compiles because the returned object has all the required
// Product properties
receiveFromWarehouse(getExternalWarehouseData());
/*
Compiler error:
receiveFromWarehouse({
  id: "w-1",
  name: "Chair",
  price: 90,
  costPrice: 40,
  extra: "oops",
});
error because this is a fresh
object literal with a property (extra) that Product does not define.
*/
// =========================
// Final Boss
// =========================

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

let orderCounter = 1;

function placeOrder(
  customer: string,
  items: OrderItem[]
): Result<Order> {

  // Validation
  if (items.length === 0) {
    return {
      success: false,
      error: "Order must contain at least one item",
    };
  }

  // Use the function from Part 4
  const total = calculateOrderTotal1(items, 0);

  if (total <= 0) {
    return {
      success: false,
      error: "Order total must be greater than zero",
    };
  }

  const order: Order = {
    id: `ORD${orderCounter++}`,
    customer,
    items,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  return {
    success: true,
    data: order,
  };
}


// -----------------------------
// Empty Order
// -----------------------------

const emptyResult = placeOrder("Layla", []);

if (emptyResult.success) {
  console.log("Order Created:", emptyResult.data);
} else {
  console.log("Error:", emptyResult.error);
}


// -----------------------------
// Valid Order
// -----------------------------

const validItems: OrderItem[] = [
  {
    product: {
      id: "P100",
      name: "Keyboard",
      price: 700,
      costPrice: 500,
    },
    qty: 2,
  },
  {
    product: {
      id: "P101",
      name: "Mouse",
      price: 300,
      costPrice: 180,
    },
    qty: 1,
  },
];

const result = placeOrder("Mariam", validItems);

if (result.success) {
  // TypeScript knows that result.data exists here
  console.log("Order ID:", result.data.id);
  console.log("Customer:", result.data.customer);
  console.log("Status:", result.data.status);
  console.log("Items:", result.data.items);
} else {
  // TypeScript knows that result.error exists here
  console.log("Error:", result.error);
}