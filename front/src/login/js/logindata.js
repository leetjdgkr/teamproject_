import axios from "axios";

export const HandleLogin = async (id, password, otp, role) => {
    try {
        const response = await axios.post("https://httpbin.org/post", {
            role,
            id,
            password,
            otp
        });

        // 응답에서 성공 여부 확인
        if (    response.data.json.id === "testid" &&
                response.data.json.password === "testpw" &&
                response.data.json.otp === "123456" ) {
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