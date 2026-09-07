import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  //useNavigate用来做页面跳转
  const navigate = useNavigate()
  //表单的两个状态：用户名，密码
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //点击登录按钮执行这个函数
  const handleLogin = async () => {
    if (!username || !password) {
      alert('用户名和密码不能为空')
      return
    }

    //前端给后端发送网络请求，把用户名和密码发给后端，完成登录
    const res = await fetch('http://172.20.13.32:8099/api/login', {
      method: 'POST',//登录要把用户名和密码传给服务器,所以是POST
      headers :{'Content-Type': 'application/json'},
      body: JSON.stringify({username: username, password: password})
      //body=请求的内容体，就是要发给后端的数据
      //JSON:stringify(JS对象):把JS对象转换成JSON字符串
    })

    const data = await res.json()//读取后端返回的json数据

    //判断成功还是失败
    if (res.ok) {
      localStorage.setItem('userId', data.user.id)
      localStorage.setItem('username', data.user.username)
      navigate('/list')
    } else {
      alert(data.msg)
    }
  }

  //使用return返回渲染页面结构
  return (
    <div style={{padding:'40px'}}>
      <h2>登录</h2>
    <div style={{margin:'10px 0'}}>
      <input
        placeholder="用户名"
        value={username}
        //把用户名存入Username中
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div style={{margin:'10px 0'}}>
      <input
        type="passowrd"
        placeholder="密码"
        value={password}
        //把密码存入Password中
        onChange={(e) => setPassword(e.target.value)}
      />
     </div>
     <button
      style={{width:'280px',padding:'8px',fontSize:'16px'}}
      onClick={handleLogin}>登录</button>
    </div>
  )
}
