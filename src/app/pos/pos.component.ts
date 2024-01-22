import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../services/model/product-model";
import {CategoryService} from "../services/category.service";
import {forkJoin, Subject, takeUntil} from "rxjs";
import {SizeQuantityDialogComponent} from "./size-quantity-dialog/size-quantity-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {PaymentDialogComponent} from "./payment-dialog/payment-dialog.component";
import {SalesService} from "../services/sales.service";
import {DashboardService} from "../services/dashboard.service";
import {SalesModalComponent} from "../sales/sales.modal/sales.modal.component";

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {
  private unsubscribe$ = new Subject();
  displayedColumns: string[] = ['Name', 'Quantity', 'Size', 'Price'];

  // Arrays and variables to manage products, cart, and total
  products: ProductModel[] = [];
  cart: CartItem[] = [];
  total: number = 0;
  cartItems: string[] = [];
  totalDisplay: string = '₱0.00';

  constructor(public categoryService: CategoryService,
              public dialog: MatDialog,
              public dashboardService: DashboardService,
              public salesService: SalesService
  ) {
  }

  ngOnInit(): void {
    // Initialize the products array here
    this.categoryService.fetchCategories();
    this.categoryService.categories$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: ProductModel[]) => {
        this.products = data;
      });

    // Fetch initial data
    this.categoryService.refreshCategoriesList();

  }

  ngOnDestroy() {
    // Trigger the unsubscribe
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
  }


  // Function to handle selecting size options for a product
// Replace showSizeOptions method with this
  showSizeOptions(product: ProductModel): void {
    const sizeOptions = ['Small', 'Medium', 'Large'];

    const dialogRef = this.dialog.open(SizeQuantityDialogComponent, {
      width: '250px',
      data: {sizeOptions: sizeOptions}
    });

    dialogRef.afterClosed().subscribe((result: { size: any; quantity: any; }) => {
      if (result) {
        const selectedSize = result.size;
        const quantity = Number(result.quantity); // Make sure to convert the quantity to a number
        let selectedPrice;

        switch (selectedSize) {
          case 'Small':
            selectedPrice = product.small_price;
            break;
          case 'Medium':
            selectedPrice = product.medium_price;
            break;
          case 'Large':
            selectedPrice = product.large_price;
            break;
          default:
            alert('Invalid size selection.');
            return;
        }

        this.addToCart({...product, size: selectedSize, quantity: quantity, price: selectedPrice * quantity}); // Notice the multiplication here
        this.updateCartUI();
      }
    });

  }

  // Function to add a product to the cart
// Function to add a product to the cart
  addToCart(product: CartItem): void {
    const existingItem = this.cart.find(item => item.id === product.id && item.size === product.size);

    if (existingItem) {
      // If the item already exists in the cart, increment the quantity
      existingItem.quantity += product.quantity;
      this.total += product.price * product.quantity;
    } else {
      // If it's a new item, add it to the cart
      this.cart.push(product);
      this.total += product.price * product.quantity;
    }
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
  getProductsByCategory(category: string): ProductModel[] {
    return this.products.filter(product => product.type === category);
  }

  // Arrays and function to get unique categories
  categories: string[] = [];

  getUniqueCategories(): string[] {
    return Array.from(new Set(this.products.map(product => product.type)));
  }

  onPay(): void {
    const dialogRef = this.dialog.open(PaymentDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.customerName && result.cashAmount !== undefined) {
        // Confirm each item in the cart
        let orderConfirmed = true;


        // If all items are confirmed, save the transaction
        if (orderConfirmed) {
          const transaction = {
            cashier: {id: 1},
            transactionDate: new Date(),
            cash: result.cashAmount,
            customer_name: result.customerName,
            change_amount: String(this.total - result.cashAmount), // Assuming cashAmount is a number
            time_served: "5 minutes",
            status: false,
            total: this.total,
          };

          // Save the transaction
          this.dashboardService.create(transaction).subscribe(
            savedTransaction => {
              // A
              const transactionId = savedTransaction.id;

              // Save sales objects
              const saveSalesObservables = this.cart.map(item => {
                const sale = {
                  transactionId: transactionId,
                  product: item,
                  size: item.size,
                  subtotal: item.price * item.quantity,
                  quantity: item.quantity,
                };
                return this.salesService.create(sale);
              });

              forkJoin(saveSalesObservables).subscribe(
                (salesResponses: any) => {
                  console.log('All sales saved', salesResponses);
                  // alert(`Payment successful for ${result.customerName}!`);
                    this.salesService.getTransactionWithDetails(transactionId).subscribe(
                      (dashboardData: any) => {
                        this.dialog.open(SalesModalComponent, {
                          data: { ...dashboardData }
                        });
                      },
                      (error: any) => {
                        console.error('Error fetching transaction details:', error);
                      }
                    );

                  this.resetCart();
                },
                salesError => {
                  console.error('Error saving sales', salesError);
                  alert('An error occurred while saving the sales.');
                }
              );
            },
            transactionError => {
              console.error('Error saving transaction', transactionError);
              alert('An error occurred while saving the transaction.');
            }
          );
        }
      } else {
        console.log('Payment canceled or incomplete information.');
      }
    });
  }

  resetCart(): void {
    this.cart = [];
    this.total = 0;
    this.cartItems = [];
    this.totalDisplay = '₱0.00';
  }


// Function to handle payment
}


// Interface for defining cart item properties, extending the Product interface
interface CartItem extends ProductModel {
  quantity: number;
  size?: string;
  price: number;
}
