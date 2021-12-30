import { StepperOrientation } from '@angular/cdk/stepper';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewTripData } from '../dashboard/dashboard.component';
import { continents, countries, getEmojiFlag } from 'countries-list';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.scss'],
})
export class NewTripComponent implements OnInit {
  public isLinear = false;
  public orientation: StepperOrientation = 'vertical';

  public continentList: any[] = Object.entries(continents);
  public continentsSelected: any[] = [];
  public filteredContinents: Observable<any[]>;
  public countryList = [];
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('continentInput') continentInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  public stepOneGroup: FormGroup;
  public stepTwoGroup: FormGroup;

  public newTripForm = new FormGroup({
    tripName: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    linkedUsers: new FormControl('', [Validators.required]),
    bucketList: new FormControl(''),
    allowance: new FormControl(''),
    dates: new FormControl(''),
    reservations: new FormControl(''),
  });

  constructor(
    public dialogRef: MatDialogRef<NewTripComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewTripData,
    private formBuilder: FormBuilder
  ) {
    this.stepOneGroup = this.formBuilder.group({
      tripName: ['', Validators.required],
    });

    this.stepTwoGroup = this.formBuilder.group({
      continentCtrl: ['', Validators.required],
    });

    this.filteredContinents = this.stepTwoGroup.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filter(value))
    );
  }

  ngOnInit(): void {
    console.log('this is the input data from the parent dtata', this.data);

    // How to find any country depending on the continent
    const continentArray: string[] = ['EU'];
    const countryArray: any[] = [];
    Object.entries(countries).find((c) => {
      if (continentArray.includes(c[1].continent)) countryArray.push(c);
    });
    console.log(countryArray);
  }

  public remove(cont: string): void {
    const index = this.continentsSelected.indexOf(cont);

    if (index >= 0) {
      this.continentsSelected.splice(index, 1);
    }
  }

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) this.continentsSelected.push(value);

    // Clear the input value
    this.stepTwoGroup.patchValue({continentCtrl: null}, {emitEvent: false});
    event.chipInput!.clear();
    console.log(this.stepTwoGroup.get('continentCtrl')?.value)
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    this.continentsSelected.push(event.option.viewValue);
    this.stepTwoGroup.patchValue({continentCtrl: null}, {emitEvent: false});
    this.continentInput!.nativeElement.value = '';
    console.log('yo', this.stepTwoGroup.get('continentCtrl')?.value)
  }

  private _filter(name: any): any[] {
    console.log(name, this.filteredContinents)
    if (name.continentCtrl && typeof name.continentCtrl === 'string') {
      const filterValue = name.continentCtrl.toLowerCase();
      return this.continentList.filter((option: any) =>
        option[1].toLowerCase().includes(filterValue)
      );
    } else {
      return [];
    }
  }
}
