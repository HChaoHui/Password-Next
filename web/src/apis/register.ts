import { Post } from "@/utils/request";

interface RegisterRequest {
    user: string;
}

const register = async (requestData: RegisterRequest) => {


    const response = await Post("/password/register", requestData);


    if (response.status !== 200) {
        throw new Error("Register Fail, Please Contact Author!");
    }

    const data = response.data;

    return data

};

export { register };