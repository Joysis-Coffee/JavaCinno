import {Component, Inject, OnInit} from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryModel} from "../categoryModel";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  isSubmitting = false;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CategoryModel,
    private dialogRef: MatDialogRef<CreateComponent>,
    private snackBar: MatSnackBar,
    public categoryService: CategoryService,
    private router: Router
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      small_price: new FormControl('', [Validators.required]),
      medium_price: new FormControl('', [Validators.required]),
      large_price: new FormControl('', [Validators.required]),
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
  submit(){
    if (!this.form.invalid) {
      console.log(this.form.value);
      this.categoryService.create(this.form.value).subscribe((res:any) => {
        console.log('Product created successfully!');
        this.dialogRef.close();
        this.snackBar.open('Product created successfully!', '', {
          duration: 3000
        });
      }, (error:any) => {
        console.log(error);
        this.snackBar.open('Product created failed!' + error, '', {duration: 3000});

      });
    }else {
      console.log('Product created failed!');
      this.snackBar.open('Product created failed!', '', {
        duration: 3000
      });
    }


  }


}
