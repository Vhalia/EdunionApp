import ApiResponse from "../../models/ApiResponse";
import ApiErrorResponse from "../../models/ApiErrorResponse";
import ApiError from "../../models/ApiError";
import MultipartFormData from "../../models/MultipartFormData";
import Config from "react-native-config";

const HttpClient = {
    get: async <T,>(url: string, token?: string) : Promise<T> => {
        const response = await fetch(getFullUrl(url), {
            headers: {
                'Authorization': token ? `Bearer ${token}` : ''
            }
        });

        if (!response.ok){
            await throwFormatedError(response) 
        }

        
        const jsonResponse = await response.json() as ApiResponse;
        return jsonResponse.data as T;
    },
    post: async <T,>(url: string, body: any, token?: string) : Promise<T> => {
        const response = await fetch(getFullUrl(url), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify(body),
        });

        if (!response.ok){
            await throwFormatedError(response)
        }
        const responseJson = await response.json() as ApiResponse;
        return responseJson.data;
    },
    postMultipartFormData : async <T,>(url: string, datas: MultipartFormData[], token?: string) : Promise<T> => {
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
            await throwFormatedError(response)
        }

        const responseJson = await response.json() as ApiResponse;
        return responseJson.data;
    },
    put: async <T,>(url: string, body: any, token?: string) : Promise<T> => {
        const response = await fetch(getFullUrl(url), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
            body: JSON.stringify(body),
        });
        
        if (!response.ok){
            await throwFormatedError(response)
        }

        const responseJson = await response.json() as ApiResponse;
        return responseJson.data;
    },
    putMultipartFormData : async <T,>(url: string, datas: MultipartFormData[], token?: string) : Promise<T> => {
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
            await throwFormatedError(response)
        }

        const responseJson = await response.json() as ApiResponse;
        return responseJson.data;
    },
    delete: async (url: string, body: any, token?: string) => {
        var response = await fetch(getFullUrl(url), {
            method: 'DELETE',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        
        if (!response.ok) {
            await throwFormatedError(response)
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

const throwFormatedError = async (response: Response) => {
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

