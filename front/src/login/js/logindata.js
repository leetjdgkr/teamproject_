export const HandleLogin = async (id, password) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/items/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // Content-Type 설정
            },
            body: JSON.stringify({
                data_type: "check_login",
                data: {
                    id,
                    password,
                }
            })
        });

        const data = await response.json();  // 서버 응답을 JSON으로 파싱

        if (data.success) {
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
