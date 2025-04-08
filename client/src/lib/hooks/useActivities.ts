import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import agent from "../api/agent";

export const useActivities = () => {
    const queryClient = new QueryClient(); 
    const {data: activities, isPending } = useQuery({
        queryKey: ['activities'],
        queryFn: async () => {
        //const response = await axios.get<Activity[]>('https://localhost:5001/api/activities')
        const response = await agent.get<Activity[]>('/activities');
        return response.data;
    }
    });

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put(`/activities/${activity.id}`, activity); // Ensure ID is in the URL
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities'],
            });
        }
    });

    const createActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.post('/activities', activity); // Ensure ID is in the URL
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities'],
            });
        }
    });

    const deleteActivity = useMutation({
        mutationFn: async (id: string) => {
            await agent.delete(`/activities/${id}`); // Ensure ID is in the URL
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities'],
            });
        }
    });
    

    return {
        activities,
        isPending,
        updateActivity,
        createActivity,
        deleteActivity
    }
}