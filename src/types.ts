
export interface Patient {
    name: string,
    location: string,
    questions: Array<number>,
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
