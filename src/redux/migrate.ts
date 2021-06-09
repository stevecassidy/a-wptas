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
              remove any existing data
            */
            const state = localStorage.getItem('state');
            if (state) {
                localStorage.setItem('state', JSON.stringify({patients: [], currentPatient: -1}));
            }
            set_data_version('2')
        }
    }
]
