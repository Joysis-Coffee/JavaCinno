import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { CategoryModel } from '../categoryModel';
import {SampleModel} from "./sample-model";
import {MatDialog} from "@angular/material/dialog";
import {ViewComponent} from "../view/view.component";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  categories: CategoryModel[] = [];

  constructor(public categoryService: CategoryService,
              public dialog: MatDialog,
              ) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((data: CategoryModel[])=>{
      this.categories = data;
      console.log(this.categories);
    })
  }

  deleteCategory(id:number){
    if(confirm("Are you sure to delete this record?"))
      this.categoryService.delete(id).subscribe(res => {
        this.categories = this.categories.filter(item => item.id !== id);
        alert("Record deleted successfully")
        console.log('Product deleted successfully!');
      })
  }


  viewInvetory(category: CategoryModel) {
    const dialogRef = this.dialog.open(ViewComponent, {
      width: '50vw',
      data: {...category}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



}
