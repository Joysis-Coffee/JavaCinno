import { Component, OnInit } from '@angular/core';
import { queeingModel } from './queeing-model';

@Component({
  selector: 'app-queeing',
  templateUrl: './queeing.component.html',
  styleUrl: './queeing.component.css'
})
export class QueeingComponent implements OnInit {

  model : queeingModel[] | undefined;

  ngOnInit(): void {
    this.model = this.getData();
  }
  getData(): queeingModel[] {
    const data: queeingModel[] = [
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
