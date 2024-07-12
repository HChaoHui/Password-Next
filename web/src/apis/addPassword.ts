import { Post } from "@/utils/request";

interface AddPasswordRequest {
    account: string;
    password: string;
    appName: string;
    webSite: string;
    twofa: string;
}

const addPassword = async (requestData: AddPasswordRequest) => {

    const response = await Post("/password/addPassword", requestData);

    if (response.status !== 200) {
        throw new Error("AddPassword Fail, Please Contact Author!");
    }

    const data = response.data;

    return data

};

export { addPassword };