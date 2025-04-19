import axios from "axios";

export const HandleLogin = async (id, password, otp, role) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/items/", {
            role,
            id,
            password,
            otp
        });

        if (response.data.success) {
            console.log("로그인 성공!");
        } else {
            console.log("로그인 실패!");
        }
    } catch (error) {
        console.error("서버 통신 오류:", error);
    }
};
