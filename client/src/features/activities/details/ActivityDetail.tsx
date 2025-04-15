import { useNavigate, useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import { Card, CardContent, Typography, CardActions, Button, CardMedia } from "@mui/material";

// type Props = {
//     selectedActivity: Activity
//     cancelSelectActivity: () => void;
//     openForm: (id:string) =>void;
    
// }
export default function ActivityDetail() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {activity, LoadingActivities} = useActivities(id) ;
    if(LoadingActivities) return <Typography>loading</Typography>
    if(!activity) return <Typography>Activity not found</Typography>
  return ( 
    <Card sx={{borderRadius: 3}}>
    <CardMedia component='img' src={`/Images/categoryImages/${activity.category}.jpg`}/>
    <CardContent>
        <Typography variant="h5">{activity.title}</Typography>
        <Typography variant="subtitle1" fontWeight="light">{activity.date}</Typography>
        <Typography variant="body1">{activity.description}</Typography>
    </CardContent> 
    <CardActions>
    <Button color="primary" onClick={() => navigate(`/manage/${id}`)}>Edit</Button>
    <Button color="inherit"  onClick={() => navigate('/activities/')}>Cancel</Button>
    </CardActions>
    </Card>
    )
}