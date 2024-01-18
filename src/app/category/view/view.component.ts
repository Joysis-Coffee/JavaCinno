import {Component, Inject, OnInit} from '@angular/core';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from '../categoryModel';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  id!: number;
  category!: CategoryModel;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CategoryModel,
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

    this.categoryService.find(this.id).subscribe((data: CategoryModel)=>{
      this.category = data;
    });


  }

}
