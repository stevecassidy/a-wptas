
// needs to be the location on first load...will this work? 
const BASE_URL = window.location.pathname;

const r = (path: string) => BASE_URL + path; 

const urls = {
    home: r(''),
    newpatient: r('newpatient'),
    questions: r('questions'),
    images: r('images'),
    imageresponse: r('imageresponse'),
    listpatients: r('listpatients'),
    patientreport: r('patientreport'),
    setreminder: r('setreminder')
};

console.log(urls);

export default urls;
