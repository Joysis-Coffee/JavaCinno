import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { CategoryModel } from '../categoryModel';
import {MatDialog} from "@angular/material/dialog";
import {ViewComponent} from "../view/view.component";
import {EditComponent} from "../edit/edit.component";
import {CreateComponent} from "../create/create.component";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  categories: CategoryModel[] = [];
  private unsubscribe$ = new Subject();

  constructor(public categoryService: CategoryService,
              public dialog: MatDialog,
              ) { }

  ngOnInit(): void {
    this.categoryService.fetchCategories();
    this.categoryService.categories$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: CategoryModel[]) => {
      this.categories = data;
    });

    // Fetch initial data
    this.categoryService.refreshCategoriesList();
  }

  ngOnDestroy() {
    // Trigger the unsubscribe
    this.unsubscribe$.next(undefined);
    this.unsubscribe$.complete();
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


  /**
   * Edit inventory Modal
   * @param category
   */
  editInventory(category: CategoryModel) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '50vw',
      data: { ...category}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  /**
   * Add inventory
   */

  addInventory() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '50vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }



}
