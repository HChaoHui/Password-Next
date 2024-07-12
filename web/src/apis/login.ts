import { Post } from "@/utils/request";

interface LoginRequest {
    token: string;
}

const login = async (requestData: LoginRequest) => {


    const response = await Post("/password/login", requestData);


    if (response.status !== 200) {
        throw new Error("Login Fail, Please Contact Author!");
    }

    const data = response.data;

    return data

};

export { login };