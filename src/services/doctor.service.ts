import {Injectable} from '@angular/core';
import {Doctor} from '../tools/doctor';
import * as doctors from '../tools/doctors.json';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  //#region Constructors

  constructor() {
  }

  //#endregion

  //#region Private Functions

  public getById(id: number): Doctor {
    return Doctor.fromJSON(doctors.doctors[id - 1]);
  }

  //#endregion
}
