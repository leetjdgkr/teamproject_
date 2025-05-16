export const HandleLogin = async (id, password) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/items/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data_type: "check_login",
                data: {
                    id,
                    password,
                }
            })
        });
        const data = await response.json();

        if(data.message === "check_login 처리 완료!"){
            console.log(data.user_name)
            return { success : true , message : data.message , name : data.data.user_name  };
        }else{
            return { success : false , message :data.message };
        }
        } catch (error) {
        console.error("서버 통신 오류:", error);
        return false;
    }
};