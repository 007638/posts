import logo from './logo.svg';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'//新增路由组件
import './App.css';
import Register from './register'
import RegisterSuccess from './registersuccess'
import Login from './login'
import List from './list'
import Create from './create'
import Check from './check'
import Profile from './profile'
import MyPosts from './myposts'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />}></Route>
        {/*新增注册页面路由*/}
        <Route path="/register" element={<Register />}></Route>
        {/*新增注册成功页面路由*/}
        <Route path="/register-success" element={<RegisterSuccess />}></Route>
        {/*新增登录页面路由*/}
        <Route path="/login" element={<Login />}></Route>
        {/*新增帖子列表页面路由*/}
        <Route path="/list" element={<List />}></Route>
        {/*新增帖子新建页面*/}
        <Route path="/create" element={<Create />}></Route>
        {/*新增帖子查看详情页面*/}
        <Route path="/post/:id" element={<Check />}></Route>
        {/*新增帖子个人详情页路由*/}
        <Route path="/profile" element={<Profile />}></Route>
        {/*新增我的帖子页面*/}
        <Route path="/myposts" element={<MyPosts />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
