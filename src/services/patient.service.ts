import {Injectable} from '@angular/core';
import * as patients from '../tools/patients.json';
import {Patient} from '../tools/patients';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  //#region Constructors

  constructor() {
  }

  //#endregion

  //#region Private Functions

  public getById(id: number): Patient {
    return Patient.fromJSON(patients.patients[id - 1]);
  }

  public get(): Patient[] {
   return _.forEach(patients.patients, (patient) => {
      return Patient.fromJSON(patient);
    });
  }

  //#endregion
}
