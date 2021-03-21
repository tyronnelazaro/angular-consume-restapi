import { Component, OnInit } from '@angular/core';
import { RestapiService, Convertedtime } from '../restapi.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css']
})
export class TimeComponent implements OnInit {

  timeconvert: Convertedtime;
  timeconverted: Convertedtime;


  constructor(
    public restapi: RestapiService,
    private router: Router) { }


  ngOnInit(): void {
    this.restapi.getServertime().subscribe((resp: any) => {
      this.timeconvert = resp;
      console.log(this.timeconvert);


    this.restapi.getConvertedtime(this.timeconvert.epoch).subscribe((resp: any) => {
      this.timeconverted = resp;
      console.log(this.timeconverted);
    })});
  }
}
