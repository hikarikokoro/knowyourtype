import {IPatient} from './patients.interface';

export class Patient implements IPatient {
  private _id: number;
  private _name: string;
  private _description: string;

  constructor(id: number, name: string, description: string) {
    if (!id) {
      return;
    }
    this._id = id;
    this._name = name;
    this._description = description;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public static fromJSON(doctor: IPatient): Patient {
    if (!doctor) {
      return;
    }
    const newPatient: Patient = new Patient(
      doctor.id,
      doctor.name,
      doctor.description
    );

    return newPatient;
  }

  public toJSON(leaderboard: Patient): IPatient {
    if (!leaderboard) {
      return;
    }
    const json: IPatient = {
      id: leaderboard.id,
      name: leaderboard.name,
      description: leaderboard.description
    };

    return json;
  }

}
