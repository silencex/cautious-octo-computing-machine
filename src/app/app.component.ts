import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CoindeskService } from './coindesk.service';
import { LinearRegression } from './linear-regression';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'btc-prediction';
  bpi: number[] = []
  prediction: number = 0

  chartData: any

  constructor(private coindesk: CoindeskService) {}

  ngOnInit(): void {
    let today: Date =  new Date()
    let from: Date = new Date(today)
    let to: Date = new Date(today)

    from.setUTCDate(today.getUTCDate() - 7)
    to.setUTCDate(today.getUTCDate() - 1)

    this.coindesk.getBpi(from, to).subscribe(bpi => {
      this.bpi = bpi
      let lr: LinearRegression = new LinearRegression(bpi)
      this.prediction = lr.predict(bpi.length)

      this.buildGraphData(from, lr)
    })
  }

  getFormattedDate(from: Date, days: number): string {
    let date = new Date(from)
    console.log(from.getUTCDate());
    
    date.setUTCDate(from.getUTCDate() + days)
    return formatDate(date, "yyyy-MM-dd", "en-US")
  }

  buildGraphData(from: Date, lr: LinearRegression) {
    let predictions = []
    for (let i = 0; i <= this.bpi.length; i++) {
      predictions.push({
        name: this.getFormattedDate(from, i), 
        value: lr.predict(i)
      })
    }

    this.chartData = [{
      name: "BTC Price",
      series: this.bpi.map((v, i) => ({
        name: this.getFormattedDate(from, i),
        value: v
      }))
    }, {
      name: "Prediction",
      series: predictions
    }]
  }
}
