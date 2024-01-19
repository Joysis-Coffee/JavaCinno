import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  // Arrays and variables to manage products, cart, and total
  products: Product[] = [];
  cart: CartItem[] = [];
  total: number = 0;
  cartItems: string[] = [];
  totalDisplay: string = '₱0.00';

  constructor() {}

  ngOnInit(): void {
    // Initialize the products array here
    this.products = [
    
    // Product data with id, name, and category
      { id: 'coffee1', name: 'Latte', category: 'Espresso' },
      { id: 'coffee2', name: 'Mocha', category: 'Espresso' },
      { id: 'coffee3', name: 'Caramel Machiatto', category: 'Espresso' },
      { id: 'coffee3', name: 'Capuccino', category: 'Espresso' },
      { id: 'coffee3', name: 'Americano', category: 'Espresso' },
      { id: 'coffee4', name: 'Iced Latte', category: 'Cold-drinks' },
      { id: 'coffee4', name: 'Iced Mocha', category: 'Cold-drinks' },
      { id: 'coffee4', name: 'Iced Americano', category: 'Cold-drinks' },
      { id: 'coffee4', name: 'Iced Coffee', category: 'Cold-drinks' },
      { id: 'coffee4', name: 'Frozen Latte', category: 'Cold-drinks' },
      { id: 'tea1', name: 'Hot Tea', category: 'Tea-cocoa' },
      { id: 'tea2', name: 'Iced Tea', category: 'Tea-cocoa' },
      { id: 'cocoa1', name: 'Hot Cocoa', category: 'Tea-cocoa' },
    ];
  }

  // Function to handle selecting size options for a product
  showSizeOptions(product: Product): void {

    // Define size options and their corresponding prices
    const sizeOptions = ['Small', 'Medium', 'Large'];
    const priceMap: Record<string, number> = {
      'Small': 20,
      'Medium': 30,
      'Large': 40,
    };
  
    const sizesText = sizeOptions.join(', ');
  
     // Prompt user to choose a size
    const sizePrompt = window.prompt(`Choose size for ${product.name} (${sizesText}):`);
  
    if (sizePrompt && sizeOptions.includes(sizePrompt)) {
     // If a valid size is chosen, add the product to the cart and update UI
      const selectedSize = sizePrompt;
      const selectedPrice = priceMap[selectedSize];
      this.addToCart({ ...product, size: selectedSize, quantity: 1, price: selectedPrice });
      this.updateCartUI();
    } else {

     // Display an alert for an invalid size selection
      alert('Invalid size selection.');
    }
  }

  // Function to add a product to the cart
  addToCart(product: CartItem): void {
    const existingItem = this.cart.find(item => item.id === product.id && item.size === product.size);

    if (existingItem) {
  // If the item already exists in the cart, increment the quantity
      existingItem.quantity += 1;
    } else {
    // If it's a new item, add it to the cart
      this.cart.push(product);
    }

    // Update the total price
    this.total += product.price;
  }

  // Function to update the UI with cart items and total
  updateCartUI(): void {
    this.cartItems = this.cart.map(item => {
      const sizeInfo = item.size ? ` - Size: ${item.size}` : ''; // Include size information if available
      return `${item.name} x${item.quantity}${sizeInfo} - ₱${(item.price * item.quantity).toFixed(2)}`;
    });
  
    this.totalDisplay = `₱${this.total.toFixed(2)}`;
  }

  // Function to get products by category
  getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => product.category === category);
  }

  // Arrays and function to get unique categories
  categories: string[] = [];
  getUniqueCategories(): string[] {
    return Array.from(new Set(this.products.map(product => product.category)));
  }


// Function to handle payment
  onPay(): void {
    const customerName = window.prompt('Enter customer name:');
  
    if (customerName) {
      console.log(`Payment logic for ${customerName} goes here`);
  
      // Log information about the order
      this.cart.forEach(item => {
        const confirmationMessage = window.confirm(`Confirm order:\n\nProduct: ${item.name}\nQuantity: ${item.quantity}\nSize: ${item.size}`);
  
        if (confirmationMessage) {
          console.log(`Order confirmed for ${item.name} - Quantity: ${item.quantity}, Size: ${item.size}`);
        } else {
          console.log(`Order canceled for ${item.name} - Quantity: ${item.quantity}, Size: ${item.size}`);
        }
      });
  
    // Display payment success message, then reset the order
      alert(`Payment successful for ${customerName}!`);
  
      // Reset the order
      this.cart = [];
      this.total = 0;
      this.cartItems = [];
      this.totalDisplay = '₱0.00';
    } else {
      alert('Payment canceled.');
    }
  }
}

// Interface for defining product properties
interface Product {
  id: string;
  name: string;
  category: string;
}

// Interface for defining cart item properties, extending the Product interface
interface CartItem extends Product {
  quantity: number;
  size?: string;
  price: number;
}