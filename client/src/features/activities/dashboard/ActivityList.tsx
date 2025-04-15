import { Box, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";
// type Props = {
//     activities : Activity[]
//     selectActivity: (id: string) => void;
// };
export default function ActivityList() {
  const{activities, isPending} = useActivities();
  if(!activities || isPending) return <Typography>Loading...</Typography>
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {activities.map(activity => (
            <ActivityCard 
            activity = 
            {activity} key = {activity.id}
            
            />
        ))}
    </Box>
  )
};