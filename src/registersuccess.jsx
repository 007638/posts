import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterSuccess() {
  const navigate = useNavigate();
  const handleGoToLogin = () => {
    //跳转到登录页面路径
    navigate('/login');
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh'
    }}>
      <h2>您已注册成功</h2>
      {/*新增登录按钮*/}
      {/*点击跳转函数*/}
      <button
        onClick={handleGoToLogin}
        style={{
          padding:"0 10px",
          backgroundColor:"pink",
          color:"black",
          fontSize:"18px"
        }}>登录</button>
    </div>
  )
}

