import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import './css/Auth.css'

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const {login} = useAuth();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleLoginSubmit = async (e) => {
        if (e) e.preventDefault();

        if (!formData.email || !formData.password) {
            alert("이메일과 비밀번호를 모두 입력해주세요.");
            return;
        }
        const success = await login(formData.email, formData.password);

        if (success) {
            alert("로그인 성공! 환영합니다. 👋");
            navigate('/'); // 홈으로 이동
        } else {
        }
    };

    const handleGoBack = () => {
        navigate('/');
    };
    return (
        <div className="auth-wrapper">
            <button className="back-button" onClick={handleGoBack} aria-label="뒤로가기">
                ←
            </button>
            <div className="auth-logo">
                <img src="/EATi.png" alt="EATI"/>
            </div>
            <div className="page-container">
                <h2>로그인</h2>

                <form className="login-form" onSubmit={handleLoginSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="이메일"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit" className="login-btn">로그인</button>
                </form>

                <hr className="divider"/>
                <Link to="/signup" className="signup-link-btn">
                    아직 회원이 아니신가요? 회원가입
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;