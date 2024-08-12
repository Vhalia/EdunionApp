import ApiResponse from "../../models/ApiResponse";
import ApiErrorResponse from "../../models/ApiErrorResponse";
import ApiError from "../../models/ApiError";
import Toast from "react-native-toast-message";
import MultipartFormData from "../../models/MultipartFormData";
import { isJson } from "../../utils/utils";
import Config from "react-native-config";

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
    post: async <T,>(url: string, body: any, token?: string, handleError: boolean = true) : Promise<T> => {
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
            handleApiError(error, handleError)
            throw new ApiError(error as string);
        }
    },
    postMultipartFormData : async <T,>(url: string, datas: MultipartFormData[], token?: string) : Promise<T> => {
        try {
            const formData = CreateFormData(datas);
            const response = await fetch(getFullUrl(url), {
                method: 'POST',
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
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
    putMultipartFormData : async <T,>(url: string, datas: MultipartFormData[], token?: string) : Promise<T> => {
        try {
            const formData = CreateFormData(datas)
            const response = await fetch(getFullUrl(url), {
                method: 'PUT',
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
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
    if (Config.BASE_URL === undefined){
        throw new Error("BASE_URL not defined")
    }

    const protocol = Config.BASE_URL.match(/^https?:\/\//i)![0];
    const urlWithoutProtocol = Config.BASE_URL.replace(protocol, "");
    return protocol+(urlWithoutProtocol+"/"+url).replaceAll("//", "/");
}

const handleApiError = (error: any, handleError: boolean = true) => {
    if (Config.ENV !== "production") {
        Toast.show({
            type: "error",
            text1: JSON.stringify(error.error)
        })
    }
    if (!handleError){
        throw error;
    }
    
    if (error instanceof ApiError){
        if (error.status == 401){
            Toast.show({
                type: "error",
                text1: "Veuillez vous reconnecter"
            })
        }else if (error.status == 500){
            Toast.show({
                type: "error",
                text1: "Une erreur serveur est survenue"
            })
        }else{
            Toast.show({
                type: "error",
                text1: "Une erreur est survenue"
            })
        }

        if (isJson(error.error)){
            error.message = JSON.stringify(error.error)
        }
        
        throw error;
    }

    if (Config.ENV === "production") {
        Toast.show({
            type: "error",
            text1: "Une erreur est survenue"
        })
    }
}

const handleFailedRequest = async (response: Response) => {
    if (response.status == 401){
        throw new ApiError("Unauthorized", 401)
    }

    if (response.status == 404){
        throw new ApiError("Not found", 404)
    }

    const errorResponse = await response.json() as ApiErrorResponse
    throw new ApiError(errorResponse.error, errorResponse.status)
}

const CreateFormData = (datas: MultipartFormData[]) => {
    const formData = new FormData();

    for (const data of datas) {
        if (Array.isArray(data.value)) {
            for (const ele of data.value) {
                formData.append(data.key, ele);
            }
            continue;
        }

        formData.append(data.key, data.value);
    }
    return formData;
}

export default HttpClient;

