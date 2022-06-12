import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { continents, countries } from 'countries-list';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { TripData } from 'src/app/services/trip.service';

@Component({
  selector: 'app-new-trip-region-select',
  templateUrl: './new-trip-region-select.component.html',
  styleUrls: ['./new-trip-region-select.component.scss'],
})
export class NewTripRegionSelectComponent implements OnInit {
  @Input() public tripData: TripData | undefined;

  // Component emitters
  @Output() public previousStepEmitter = new EventEmitter<void>();
  @Output() public nextStepEmitter = new EventEmitter<{
    continents: string[];
    countries: string[];
  }>();

  // Form variables
  public regionFormGroup: FormGroup;

  // Autocomplete
  public continentList: any[] = Object.entries(continents);
  public continentsSelected: string[] = [];
  public filteredContinents: Observable<any[]>;

  public countryList: any[] = [];
  public countriesSelected: string[] = [];
  public filteredCountries: Observable<any[]>;

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('continentInput') continentInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  @ViewChild('countryInput') countryInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.regionFormGroup = this.formBuilder.group({
      continentCtrl: ['', Validators.required],
      countryCtrl: ['', Validators.required],
    });

    this.filteredContinents = this.regionFormGroup.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filterContinent(value))
    );

    this.filteredCountries = this.regionFormGroup.valueChanges.pipe(
      startWith(''),
      map((value: any) => this._filterCountry(value))
    );
  }

  ngOnInit(): void {
    if (this.tripData?.countries)
      this.countriesSelected = this.tripData!.countries;
    if (this.tripData?.continents)
      this.continentsSelected = this.tripData!.continents;
  }

  public goBack(): void {
    this.previousStepEmitter.emit();
  }

  public goNext(): void {
    this.nextStepEmitter.emit({
      continents: this.continentsSelected,
      countries: this.countriesSelected,
    });
  }

  //--------------------------------------------------
  // FORM LOGIC
  //--------------------------------------------------

  public removeContinent(cont: string): void {
    const index = this.continentsSelected.indexOf(cont);

    if (index >= 0) {
      this.continentsSelected.splice(index, 1);
    }

    // Update the country list
    const continentCodeArray: string[] = [];
    this.continentsSelected.forEach((cont: string) => {
      const continentIndex = Object.values(continents).indexOf(cont);
      continentCodeArray.push(Object.keys(continents)[continentIndex]);
    });

    // Find countries from the continent codes
    this.countryList = [];
    Object.entries(countries).find((c) => {
      if (continentCodeArray.includes(c[1].continent)) this.countryList.push(c);
    });
  }

  public addContinent(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) this.continentsSelected.push(value);

    // Clear the input value
    this.regionFormGroup.patchValue(
      { continentCtrl: null },
      { emitEvent: false }
    );
    event.chipInput!.clear();
  }

  public selectedContinent(event: MatAutocompleteSelectedEvent): void {
    this.continentsSelected.push(event.option.viewValue);
    this.regionFormGroup.patchValue(
      { continentCtrl: null },
      { emitEvent: false }
    );
    this.continentInput!.nativeElement.value = '';

    // Add the corresponding countries from that continent to the countriesArray
    const continentCodeArray: string[] = [];
    this.continentsSelected.forEach((cont: string) => {
      const continentIndex = Object.values(continents).indexOf(cont);
      continentCodeArray.push(Object.keys(continents)[continentIndex]);
    });

    // Find countries from the continent codes
    this.countryList = [];
    Object.entries(countries).find((c) => {
      if (continentCodeArray.includes(c[1].continent)) this.countryList.push(c);
    });
  }

  public removeCountry(country: string): void {
    const index = this.countriesSelected.indexOf(country);

    if (index >= 0) {
      this.countriesSelected.splice(index, 1);
    }
  }

  public addCountry(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) this.countriesSelected.push(value);

    // Clear the input value
    this.regionFormGroup.patchValue(
      { countryCtrl: null },
      { emitEvent: false }
    );
    event.chipInput!.clear();
  }

  public selectedCountry(event: MatAutocompleteSelectedEvent): void {
    this.countriesSelected.push(event.option.viewValue);
    this.regionFormGroup.patchValue(
      { countryCtrl: null },
      { emitEvent: false }
    );
    this.countryInput!.nativeElement.value = '';
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
    if (name.countryCtrl && typeof name.countryCtrl === 'string') {
      const filterValue = name.countryCtrl.toLowerCase();
      return this.countryList.filter((option: any) =>
        option[1].name.toLowerCase().includes(filterValue)
      );
    } else {
      return [];
    }
  }
}
