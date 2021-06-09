
// needs to be the location on first load...will this work? 
const BASE_URL = process.env.PUBLIC_URL;

const r = (path: string) => BASE_URL + '/' + path; 

const urls = {
    home: r(''),
    newpatient: r('newpatient'),
    screening: r('screening'),
    questions: r('questions'),
    images: r('images'),
    imageresponse: r('imageresponse'),
    imagegrid: r('imagegrid'),
    listpatients: r('listpatients'),
    patientreport: r('patientreport'),
    setreminder: r('setreminder'),
    help: r('help')
};

export default urls;
