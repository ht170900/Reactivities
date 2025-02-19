import axios from "axios";
import { useEffect, useState } from "react";
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import { Box, Container, CssBaseline } from '@mui/material';

function App() {
  //const title = 'Reactivities'
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  useEffect(() => {
      axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => setActivities(response.data))
      return ()=>{}
    })

    const handleSelectActivity = (id: string) => {
      setSelectedActivity(activities.find(x => x.id === id));
    };
  
    const handleCancelActivity = () => {
        setSelectedActivity(undefined);
    };
  

  // useEffect(() => {
  //   fetch('http://localhost:5000/api/activities')
  //   .then(response => response.json())
  //   .then(data => setActivities(data))
  // })this is for normal use http sort of 
  //for https

  //activities will be data and setActivities will be the fun which will setstate currently empty array
  return (
    //if styling needs to be added that would be in format style ={{color: "red"}} here double { because we pass obj}
    // also directly class can't be used in this classname needs to be used as this is jsx js+xml
    <Box sx={{bgcolor:'#eeeeee'}}>
    <CssBaseline/> 
    <NavBar/>
    <Container maxWidth='xl' sx = {{mt:'3'}}>
      <ActivityDashboard 
      activities = {activities}
      selectActivity = {handleSelectActivity}
      cancelSelectActivity = {handleCancelActivity}
      selectedActivity = {selectedActivity}
      />
    </Container>
    
    </Box>
  )
}
export default App
