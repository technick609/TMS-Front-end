// Deleting particular task

// 1. setLoading
// 2. prepare the url, taskId
// 3. send the delete req
// 4. process the response
// 5. Handle errors
// 6. off setLoadingtry

async function deleteTaskAPI(setLoading, handleError, handleResponse, taskId){
    setLoading(true);
    try {
        const baseUrl = process.env.REACT_APP_API_BASED_URL;
        const endPoint = "/task/" + taskId;
        const url = new URL (endPoint, baseUrl);

        const response = await fetch(url, {method: "DELETE"});

        const jsonData = await response.json();
        if(!response){
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

export default deleteTaskAPI