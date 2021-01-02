import React from 'react';
import { RouteComponentProps, navigate} from "@reach/router"
import { Box, Button } from 'grommet';
import './Home.css';

function Home(props: RouteComponentProps) {


    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if (event.currentTarget.dataset.path) {
            navigate(event.currentTarget.dataset.path);
        }
    };


  return (
    <div className="Home">
        <Box justify="center" align="center" pad="medium" gap="medium">
            <Box
                border
                justify="center"
                alignSelf="center"
                height="250px"
                width="250px"
                >
                <Button fill label="New Patient" onClick={onClick} {...props} data-path="/newpatient"/>
            </Box>

            <Box
                border
                justify="center"
                alignSelf="center"
                align="center"
                height="250px"
                width="250px"
                >
                <Button label="Review Patients" fill onClick={onClick} data-path='/listpatients' />
            </Box>

        </Box>
    </div>
  );
}

export default Home;


// import React from 'react';

// import { grommet, Box, Button, Grommet } from 'grommet';

// export const Home = (props: RouteComponentProps) => (
//   <Grommet theme={grommet}>
//     <Box pad="medium" justify="center" direction="row">
//       <Box justify="center" align="center" pad="medium" gap="medium">
//         <Box
//           border
//           justify="center"
//           align="center"
//           height="100px"
//           width="300px"
//         >
//           <Button label="False" onClick={() => {}} {...props} />
//         </Box>
//         <Box
//           border
//           justify="center"
//           align="center"
//           height="100px"
//           width="300px"
//         >
//           <Button label="True" fill onClick={() => {}} {...props} />
//         </Box>
//         <Box
//           border
//           justify="center"
//           align="center"
//           height="100px"
//           width="300px"
//         >
//           <Button
//             label="Horizontal"
//             fill="horizontal"
//             onClick={() => {}}
//             {...props}
//           />
//         </Box>
//         <Box
//           border
//           justify="center"
//           align="center"
//           height="100px"
//           width="300px"
//         >
//           <Button
//             label="Vertical"
//             fill="vertical"
//             onClick={() => {}}
//             {...props}
//           />
//         </Box>
//       </Box>

//       <Box
//         pad="medium"
//         justify="center"
//         align="center"
//         height="700px"
//         width="300px"
//         gap="medium"
//       >
//         <Button label="False" onClick={() => {}} {...props} />
//         <Button label="True" fill onClick={() => {}} {...props} />
//         <Button
//           label="Horizontal"
//           fill="horizontal"
//           onClick={() => {}}
//           {...props}
//         />
//         <Button
//           label="Vertical"
//           fill="vertical"
//           onClick={() => {}}
//           {...props}
//         />
//       </Box>
//     </Box>
//   </Grommet>
// );

// export default Home;
