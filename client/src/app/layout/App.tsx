import axios from "axios";
import { useEffect, useState } from "react";
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import { Box, Container, CssBaseline } from '@mui/material';
import { useQuery } from "@tanstack/react-query";

function App() {
  //const title = 'Reactivities'
  // const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  const {data: activities, isPending} = useQuery{
    querykey:['activites'],
    queryFn: async() => {
      const response = axios.get<Activity[]>('http://localhost:5000/api/activities');
      return response.data;
    }
  }
  // useEffect(() => {
  //   axios.get<Activity[]>('http://localhost:5000/api/activities')
  //     .then(response => setActivities(response.data))
  //     .catch(error => console.error("Error fetching activities", error));
  // }, []); // Add empty dependency array to run only once
  

    const handleSelectActivity = (id: string) => {
      setSelectedActivity(activities.find(x => x.id === id));
    };
  
    const handleCancelActivity = () => {
        setSelectedActivity(undefined);
    };
  
    const handleOpenForm = (id?:string) => {
      if(id) handleSelectActivity(id);
      else handleCancelActivity();
      setEditMode(true);
    };

    const handleCloseForm = () => {
      setEditMode(false);
    };

    const handleSubmitForm = (activity: Activity) => {
      if (activity.id) {
      setActivities (activities.map(x => x.id === activity.id ? activity : x))
      } else {
      const newActivity = {...activity, id: activities.length.toString()}
      setSelectedActivity(newActivity);
      setActivities([...activities, {...newActivity}])
      }
      setEditMode(false);
    }

    const handleDelete = (id: string) => {
      setActivities (activities.filter(x => x.id !== id))
    }

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
    <NavBar openForm = {handleOpenForm}/>
    <Container maxWidth='xl' sx = {{mt:'3'}}>
      <ActivityDashboard 
      activities = {activities}
      selectActivity = {handleSelectActivity}
      cancelSelectActivity = {handleCancelActivity}
      selectedActivity = {selectedActivity}
      editMode = {editMode}
      openForm = {handleOpenForm}
      closeForm = {handleCloseForm}
      submitForm = {handleSubmitForm}
      deleteActivity = {handleDelete}
      />
    </Container>
    
    </Box>
  )
}
export default App
