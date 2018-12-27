
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { FlightsService } from "../service/flights.service";
//import {SearchService} from './search.service';
import { Subscription } from 'rxjs/Subscription';
//import { SearchCardComponent } from '../app/search-card.component';
import { SearchCardInterface } from './search-card.interface';
import { HttpErrorResponse } from "@angular/common/http";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loader;
  @ViewChild('picker') picker;

  @ViewChild('actDest')
  actDest: any;
  actArrDate:any;
  actRetDate:any;

  fullImagePath: string;
  rangeSliderDetails: any;
  subscription: Subscription;
  results: object;
  model: SearchCardInterface;
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 10000;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  selectedValue: any = 0;
  vertical = false;
  origin: any;
  destination: any;
  showDepart:boolean;
  showReturn:boolean;

  constructor(private router: Router, private flightService: FlightsService) {
    
  this.actArrDate = 0;
  this.actRetDate = 1;
  this.showDepart = false;
  this.showReturn = false;

  }

  ngOnInit() {

    this.model = {
      tripType: '0', origin: 'Bangalore', destination: 'Hyderabad', departureDate: new Date(),
      arrivalDate: new Date()
    };

    //this.fieldName1.nativeElement.focus();
  }

  // open() {
  //   this.picker.open();
  // }

  onOriginChange(searchValue : string ) {
    console.log("data"+searchValue); 
    if(searchValue == "Bangalore") {
      this.actDest.nativeElement.focus();
    } 
  }

  onDestinationChange(searchValue : string) {
    console.log("data"+searchValue); 
    if(searchValue == "Hyderabad") {
      this.showDepart = true;
    }
  }

  updateCalcs(event){
    this.showReturn = true;
  }

  onSubmit() {
    this.loader = true;
    this.flightService.getDetails().subscribe(response => {
      this.loader = false;
      this.results = response;
      this.origin = response.onwardflights[0].origin;
      this.destination = response.onwardflights[0].destination;
      this.fullImagePath = '../../assets/images/Flight.png'
    }), (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("client side error");
      } else {
        console.log("server side error..");
      }
    }
  }

  public Logout() {
    this.router.navigate(['login']);
  }

  public flightBook(data) {
    this.router.navigate(['book', data.origin, data.destination, data.date, data.fare]);
  }

  // public activateDest(){
  //   console.log("dest function");
  //   this.actDest.nativeElement.focus();
  // }

  public onChangeRange($event) {
    console.log("data" , $event.value);
    this.selectedValue = $event.value;
  }

}
