const products = [
  { sku: "ELEC-001", name: "Wireless Headphones", category: "electronics", price: 250, inventory: 3 },
  { sku: "APP-001", name: "Paintball Pants", category: "apparel", price: 125, inventory: 10 },
  { sku: "GROC-001", name: "Coffee Beans", category: "groceries", price: 3, inventory: 20 },
  { sku: "HOUSE-001", name: "Detergent", category: "household", price: 8, inventory: 4 },
  { sku: "STAT-001", name: "Composition Book", category: "stationery", price: 2, inventory: 15 },
];
for (let product of products) {
  let discount = 0;
  switch (product.category) {
    case "electronics":
      discount = 0.20;
      break;
    case "apparel":
      discount = 0.15;
      break;
    case "groceries":
    case "household":
      discount = 0.10;
      break;
    default:
      discount = 0;
  }
  product.promoPrice = +(product.price * (1 - discount)).toFixed(2);
}
function getCustomerDiscountRate(type) {
  if (type === "student") return 0.05;
  else if (type === "senior") return 0.07;
  else return 0;
}
function applyCoupon(total, code) {
  if (code === "SAVE10" && total >= 50) {
    return total - 10;
  } else if (code === "FREESHIP") {
    return total - 5;
  } else {
    return total;
  }
}
const taxRate = 0.085;

const customers = [
  {
    customerType: "student",
    couponCode: "SAVE10",
    cart: [
      { sku: "ELEC001", qty: 1 },
      { sku: "APP001", qty: 2 }
    ]
  },
  {
    customerType: "senior",
    couponCode: "FREESHIP",
    cart: [
      { sku: "GROC001", qty: 6 },
      { sku: "HOUSE001", qty: 2 }
    ]
  },
  {
    customerType: "regular",
    couponCode: "INVALIDCODE",
    cart: [
      { sku: "STAT001", qty: 3 },
      { sku: "APP001", qty: 1 }
    ]
  }
];

for (let i = 0; i < customers.length; i++) {
  const customer = customers[i];
  const customerNum = i + 1;
  let subtotal = 0;
  let receiptLines = [];

  for (let item of customer.cart) {
    const product = products.find(p => p.sku === item.sku);
    if (!product) continue;

    let qtyToBuy = item.qty;
    if (product.inventory < item.qty) {
      console.log(`Customer ${customerNum}: Only ${product.inventory} of ${product.name} available. Adjusting quantity.`);
      qtyToBuy = product.inventory;
    }

    const lineTotal = +(product.promoPrice * qtyToBuy).toFixed(2);
    subtotal += lineTotal;
    receiptLines.push(`${product.name} x${qtyToBuy} @ $${product.promoPrice} = $${lineTotal.toFixed(2)}`);

    product.inventory -= qtyToBuy;
  }

  const customerDiscountRate = getCustomerDiscountRate(customer.customerType);
  const customerDiscountAmount = +(subtotal * customerDiscountRate).toFixed(2);
  let discountedTotal = subtotal - customerDiscountAmount;

  let afterCoupon = applyCoupon(discountedTotal, customer.couponCode);
  afterCoupon = +afterCoupon.toFixed(2);

  const tax = +(afterCoupon * taxRate).toFixed(2);
  const finalTotal = +(afterCoupon + tax).toFixed(2);

  // Print receipt
  console.log(`\n--- Receipt for Customer ${customerNum} (${customer.customerType}) ---`);
  receiptLines.forEach(line => console.log(line));
  console.log(`Subtotal: $${subtotal.toFixed(2)}`);
  console.log(`Customer Discount: -$${customerDiscountAmount.toFixed(2)}`);
  console.log(`After Coupon (${customer.couponCode}): $${afterCoupon.toFixed(2)}`);
  console.log(`Tax (8.5%): $${tax.toFixed(2)}`);
  console.log(`Total: $${finalTotal.toFixed(2)}`);
}
console.log("\n--- One Product (for...in) ---");
const sampleProduct = products[0];
for (let key in sampleProduct) {
  console.log(`${key}: ${sampleProduct[key]}`);
}
console.log("\n--- All Products After Inventory Update ---");
for (let [index, product] of Object.entries(products)) {
  const { sku, name, inventory } = product;
  console.log(`Product ${+index + 1}: ${sku} - ${name} | Inventory: ${inventory}`);
}
console.log("\n--- LOW STOCK ALERT ---");
for (let product of products) {
  if (product.inventory <= 3) {
    console.log(`LOW STOCK: ${product.name} (SKU: ${product.sku}) - Only ${product.inventory} left`);
  }
}
