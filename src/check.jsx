import {useState, useEffect} from 'react'
//useParams获取url上的参数
import { useParams } from 'react-router-dom'
//引入axios,用来向后端发送评论请求
import axios from 'axios'

function Check () {
  const { id } = useParams();//从网址里取出帖子id
  const [post, setPost] = useState(null);//变量post存帖子数据
  const [commentText, setCommentText] = useState('');//变量存评论框文字
  const [replyTo, setReplyTo] = useState(null);//变量存正在回复哪条评论

  //页面一打开，就自动执行这段代码
  useEffect(()=>{
    fetch(`http://172.20.13.32:8099/api/post/${id}`)//向后端发送请求,要这篇帖子的详情
      .then((res) => res.json())//请求成功，把返回的JSON解析成JS对象
      .then((data) => setPost(data))//把帖子数据存进post
      .catch((err) => console.log('加载详情失败',err));//请求失败返回提示词
  }，[id]);//依赖列表，只在页面打开或者id变化时执行一次

  //定义发布评论的函数，点击按钮时执行
  const submitComment = () =>
    if (!commentText) {  //如果评论是空的
      alert('评论内容不能为空');//就弹出提示框
      return;
    }
    axios.post(`http://172.20.13.32:8099/api/comment`, //向后端评论接口发送POST请求
      post_id:Number(id),//这条评论属于哪条帖子
      parent_id: replyTo ? replyTo.id : null,//回复评论时填被回复评论的id，直接评论就填null
      content: commentText, //评论的内容
      user_id: Number(localStorage.getItem('userId')),//从本地储存取登录时存的用户id（我是谁）
    })

      //评论请求成功后执行
      .then(() => {
        alert('评论成功');
        setCommentText('');//清空评论输入框
        setReplyTo(null);//取消正在回复状态
        return fetch(`http://172.20.13.32:8099/api/post/${id}`).then((r) => r.json());//刷新评论列表
      })
      .then((data) => setPost(data))//把刷新后的新数据更新到帖子页
      .catch((err) => { //请求失败后执行
        console.log('评论失败',err);
        alert('评论失败，请重试');
      });
  };

  //if判断：如果post是null，代表数据还没加载完，显示加载中
  if (!post) {
    return <div>加载中</div>
  }


  //使用return返回页面
  return (
    <div style={{width:"1300px",margin:"0 auto",padding:"20px"}}>
      <h2>{post.title}</h2> {/*显示帖子标题*/}






