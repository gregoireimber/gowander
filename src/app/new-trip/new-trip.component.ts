import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewTripData } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
})
export class NewTripComponent implements OnInit {

  public isLinear = true;
  public orientation: StepperOrientation = "vertical";
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewTripComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewTripData,
    private formBuilder: FormBuilder
  ) {

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    console.log('this is the dtata', this.data);
  }
}
