
export interface Patient {
    name: string,
    date: Date,
    location: string,
    questions: Array<boolean>,
    pictures: number,
    reminder: string,
}

export interface StateType {
    patients: Array<Patient>,
    currentPatient: number 
}

export interface ActionType { 
    type?: string ; 
    value?: Patient; 
    index?: number; 
    nvalue?: number;
  }
