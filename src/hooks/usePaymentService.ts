import { useContext } from "react";
import Context from "../contexts/AuthContext/AuthContext";
import HttpClient from "../services/httpClient/HttpClient";

const usePaymentService = () => {
    const authContext = useContext(Context);
    
    return {
        updateIban : (iban: string) => {
            return HttpClient.put("/api/payment/iban", {Iban: iban}, authContext?.token)
        },
        postIban : (iban: string) => {
            return HttpClient.post("/api/payment/iban", {Iban: iban}, authContext?.token)
        }
    }
}

export default usePaymentService