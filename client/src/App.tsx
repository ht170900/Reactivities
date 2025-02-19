import { useEffect, useState } from 'react'
import './App.css'
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
function App() {
  const title = 'Reactivities'
  const [activities, setActivities] = useState<Activity[]>([]);
  // useEffect(() => {
  //   fetch('http://localhost:5000/api/activities')
  //   .then(response => response.json())
  //   .then(data => setActivities(data))
  // })this is for normal use http sort of 
  //for https
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response => setActivities(response.data))
  })
  //activities will be data and setActivities will be the fun which will setstate currently empty array
  return (
    //if styling needs to be added that would be in format style ={{color: "red"}} here double { because we pass obj}
    // also directly class can't be used in this classname needs to be used as this is jsx js+xml
    <>
    <Typography variant = 'h3' style = {{color: 'red'}}>{title}</Typography>
    <List>
      {activities.map((activity) => (
        <ListItem key = {activity.id}>
          <ListItemText>
            {activity.title}
          </ListItemText>  
        </ListItem>
      ))}
    </List>
    </>
  )
}
export default App
