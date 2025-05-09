import './login.css';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { validation } from './js/validation';
import { useNavigate } from 'react-router-dom';
import { HandleLogin } from './js/logindata';
import { FetchUserData } from './js/getLogindata';

const Login = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [role, setRole] = useState("admin");
    const [errors, setErrors] = useState({
        idError: "",
        passwordError: "",
        otpError: ""
    });
    const [login_check_message,setlogin_check_message] = useState("");

    const rgxCnd = {
        adminId: /^[A-Za-z0-9]{4,16}$/,  
        adminPassword: /^[A-Za-z0-9]{4,14}$/,  
        adminOtp: /^\d{6}$/,
        staffId: /^[A-Za-z0-9]{4,16}$/,
        staffPw: /^[A-Za-z0-9]{4,14}$/
    };

    const handleChange = (e) => {
      const { id, value } = e.target;
    //   console.log(value)
      // 값 업데이트
      switch (id) {
          case "adminId":
          case "staffId":
              setId(value);
              break;
          case "adminPassword":
          case "staffPw":
              setPassword(value);
              break;
          case "adminOtp":
              setOtp(value);
              break;
          default:
              console.log("값이 입력되지않음");
        }
    };
    const handlecheck = async (e) => {

        e.preventDefault();

        const isValid = validation({
            id,
            setId,
            password,
            setPassword,
            otp,
            setOtp,
            role,
            rgxCnd,
            setErrors
        });

        if (isValid)  {
            const loginsuccess = await HandleLogin(id,password);
            if(loginsuccess){
                const login_check_suceess = await FetchUserData(id);
                if(login_check_suceess.success){
                    setlogin_check_message(login_check_suceess.message);
                    // navigate('/data');
                }else{
                    setlogin_check_message(login_check_suceess.message);
                }
            }else{
                setlogin_check_message("입력값이 조건에 맞지않음");
            }
        }
        setId("");  
        setPassword("");
        setOtp("");
    };

    return (
        <div className="loginBK">
            {/* 관리자 / 사원 선택 버튼 */}
            <div className="userchoice">
                <div className="userchoice_sub">
                    {/* 모션 배경 (선택 시 이동) */}
                    <motion.div
                        className   = "activeBackground"
                        animate     = {{ x: role === "admin" ? "0%" : "100%" }}
                        transition  = {{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                    {/* 관리자 버튼 */}
                    <motion.button
                        className = "Administrator"
                        onClick   = {() => setRole("admin")}
                        animate   = {{ color: role === "admin" ? "#fff" : "#333" }}
                        whileTap  = {{ scale: 0.9 }} // 클릭 시 살짝 눌리는 효과
                    >
                        관리자
                    </motion.button>

                    {/* 사원 버튼 */}
                    <motion.button
                        className = "Staff"
                        onClick   = {() => setRole("staff")}
                        animate   = {{ color: role === "staff" ? "#fff" : "#333" }}
                        whileTap  = {{ scale: 0.9 }} // 클릭 시 살짝 눌리는 효과
                    >
                        사원
                    </motion.button>
                </div>
            </div>

            {/* 관리자 입력 폼 */}
            <motion.div
                className  ="Admin-register"
                initial    ={{ opacity: 0, x: -20 }}
                animate    ={role === "admin" ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition ={{ duration: 0.3 }}
                style      ={{ display: role === "admin" ? "flex" : "none" }}
            >
                <h1>관리자</h1>
                <div className="admin_subbox">
                    <input
                        type        = "text"
                        id          = "adminId"
                        className   = "id"
                        placeholder = "아이디"
                        value       = {id}
                        onChange    = {handleChange}
                    />
                    {/* 로그인 버튼 클릭 시 오류 메시지 표시 */}
                    {errors.idError && <span className="tooltip">{errors.idError}</span>}
                </div>
                <div className = "admin_subbox">
                    <input
                        type        = "password"
                        id          = "adminPassword"
                        className   = "password"
                        placeholder = "비밀번호"
                        value       = {password}
                        onChange    = {handleChange}
                    />
                    {/* 로그인 버튼 클릭 시 오류 메시지 표시 */}
                    {errors.pwError && <span className="tooltip">{errors.pwError}</span>}
                </div>
                <div className = "admin_subbox">
                    <input
                        type        = "text"
                        id          = "adminOtp"
                        className   = "otp"
                        placeholder = "인증코드"
                        value       = {otp}
                        onChange    = {handleChange}
                    />
                    {/* 로그인 버튼 클릭 시 오류 메시지 표시 */}
                    {errors.otpError && <span className="tooltip">{errors.otpError}</span>}
                </div>
            </motion.div>

            {/* 사원 입력 폼 */}
            <motion.div
                className  ="Staff-register"
                initial    = {{ opacity: 0, x: 20 }}
                animate    = {role === "staff" ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition = {{ duration: 0.3 }}
                style      = {{ display: role === "staff" ? "flex" : "none" }}
            >
                <h1>사원</h1>
                <div className="staff_subbox">
                    <input
                        type        = "text"
                        id          = "staffId"
                        className   = "id"
                        placeholder = "아이디"
                        value       = {id}
                        onChange    = {handleChange}
                    />
                    {/* 로그인 버튼 클릭 시 오류 메시지 표시 */}
                    {errors.idError && <span className="tooltip">{errors.idError}</span>}
                </div>
                <div className="staff_subbox">
                    <input
                        type        = "password"
                        id          = "staffPw"
                        className   = "password"
                        placeholder = "비밀번호"
                        value       = {password}
                        onChange    = {handleChange}
                    />
                    {/* 로그인 버튼 클릭 시 오류 메시지 표시 */}
                    {errors.pwError && <span className="tooltip">{errors.pwError}</span>}
                </div>
            </motion.div>

            <button 
              className = "answerBtn"   
              onClick   = {handlecheck}
            >로그인</button>
            <div className="check_message"  style={{ display: login_check_message ? 'flex' : 'none' }}>
                {login_check_message && <span className="tooltip">{login_check_message}</span>}
            </div>
        </div>
    );
};

export default Login;