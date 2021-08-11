import { RouteComponentProps } from "@reach/router";
import {Card} from 'react-onsenui';


const Help = (props: RouteComponentProps) => {
    return (
        <div>
            <Card> 
            This app is intended for use by clinicians familiar with the 
            Abbreviated-Westmead PTA Scale (A-WPTAS). When combined with a 
            standardised GCS assessment it provides an objective measure of 
            post-traumatic amnesia (PTA). The full administration and scoring 
            instructions are here&nbsp;          
            <a target='new' href="https://www.mq.edu.au/about/about-the-university/faculties-and-departments/medicine-and-health-sciences/departments-and-centres/department-of-psychology/glasgow-coma-scale-gcs-and-abbreviated-westmead-pta-scale-a-wptas">A-WPTAS Administration</a>

            <p>This app allows you to record the responses of individual patients
                by following the prompt screens.  You are prompted with the text 
                of questions to the patient and can record whether they successfully
                answer the question or not.  Images are displayed for the patient
                to remember and you can set a reminder for a time to perform the 
                recall test.  
            </p>

            <p>You are prompted for a patient name and location. These are used
                only as a mnemonic device so that you can identify the patient
                at a later time.  The time of the test is automatically recorded.
                You don't need to use real names or locations if you don't wish
                to do so. 
            </p>

            <p>Individual patient results are stored on your device only and no 
                information is sent to any server or stored on any other system. 
                This means that you are responsible for the privacy of patient 
                data stored on your device.  It also means that if your device fails 
                in some way then this data will be lost.  This is not intended 
                as an archival store of patient information. 
            </p>

            <a target='new' href="https://www.mq.edu.au/about/about-the-university/faculties-and-departments/medicine-and-health-sciences/departments-and-centres/department-of-psychology/westmead-pta-resources">View Online Resources</a>
            </Card>
            </div>
    )
}


export default Help;