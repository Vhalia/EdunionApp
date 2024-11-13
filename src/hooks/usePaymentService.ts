import useHttpClient from "./useHttpClient";

const usePaymentService = () => {
    const httpClient = useHttpClient() 
    
    return {
        updateIban : (iban: string) => {
            return httpClient.put("/api/payment/iban", {Iban: iban}, true)
        },
        postIban : (iban: string) => {
            return httpClient.post("/api/payment/iban", {Iban: iban}, true)
        }
    }
}

export default usePaymentService