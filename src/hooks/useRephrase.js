import axios from "axios";

const LAMBDA_URL = import.meta.env.LAMBDA_URL

export const useRephrase = () => {
    const isUrlProvided = !!LAMBDA_URL

    const rephrase = async (url) => {
        if (!isUrlProvided) return null
        const response = await axios.post(`${LAMBDA_URL}/article`, { url })
        return response.data.summary
    }

    return { rephrase, isUrlProvided }
}