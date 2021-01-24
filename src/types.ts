
export interface Patient {
    name: string,
    location: string,
    questions: Array<boolean>,
    pictures: number,
    reminder: number,
}

export interface StateType {
    patients: Array<Patient>,
    currentPatient: number 
}

export interface ActionType { 
    type?: string ; 
    value?: Patient; 
    index?: number; 
    score?: number;
  }
