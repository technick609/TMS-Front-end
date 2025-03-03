// 1. setLoading
// 2. prepare the url
// 3. send the request : fetch()
// 4. process the response
// 5. Handle errors
// 6. off setLoadingtry

async function fetchTaskAPI(setLoading, handleError, handleResponse) {
    setLoading(true);
    try {
        const baseUrl = process.env.REACT_APP_API_BASED_URL;
        const endPoint = "/tasks";
        const url = new URL (endPoint, baseUrl);

        
        // fetch by default take GET method, we don't need to specify it.
        const response = await fetch(url, {
            method: "GET",
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

export default fetchTaskAPI;