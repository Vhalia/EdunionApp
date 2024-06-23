import ApiResponse from "../../models/ApiResponse";
import ApiErrorResponse from "../../models/ApiErrorResponse";
import ApiError from "../../models/ApiError";
import Toast from "react-native-toast-message";

const HttpClient = {
    get: async <T,>(url: string, token?: string) : Promise<T> => {
        try{
            const response = await fetch(getFullUrl(url), {
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                }
            });

            if (!response.ok){
                await handleFailedRequest(response) 
            }

            const jsonResponse = await response.json() as ApiResponse;
            return jsonResponse.data as T;
        }catch(error){
            handleApiError(error)
            throw new ApiError(error as string);
        }
    },
    post: async <T,>(url: string, body: any, token?: string) : Promise<T> => {
        try {
            const response = await fetch(getFullUrl(url), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(body),
            });

            if (!response.ok){
                await handleFailedRequest(response)
            }
            const responseJson = await response.json() as ApiResponse;
            return responseJson.data;
        }catch(error){
            handleApiError(error)
            throw new ApiError(error as string);
        }
    },
    put: async <T,>(url: string, body: any, token?: string) : Promise<T> => {
        try {
            const response = await fetch(getFullUrl(url), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(body),
            });
            
            if (!response.ok){
                await handleFailedRequest(response)
            }
    
            const responseJson = await response.json() as ApiResponse;
            return responseJson.data;
        }catch(error){
            handleApiError(error)
            throw new ApiError(error as string);
        }
        
    },
    delete: async (url: string, token?: string) => {
        try {
            var response = await fetch(getFullUrl(url), {
                method: 'DELETE',
                headers: {
                    'Authorization': token ? `Bearer ${token}` : ''
                },
            });
            
            if (!response.ok) {
                await handleFailedRequest(response)
            }
            
        }catch(error) {
            handleApiError(error)
        }
    },
}

const getFullUrl = (url: string) => {
    return (process.env.BASE_URL+"/"+url).replaceAll("//", "/");
}

const handleApiError = (error: any) => {
    if (error instanceof ApiError){
        if (error.status == 500){
            Toast.show({
                type: "error",
                text1: "Une erreur serveur est survenue"
            })
        }

        if (error.status == 401){
            Toast.show({
                type: "error",
                text1: "Veuillez vous reconnecter"
            })
        }
        throw error;
    }

    Toast.show({
        type: "error",
        text1: "Une erreur est survenue"
    })
}

const handleFailedRequest = async (response: Response) => {
    if (response.status == 401){
        throw new ApiError("Unauthorized", 401)
    }
    const errorResponse = await response.json() as ApiErrorResponse
    throw new ApiError(errorResponse.error, errorResponse.status); 
}

export default HttpClient;
