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

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('continentInput') continentInput:| ElementRef<HTMLInputElement> | undefined;

  public filteredCountries: Observable<any[]>;
  public countryList: any[] = [];
  public countriesSelected: any[] = [];

  @ViewChild('continentInput') countryInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  public stepOneGroup: FormGroup;
  public stepTwoGroup: FormGroup;
  public stepThreeGroup: FormGroup;

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
      countryCtrl: ['', Validators.required],
    });

    this.stepThreeGroup = this.formBuilder.group({
    })

    this.filteredContinents = this.stepTwoGroup.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filterContinent(value))
    );

    this.filteredCountries = this.stepTwoGroup.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filterCountry(value))
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

  public removeContinent(cont: string): void {
    const index = this.continentsSelected.indexOf(cont);

    if (index >= 0) {
      this.continentsSelected.splice(index, 1);
    }
  }

  public addContinent(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) this.continentsSelected.push(value);

    // Clear the input value
    this.stepTwoGroup.patchValue({ continentCtrl: null }, { emitEvent: false });
    event.chipInput!.clear();
  }

  public selectedContinent(event: MatAutocompleteSelectedEvent): void {
    this.continentsSelected.push(event.option.viewValue);
    this.stepTwoGroup.patchValue({ continentCtrl: null }, { emitEvent: false });
    this.continentInput!.nativeElement.value = '';
    console.log(this.continentsSelected.includes(Object.values(continents)));
  }

  public removeCountry(country: string): void {
    const index = this.continentsSelected.indexOf(country);

    if (index >= 0) {
      this.continentsSelected.splice(index, 1);
    }
  }

  public addCountry(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) this.continentsSelected.push(value);

    // Clear the input value
    this.stepTwoGroup.patchValue({ continentCtrl: null }, { emitEvent: false });
    event.chipInput!.clear();
  }

  public selectedCountry(event: MatAutocompleteSelectedEvent): void {
    this.continentsSelected.push(event.option.viewValue);
    this.stepTwoGroup.patchValue({ continentCtrl: null }, { emitEvent: false });
    this.continentInput!.nativeElement.value = '';
  }

  private _filterContinent(name: any): any[] {
    if (name.continentCtrl && typeof name.continentCtrl === 'string') {
      const filterValue = name.continentCtrl.toLowerCase();
      return this.continentList.filter((option: any) =>
        option[1].toLowerCase().includes(filterValue)
      );
    } else {
      return [];
    }
  }

  private _filterCountry(name: any): any[] {
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
