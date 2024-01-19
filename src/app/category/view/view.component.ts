import {Component, Inject, OnInit} from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../services/model/product-model';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: number;
  category!: ProductModel;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductModel,
    private dialogRef : MatDialogRef<ViewComponent>,
    public categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
   ) {
    console.log(data);
  }


  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['categoryId'];

    this.categoryService.find(this.id).subscribe((data: ProductModel)=>{
      this.category = data;
    });


  }

}
