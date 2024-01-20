// size-quantity-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-size-quantity-dialog',
  templateUrl: './size-quantity-dialog.component.html',
  styleUrls: ['./size-quantity-dialog.component.css']
})
export class SizeQuantityDialogComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SizeQuantityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      size: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
