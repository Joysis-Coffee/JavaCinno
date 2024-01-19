import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogActions, MatDialogContent} from "@angular/material/dialog";
import {MatFormField} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBar} from "@angular/material/snack-bar";

@NgModule({
  declarations: [IndexComponent, ViewComponent, CreateComponent, EditComponent],
    imports: [
        CommonModule,
        CategoryRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogActions,
        MatDialogContent,
        MatFormField,
        MatInputModule,
    ]
})
export class CategoryModule { }
