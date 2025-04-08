import { useState } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";

type Props = {
  activity?: Activity;
  closeForm: () => void;
  
};

export default function ActivityForm({ activity, closeForm}: Props) {

  const {updateActivity} = useActivities();
  const {createActivity} = useActivities();
  // Ensure state is controlled
  const [formData, setFormData] = useState<Activity>({
    id: activity?.id || "",
    title: activity?.title || "",
    description: activity?.description || "",
    category: activity?.category || "",
    date: activity?.date || "",
    city: activity?.city || "",
    venue: activity?.venue || "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: {[key: string]: FormDataEntryValue} = {}
    formData.forEach((value, key) => {
    data[key] = value;
    });
    if (activity) {
      data.id = activity.id
      await updateActivity.mutateAsync(data as unknown as Activity);
      closeForm();
    }else{
      
      await createActivity.mutateAsync(data as unknown as Activity);
      closeForm();
    }
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? "Edit Activity" : "Create Activity"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
        <TextField name="title" label="Title" value={formData.title} onChange={handleChange} />
        <TextField name="description" label="Description" multiline rows={3} value={formData.description} onChange={handleChange} />
        <TextField name="category" label="Category" value={formData.category} onChange={handleChange} />
        <TextField name="date" label="Date" type="date" 
        defaultValue={activity?.date 
          ? new Date(activity.date).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0] }
          />
        <TextField name="city" label="City" value={formData.city} onChange={handleChange} />
        <TextField name="venue" label="Venue" value={formData.venue} onChange={handleChange} />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button color="inherit" onClick={closeForm}>Cancel</Button>
          <Button 
           color="success"
           type="submit" 
           variant="contained"  
           disabled = {updateActivity.isPending || createActivity.isPending}
           >Submit</Button>
        </Box>
      </Box>
    </Paper>
  );
}
