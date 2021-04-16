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

  constructor(private coindesk: CoindeskService) {}

  ngOnInit(): void {
    let today: Date =  new Date()
    let from: Date = new Date()
    let to: Date = new Date()

    from.setUTCDate(today.getUTCDate() - 7)
    to.setUTCDate(today.getUTCDate() - 1)

    this.coindesk.getBpi(from, to).subscribe(bpi => {
      this.bpi = bpi
      let lr: LinearRegression = new LinearRegression(bpi)
      this.prediction = lr.predict(bpi.length)
    })
  }
}
