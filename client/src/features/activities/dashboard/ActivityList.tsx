import { Box } from "@mui/material";
import ActivityCard from "./ActivityCard";
type Props = {
    activities : Activity[]
    selectActivity: (id: string) => void;
};
export default function ActivityList({activities,selectActivity} : Props) {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {activities.map(activity => (
            <ActivityCard 
            activity = 
            {activity} key = {activity.id} 
            selectActivity={selectActivity}
            
            />
        ))}
    </Box>
  )
};