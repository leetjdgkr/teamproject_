import axios from "axios";

export const HandleLogin = async (id, password) => {
    try {
        const response = await axios.post("https://httpbin.org/post", {
            type: "Info",
            data: {
                id,
                password,
            }
        });

        if ( response.data.success ) {
            console.log("로그인 성공!");
            return true;
        } else {
            console.log("로그인 실패!");
            return false;
        }
    } catch (error) {
        console.error("서버 통신 오류:", error);
        return false;
    }
};