import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {dashboardModel} from "../../services/model/dashboard-model";
import {SalesModel} from "../../services/model/sales.model";
import {SalesService} from "../../services/sales.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: 'app-sales.modal',
  templateUrl: './sales.modal.component.html',
  styleUrl: './sales.modal.component.css'
})
export class SalesModalComponent implements OnInit {
  displayedColumns: string[] = ['itemName', 'size', 'price', 'subtotal'];
  salesItems:  SalesModel[] | undefined;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: dashboardModel,
    public dialogContent: MatDialogRef<SalesModalComponent>,
  ) {
    this.salesItems = data.salesItems;
  }




  printContent(): void {

    const contentToPrint = document.getElementById('content-to-print');
    if (contentToPrint) {
      html2canvas(contentToPrint).then(canvas => {
        const data = canvas.toDataURL('image/png');

        // Create a new jsPDF instance
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: 'a4'
        });

        const imgProps= pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('transaction-details.pdf');
      });
    } else {
      console.error('Element #content-to-print not found!');
    }
  }

  ngOnInit(): void {

  }
}
