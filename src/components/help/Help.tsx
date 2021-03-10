import { RouteComponentProps } from "@reach/router";
import {Card} from 'react-onsenui';


const Help = (props: RouteComponentProps) => {
    return (
        <div>
            <Card>
        <p>Help text here.</p> 
        <p>On emerging from coma, head-injured patients experience 
            what is called post-traumatic amnesia (PTA). It represents a stage of 
            recovery during which one's orientation and memory for ongoing events remains poor.</p>
        

            <a target='new' href="https://www.mq.edu.au/about/about-the-university/faculties-and-departments/medicine-and-health-sciences/departments-and-centres/department-of-psychology/westmead-pta-resources/_nocache">View Online Resources</a>
            </Card>
            </div>
    )
}


export default Help;