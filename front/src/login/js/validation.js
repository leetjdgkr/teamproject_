import { HandleLogin } from "./logindata";

export const validation = ({ id, password, otp, role , rgxCnd, setErrors, setId, setPassword, setOtp, setRole }) => {

    const idRegex = role === "admin" ? rgxCnd.adminId : rgxCnd.staffId;
    const passwordRegex = role === "admin" ? rgxCnd.adminPassword : rgxCnd.staffPw;
    const otpRegex = role === "admin" ? rgxCnd.adminOtp : null;  // 사원은 OTP 검증하지 않음

    // 입력값 유효성 검사
    const newErrors = {
        idError: idRegex.test(id) ? "" : "아이디를 잘못 입력하셨습니다",
        pwError: passwordRegex.test(password) ? "" : "비밀번호를 잘못 입력하셨습니다",
        otpError: otpRegex && otp ? otpRegex.test(otp) ? "" : "인증코드를 잘못 입력하셨습니다" : "" 
    };

    setErrors(newErrors);
   

    if (newErrors.idError || newErrors.pwError || newErrors.otpError) {
        return false; 
    }
    setErrors({});
    HandleLogin({ id, password, otp, role });   
    return true; 
};
