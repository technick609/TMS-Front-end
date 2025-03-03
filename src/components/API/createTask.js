// 1. Loading State:
// Showing the user that task creation is in progress

// 2. Prepare the req calls:
    // > Construct the endpoint URL
    // > Format the task data into JSON

// 3. Make the API call using fetch()

// 4. Turn off the loading indicatior

async function createTaskAPI(setLoading, handleError, handleResponse, value) {
    setLoading(true);
    try {
        const baseUrl = process.env.REACT_APP_API_BASED_URL;
        const endPoint = "/task";
        const url = new URL (endPoint, baseUrl);

        const requestBody = JSON.stringify({
            title: value.taskTitle,
            description: value.taskDescription,
            due_date: value.taskDueDate?.toISOString(),
        });

        const respose = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: requestBody,
        })
        const jsonData = await respose.json();
        if(!respose.ok){
            const errorMessage = jsonData.message || "Unkown error occured";
            throw new Error(errorMessage);
        }
       handleResponse(jsonData);
        
    } catch (error) {
        handleError(error);
    }
    finally{
        setLoading(false);
    }
}

export default createTaskAPI;