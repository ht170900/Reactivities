import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export default function ActivityForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { activity, LoadingActivities, updateActivity, createActivity } = useActivities(id);
  
  const [formData, setFormData] = useState<Activity>({
    id: activity?.id || "",
    title: activity?.title || "",
    description: activity?.description || "",
    category: activity?.category || "",
    date: activity?.date || "",
    city: activity?.city || "",
    venue: activity?.venue || "",
  });

  useEffect(() => {
    if (activity) {
      setFormData(activity);
    }
  }, [activity]);

  if (LoadingActivities) return <Typography>Loading...</Typography>;
  if (!activity && id) return <Typography>Activity not found</Typography>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
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
      navigate(`/activities/${data.id}`);
    }else{
      
      await createActivity.mutateAsync(data as unknown as Activity);
      navigate(`/activities/${data.id}`); 
    }
  };
  
  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (activity) {
  //     formData.id = activity.id ;
  //     await updateActivity.mutateAsync(formData);
      
  //   } else {
      
  //     console.log("Form Data: ", formData);
  //     await createActivity.mutateAsync(formData);  // Use mutateAsync here
      
  //   }
  // };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {id ? "Edit Activity" : "Create Activity"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
        <TextField name="title" label="Title" value={formData.title} onChange={handleChange} />
        <TextField name="description" label="Description" multiline rows={3} value={formData.description} onChange={handleChange} />
        <TextField name="category" label="Category" value={formData.category} onChange={handleChange} />
        <TextField
          name="date"
          label="Date"
          type="date"
          value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
          onChange={handleChange}
        />
        <TextField name="city" label="City" value={formData.city} onChange={handleChange} />
        <TextField name="venue" label="Venue" value={formData.venue} onChange={handleChange} />
        <Box display="flex" justifyContent="end" gap={3}>
          <Button color="inherit" onClick={() => navigate('/activities')}>Cancel</Button>
          <Button
            color="success"
            type="submit"
            variant="contained"
            disabled={updateActivity.isPending || createActivity.isPending}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
