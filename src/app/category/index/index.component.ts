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

  sampleModel : SampleModel[] | undefined;

  ngOnInit(): void {
    this.sampleModel = this.getSampleModel();
  }

  getSampleModel(): SampleModel[] {
    let mockSampleModel: SampleModel[] = [
      {
        id: 1,
        first: "John",
        last: "Doe",
        handle: "USA",
      },{
        id: 2,
        first: "Joseph",
        last: "Cruz",
        handle: "PH",
      },
      {
        id: 3,
        first: "Markd",
        last: "Cruz",
        handle: "PH",
      },
      ];
    return mockSampleModel;
  }



}
