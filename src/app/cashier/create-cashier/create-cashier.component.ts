import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {ProductModel} from "../../services/model/product-model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {cashierModel} from "../../services/model/cashier-model";
import {CashierService} from "../../services/cashier.service.service";

@Component({
  selector: 'app-create-cashier',
  templateUrl: './create-cashier.component.html',
  styleUrl: './create-cashier.component.css'
})
export class CreateCashierComponent implements OnInit {

  form!: FormGroup;
  isSubmitting = false;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(

    @Inject(MAT_DIALOG_DATA) public data: cashierModel,
    private dialogRef: MatDialogRef<CreateCashierComponent>,
    private snackBar: MatSnackBar,
    public cashierService: CashierService,
) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      user_name: new FormControl('', [Validators.required]),
      full_name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    if (this.data) {
    this.form.patchValue(this.data);
  }
}

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit() {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.cashierService.create(this.form.value).subscribe({
        next: (res) => {
          console.log('New Cashier created successfully!');
          this.cashierService.refreshCategoriesList(); // Refresh the categories list
          this.dialogRef.close();
          this.snackBar.open('New Cashier created successfully!', '', {
            duration: 3000
          });
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Product creation failed!', error);
          this.snackBar.open('Cashier creation failed! ' + error, '', {
            duration: 3000
          });
          this.isSubmitting = false;
        }
      });
    } else {
      console.error('Form is not valid.');
      this.snackBar.open('Form is not valid', '', {
        duration: 3000
      });
    }
  }

}
