import {Component, Inject, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductModel} from '../../services/model/product-model';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  category!: ProductModel;
  form!: FormGroup;
  isSubmitting = false;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductModel,
    private dialogRef: MatDialogRef<EditComponent>,
    public categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['categoryId'];

    this.categoryService.find(this.id).subscribe((data: ProductModel) => {
      this.category = data;
    });

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      small_price: new FormControl('', [Validators.required]),
      medium_price: new FormControl('', [Validators.required]),
      large_price: new FormControl('', [Validators.required]),
    });

    if (this.data) {
      this.id = this.data.id; // Get id from the dialog data
      this.form.patchValue(this.data);
    }

  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f() {
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit() {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      // Here we need to ensure `this.id` is not undefined
      if (this.id === undefined) {
        console.error('Product ID is undefined');
        this.snackBar.open('Product ID is undefined', 'Close', { duration: 3000 });
        this.isSubmitting = false;
        return;
      }

      this.categoryService.update(this.id, this.form.value).subscribe({
        next: (res) => {
          console.log('Product updated successfully!');
          this.snackBar.open('Product updated successfully!', 'Close', { duration: 3000 });
          this.dialogRef.close(res); // Pass the updated data back
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('There was an error updating the product', error);
          this.snackBar.open('There was an error updating the product', 'Close', { duration: 3000 });
          this.isSubmitting = false;
          this.dialogRef.close();
        }
      });
    } else {
      console.error('Form is not valid.');
      this.snackBar.open('Form is not valid', 'Close', { duration: 3000 });
    }
  }

}
