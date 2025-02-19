import { Grid2 } from "@mui/material";
import ActivityList from "./ActivityList";
import ActivityDetail from "../details/ActivityDetail";

type Props = {
    activities : Activity[];
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    selectedActivity?: Activity;
}
export default function ActivityDashboard({
  activities,selectActivity,cancelSelectActivity,selectedActivity
  }: Props) {
    
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
         activities={activities}
         selectActivity={selectActivity}/>
        </Grid2>
        <Grid2 size = {5}> 
          {selectedActivity && <ActivityDetail
           activity={selectedActivity}
           cancelSelectActivity={cancelSelectActivity}/>}
        </Grid2>
    </Grid2>
  )
} 