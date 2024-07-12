import { Get } from "@/utils/request";

const getPassword = async () => {

    const response = await Get("/password/getPassword", {});

    if (response.status !== 200) {
        throw new Error("GetPassword Fail, Please Contact Author!");
    }

    const data = response.data;

    return data

};

export { getPassword };