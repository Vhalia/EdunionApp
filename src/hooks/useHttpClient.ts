import { useNavigation } from "@react-navigation/native"
import HttpClient from "../services/httpClient/HttpClient"
import { useContext } from "react";
import Context from "../contexts/AuthContext/AuthContext";
import Config from "react-native-config";
import Toast from "react-native-toast-message";
import ApiError from "../models/ApiError";
import { isJson } from "../utils/utils";
import MultipartFormData from "../models/MultipartFormData";

const useHttpClient = () => {
    const navigation = useNavigation<any>()
    const authContext = useContext(Context);

    const get = async <T,>(
        url: string,
        authorizationNeeded?: boolean,
        onError?: (error: ApiError, fallback: () => void) => void) : Promise<T> =>
    {
        try {
            return await HttpClient.get(url, authorizationNeeded ? authContext?.token : undefined)
        }catch(error){
            handleError(error, navigation, authContext, onError)
            throw error
        }
    }

    const post = async <T,>(
        url: string,
        body: any,
        authorizationNeeded?: boolean,
        onError?: (error: ApiError, fallback: () => void) => void) : Promise<T> =>
    {
        try {
            return await HttpClient.post(url, body, authorizationNeeded ? authContext?.token : undefined)
        }catch(error){
            handleError(error, navigation, authContext, onError)
            throw error
        }
    }
    
    const put = async <T,>(
        url: string,
        body: any,
        authorizationNeeded?: boolean,
        onError?: (error: ApiError, fallback: () => void) => void) : Promise<T> =>
    {
        try {
            return await HttpClient.put(url, body, authorizationNeeded ? authContext?.token : undefined)
        }catch(error){
            handleError(error, navigation, authContext, onError)
            throw error
        }
    }

    const deleteData = async (
        url: string,
        body: any,
        authorizationNeeded?: boolean,
        onError?: (error: ApiError, fallback: () => void) => void) =>
    {
        try {
            return await HttpClient.delete(url, body, authorizationNeeded ? authContext?.token : undefined)
        }catch(error){
            handleError(error, navigation, authContext, onError)
            throw error
        }
    }

    const postMultipartFormData = async <T,>(
        url: string,
        datas: MultipartFormData[],
        authorizationNeeded?: boolean,
        onError?: (error: ApiError, fallback: () => void) => void) : Promise<T> =>
    {
        try {
            return await HttpClient.postMultipartFormData(url, datas, authorizationNeeded ? authContext?.token : undefined)
        }catch(error){
            handleError(error, navigation, authContext, onError)
            throw error
        }
    }

    const putMultipartFormData = async <T,>(
        url: string,
        datas: MultipartFormData[],
        authorizationNeeded?: boolean, fallback?: (error: ApiError, next: () => void) => void) : Promise<T> =>
    {
        try {
            return await HttpClient.putMultipartFormData(url, datas, authorizationNeeded ? authContext?.token : undefined)
        }catch(error){
            handleError(error, navigation, authContext, fallback)
            throw error
        }
    }

    return {
        get,
        post,
        put,
        delete: deleteData,
        postMultipartFormData,
        putMultipartFormData
    }
}

const handleError = (error: any, navigation: any, authContext?: any, onError?: (error: any, fallback: () => void) => void) => {
    let apiError;
    if (typeof error.error == "object"){
        apiError = new ApiError(JSON.stringify(error.error), error.status)
    }else{
        apiError = error as ApiError
    }


    handleApiError(apiError, navigation, authContext)

    if (onError){
        onError(apiError, () => handleErrorFallback(apiError))
    }else{
        handleErrorFallback(apiError)
    }
}

const handleApiError = (error: any, navigation: any, authContext?: any) => {

    if (Config.ENV !== "production") {
        Toast.show({
            type: "error",
            text1: JSON.stringify(error.error)
        })

        return
    }

    if (error instanceof ApiError){
        if (error.status == 401){
            authContext?.logout()
            navigation.navigate("Login")

            Toast.show({
                type: "error",
                text1: "Veuillez vous reconnecter"
            })
        }
    }
}

const handleErrorFallback = (error: any) => {
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
    }
}

export default useHttpClient;