import axios from "axios";

export const FetchUserData = async (id) => {
    try { 
        const response = await axios.get("http://127.0.0.1:8000/api/items/", {
            params: {id}
        });

        if( response.data.message ===  "Login successful"){
            console.log(response.data.message)
            return { success : true , message : response.data.message };
        }else{
            console.log(response.data.message)
            return { success : false , message : response.data.message };
        }

    } catch (error) {
        console.error("서버 통신 오류:", error);
        return false;
    }
};