export const HandleLogin = async (id, password, dataType, admin_code) => {
    try {
        const loginData = dataType === "check_admin_login"
        ? { id, password, admin_code}
        : { id, password }

        const response = await fetch("http://127.0.0.1:8000/api/items/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data_type: dataType,
                data: loginData
            })
        });
        const data = await response.json();
        console.log("로그인 응답 데이터:", data.message);

        if(data.message === "check_user_login 처리 완료!"){
            return { success : "user", message : data.message , employee_number: data.data.employee_number,  name : data.data.user_name  };
        }else if(data.message === "check_admin_login 처리 완료!"){
             return { success : "admin" , message : data.message }
        }else{
           return { success : false , message :data.message }; 
        }
        } catch (error) {
        console.error("서버 통신 오류:", error);
        return false;
    }
};