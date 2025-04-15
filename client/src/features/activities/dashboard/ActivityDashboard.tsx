import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
export default function ActivityDashboard() {
 
  return (
    <Grid2 container spacing={3}>
        <Grid2 size = {7}>
            {/* <List>
            {props.activities.map((activity) => (
            <ListItem key = {activity.id}>
                <ListItemText>
                {activity.title}
                </ListItemText>  
            </ListItem>
            ))}
        </List> */}
        <ActivityList
        //  activities={activities}
        //  selectActivity={selectActivity}
     />
        </Grid2>
        
     <Grid2 size = {5}> 
      Activity filter
          {/* {selectedActivity && !editMode && <ActivityDetail
           selectedActivity={selectedActivity}
           cancelSelectActivity={cancelSelectActivity}
           openForm={openForm}/>
           }
           {editMode && 
           <ActivityForm 
           closeForm ={closeForm} 
           activity = {selectedActivity}
           />
           } */}
        </Grid2> 
    </Grid2>
  )
} 