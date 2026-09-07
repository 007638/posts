import { useState } from 'react'
//用来向后端发送请求博得的网络请求
import axios from 'axios'
//导入link路由跳转标签
import { Link } from 'react-router-dom'

//定义并导出一个名叫Create的组件
export default function Create() {
  //创建标题变量，title：存入输入框文字，setTitle：修改文字的函数
  //创建正文变量，content：存入输入框文字，setContent:修改文字的函数
  const [title, setTitle] = useState('')
  const [content,setContent] = useState('')

  //定义提交博客的函数，点击提交按钮就执行这个函数
  const submitBlog = () => {
    //判断标题或内容为空时，将提交不能提交
    if (!title || !content) {
      alert('标题和内容都不能为空')
        return
    }
    //发送post请求，把标题内容传给后端新增的接口
    axios.post('http://172.20.13.32:8099/api/create', {
      title:title,
      content:content,
      user_id: localStorage.getItem('userId')
    })
    //请求成功执行
    .then(res => {
      alert('帖子创建成功')
    })
      //请求失败后执行
      .catch(err => {
        console.log('新增博客失败',err)
        alert('提交失败，请重试')
      })
  }

  //页面渲染内容
  return (
    <>
      <img
        src="/mm.jpg"
        style={{
          position:"fixed",
          top:0,
          left:0,
          width:"100vw",
          height:"100vh",
          objectFit:"cover",
          zIndex:-1
        }}
       />
        <div style={{margin:"20px 0px"}}>
          <h1 style={{fontSize:"30px",fontWeight:"bold",textAlign:"left"}}>新建帖子:</h1>
          {/*标题输入框*/}
          <div style={{margin:"20px 20px",textAlign:"left",color:"black"}}>
            <p style={{fontSize:"22px"}}>标题: </p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{width:"100%",height:"40px",fontSize:"18px",padding:"0 10px"}}
            />
          </div>

          {/*正文输入框*/}
          <div style={{margin:"20px 20px",textAlign:"left",color:"black"}}>
            <p style={{fontSize:"22px"}}>正文: </p>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{width:"100%",height:"2000px",fontSize:"18px",padding:"10px"}}
            />
          </div>

          {/*底层按钮:提交+返回列表*/}
          <div style={{display:"flex",gap:"20px",margin:"20px"}}>
            <button
              onClick={submitBlog}
              style={{width:"140px",height:"40px",fontSize:"18px"}}
            >
             提交博客
            </button>
            <Link to="/">
              <button style={{width:"140px",height:"40px",fontSize:"18px"}}>
                返回帖子列表
              </button>
            </Link>
          </div>
        </div>
      </>
  )
}
