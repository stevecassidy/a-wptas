export class Patient {
    name: string;
    date: string;
    location: string;
    tests: Array<TestResult>;
    reminder: string;

    constructor() {
        this.date = new Date().toISOString();
        this.reminder = '';
        this.tests = [];
        this.location = '';
        this.name = '';
    }

    newTest(): TestResult {
        const newTest = new TestResult();
        this.tests.push(newTest);
        return newTest;
    }

    lastTest(): TestResult {
        if (this.tests.length === 0) {
            console.log("lastTest making new test")
            this.tests.push(new TestResult())
        }
        return this.tests[this.tests.length-1];
    };

    updateLastTest(result: TestResult): void {
        this.tests.push(result); 
    }
}

export class TestResult {
    date: string;
    questions: Array<boolean>;
    pictures: number;

    constructor() {
        this.date = new Date().toISOString();
        this.questions = new Array<boolean>(5);
        this.pictures = 0;
    }
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
