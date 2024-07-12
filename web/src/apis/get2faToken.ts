import { Post } from "@/utils/request";

interface Get2faTokenRequest {
    secret: string;
}

const get2faToken = async (requestData: Get2faTokenRequest) => {


    const response = await Post("/password/get2faToken", requestData);


    if (response.status !== 200) {
        throw new Error("Get2faToken Fail, Please Contact Author!");
    }

    const data = response.data;

    return data

};

export { get2faToken };