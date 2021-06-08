/* 
* Functions to migrate the data store after an upgrade
*/

export const migrate = () => {
    console.log("Migrating data store...");
    const version = get_data_version();
    migrations.forEach(fn => fn(version))
}

const get_data_version = () => {
    const version = localStorage.getItem("dataVersion");
    if (version === null) {
        return '1';
    } else {
        return version;
    }
}

const set_data_version = (version: string) => {
    localStorage.setItem("dataVersion", version);
}

const migrations = [
    (version: string) => {
        if (version < '2') {
            console.log("Migrating to version 2");
            /*
              move test results into the tests property
            */
            const state = localStorage.getItem('state');
            if (state) {
                const {patients, currentPatient} = JSON.parse(state);
                const newPatients = patients.map((patient: any) => {
                    return {
                            name: patient.name,
                            date: patient.date ? patient.date : new Date().toISOString(),
                            location: patient.location,
                            reminder: patient.reminder,
                            tests: [{
                                date: patient.date, 
                                questions: patient.questions,
                                pictures: patient.pictures
                            }]
                        }
                });
                localStorage.setItem('state', JSON.stringify({patients: newPatients, currentPatient}));
            }
            set_data_version('2')
        }
    }
]
