import { Component, OnInit } from '@angular/core';
import {JourneyService} from "../service/journey.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent implements OnInit {
  journeyHistory;
  constructor(private service:JourneyService) { 
    
  }

  ngOnInit() {
    this.service.getJourneyDetails().subscribe(response => {
      this.journeyHistory = response.data;
    }), (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("client side error");
      } else {
        console.log("server side error..");
      }
    }
  }

}
