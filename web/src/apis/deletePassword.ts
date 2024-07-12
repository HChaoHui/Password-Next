import { Post } from "@/utils/request";

interface DeletePasswordRequest {
    id: string;
}

const deletePassword = async (requestData: DeletePasswordRequest) => {

    const response = await Post("/password/deletePassword", requestData);

    if (response.status !== 200) {
        throw new Error("DeletePassword Fail, Please Contact Author!");
    }

    const data = response.data;

    return data

};

export { deletePassword };