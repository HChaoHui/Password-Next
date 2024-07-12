import { Post } from "@/utils/request";

interface EditNewPasswordRequest {
    id: string;
    account: string;
    password: string;
    appName: string;
    webSite: string;
    twofa: string;
}

const editNewPassword = async (requestData: EditNewPasswordRequest) => {

    const response = await Post("/password/editPassword", requestData);

    if (response.status !== 200) {
        throw new Error("EditNewPassword Fail, Please Contact Author!");
    }

    const data = response.data;

    return data

};

export { editNewPassword };