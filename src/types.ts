export interface Patient {
    name: string;
    date: Date;
    location: string;
    tests: Array<TestResult>;
    reminder: string;
}

export interface TestResult {
    date: Date;
    questions: Array<boolean>;
    pictures: number;
}

export interface StateType {
    patients: Array<Patient>;
    currentPatient: number;
}

export interface ActionType { 
    type?: string; 
    patient?: Patient; 
    index?: number; 
    nvalue?: number;
    test?: TestResult;
  }
