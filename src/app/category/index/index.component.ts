import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category';
import {SampleModel} from "./sample-model";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  categories: Category[] = [];

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((data: Category[])=>{
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


}
