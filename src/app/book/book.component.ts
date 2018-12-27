import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from "../service/book.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  bookForm: FormGroup;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  origin: any;
  destination: any;
  date: any;
  fare: any;
  private sub: any;

  constructor(private route: ActivatedRoute, private service: BookService, private router: Router, public formBuilder: FormBuilder, private toastr: ToastrService) {

  }

  ngOnInit() {

    this.bookForm = this.formBuilder.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.required],
      'gender': ['', Validators.required],
      'number': ['', Validators.compose([Validators.required, Validators.minLength(10)])],

    });

    this.sub = this.route.params.subscribe(params => {
      this.origin = params['origin'];
      this.destination = params['destination'];
      this.date = params['date'];
      this.fare = params['fare'];
    });
  }

  onBookFormSubmit(data: any) {
    data.origin = this.origin;
    data.destination = this.destination;
    data.date = this.date;
    data.fare = this.fare;
    this.service.saveBookingData(data).subscribe(response => {
      this.toastr.success('Ticket Booked Successfully!', 'Success!');
      this.router.navigate(['']);
    }), (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        console.log("client side error");
      } else {
        console.log("server side error..");
      }
    }
  }

}
