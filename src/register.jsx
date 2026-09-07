import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  //useNavigate用来做页面跳转
  const navigate = useNavigate()

  //表单的三个状态：用户名，密码，确认密码
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  //点击注册按钮执行这个函数
  const handleRegister = async () => {
    if (!username || !password) {
      alert('用户名和密码不能为空')
      return
    }
    if (password !== confirmPwd) {
      alert('两次输入密码不一致')
    }

    //前端给后端发送网络请求，把用户名和密码发给后端，完成注册
    const res = await fetch('http://172.20.13.32:8099/api/register', {
      method: 'POST', //注册要把账号密码传给服务器，所以是POST
      headers :{'Content-Type': 'application/json'}, //请求头，告诉后端我发给你的数据是json格式
      body: JSON.stringify({username: username, password: password})
      //body=请求的内容体，就是要发给后端的数据
      //JSON:stringify(JS对象):把JS对象转换成JSON字符串
    })

    const data = await res.json()//读取后端返回的json数据

    //判断成功还是失败
    if (res.ok) {
      navigate('/register-success')
    } else {
      alert(data.msg)
    }
  }

  //使用return返回渲染页面结构
  return (
    <div style={{alignItems:'center',display:'flex',justifyContent:'center',flexDirection:'column',minHeight:'100vh',marginBottom:'100px'}}>
    <h2 style={{fontSize:"24px",marginBottom:'24px'}}>请注册</h2>
    <div style={{margin:'10px 0'}}>
      <input
        style={{width:'280px',padding:'8px',fontSize:'16px'}}
        placeholder="用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}//简单说，就是把打的字存到username变量里
      />
      </div>
      <div style={{margin:'10px 0'}}>
        <input
          style={{width:'280px',padding:'8px',fontSize:'16px'}}
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div style={{margin:'10px 0'}}>
        <input
          style={{width:'280px',padding:'8px',fontSize:'16px'}}
          type="password"
          placeholder="确认密码"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}//打字，把内容存入confirmPwd
        />
      </div>
      <button
      style={{width:'280px',padding:'8px',fontSize:'16px'}}
      onClick={handleRegister}>注册</button>
    </div>
  )
}

