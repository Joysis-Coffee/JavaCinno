import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {CashierService} from "../../services/cashier.service";
import {cashierModel} from "../../services/model/cashier-model";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-update-cashier',
  templateUrl: './update-cashier.component.html',
  styleUrl: './update-cashier.component.css'
})
export class UpdateCashierComponent implements OnInit {
  id!: number;
  category!: cashierModel;
  form!: FormGroup;
  isSubmitting = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: cashierModel,
    private dialogRef: MatDialogRef<UpdateCashierComponent>,
    public cashierService: CashierService,
    private snackBar: MatSnackBar,
  ) {
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.data.id;
    this.cashierService.find(this.id).subscribe((data: cashierModel) => {
      this.category = data;
    });

    this.form = new FormGroup({
      user_name: new FormControl('', [Validators.required]),
      full_name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),

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
        console.error('Cashier ID is undefined');
        this.snackBar.open('Cashier ID is undefined', 'Close', { duration: 3000 });
        this.isSubmitting = false;
        return;
      }

      this.cashierService.update(this.id, this.form.value).subscribe({
        next: (res) => {
          console.log('Cashier updated successfully!');
          this.snackBar.open('Cashier updated successfully!', 'Close', { duration: 3000 });
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
