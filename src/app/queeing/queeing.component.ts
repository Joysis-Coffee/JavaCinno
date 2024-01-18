import { Component, OnInit } from '@angular/core';
import { model } from './model';
import { SampleModel } from '../category/index/sample-model';

@Component({
  selector: 'app-queeing',
  templateUrl: './queeing.component.html',
  styleUrl: './queeing.component.css'
})
export class QueeingComponent implements OnInit {
  
  model : model[] | undefined;

  ngOnInit(): void {
    this.model = this.getData();
  }
  getData(): model[] {
    const data: model[] = [
      {
        id: 1,
        name: "Howard",
        transaction_date: 1-18-2024,
        time: 950,
      },
      // Add more objects as needed
    ];

    return data;
  }


}
