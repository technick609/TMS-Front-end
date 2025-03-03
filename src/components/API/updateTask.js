async function updateTaskAPI(setLoading, handleError, handleResponse, value, taskId){
    setLoading(true);
    try {
        const baseUrl = process.env.REACT_APP_API_BASED_URL;
        const endPoint = "/task/" + taskId;
        const url = new URL (endPoint, baseUrl);

        const requestBody = JSON.stringify({
            title: value.title || value.taskTitle,
            description: value.description || value.taskDescription,
            due_date: value.due_date || value.taskDueDate?.toISOString(),
        });

        const response = await fetch(url, {
            method: "PUT",
            headers:{
                "Content-Type" : "application/json"
            },
            body: requestBody,
        });

        const jsonData = await response.json();
        if(!response){
            const errorMessage = jsonData.message || "Unkown error occured";
            throw new Error(errorMessage);
        }
        handleResponse(jsonData);

    } catch (error) {
        handleError(error)
    }
    finally{
        setLoading(false)
    }
}

export default updateTaskAPI