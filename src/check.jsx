import {useState, useEffect} from 'react'
//useParams获取url上的参数
import { useParams } from 'react-router-dom'
//引入axios,用来向后端发送评论请求
import axios from 'axios'


export default function Check () {
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
  },[id]);//依赖列表，只在页面打开或者id变化时执行一次

  //定义发布评论的函数，点击按钮时执行
  const submitComment = () => {
    if (!commentText) {  //如果评论是空的
      alert('评论内容不能为空');//就弹出提示框
      return;
    }
    axios.post(`http://172.20.13.32:8099/api/comment`, { //向后端评论接口发送POST请求
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
      <div style={{color:"#888", fontSize:"13px",marginBottom:"10px"}}> {/*作者行的样式*/}
        作者:{post.user ? post.user.username : '未知'} {/*有作者显示名字，没有显示“未知”*/}
      </div>

      <div style={{borderBottom:"1px solid #888",paddingBottom:"20px", marginBottom:"20px"}}>
        {post.content}  {/*显示帖子正文*/}
      </div>

      <h3>评论({post.comments ? post.comments.length : 0})</h3> {/*显示评论*/}
      {/*如果评论数组存在且一条都没有，就显示下面提示文字*/}
      {post.comments && post.comments.length === 0 && (
        <div style={{color:"#888"}}>还没有评论，快来评论吧</div>
      )}

      {/*循环评论数组,每条评论渲染一块*/}
      {post.comments && post.comments.map((comment) => (
        //每条评论一个块，底部有分割线
        <div key={comment.id} style={{borderBottom:"1px solid #f0f0f0",padding:"10px 0"}}>
          <div style={{fontSize:"12px", color:"#888"}}> {/*评论作者那行*/}
            {comment.user ? comment.user.username : '匿名'} {/*显示评论作者名，拿不到就显示匿名*/}
          </div>

          <div style={{margin:"6px 0"}}>{comment.content}</div> {/*显示评论内容*/}
          <div>
            <button
              onClick={() => setReplyTo(comment)} //点击后把正在回复设成这条评论
              style={{fontSize:"12px",color:"blue"}}
            >
              回复
            </button>
          </div>
        </div>
      ))}


      <div style={{marginTop:"20px"}}> {/*底部评论输入区*/}
        {/*如果正在回复某人*/}
        {replyTo && (
          <div style={{fontSize:"12px", color:"#888",marginBottom:"6px"}}>{/*正在回复提示行的样式*/}
            正在回复 {replyTo.user ? replyTo.user.username : "匿名"}: {replyTo.content} {/*显示被回复的人和他评论的内容*/}
            <span
             onClick={() => setReplyTo(null)}
             style={{color:"blue"}}
            >
              取消
            </span>
          </div>
        )}

        {/*多行文本的输入框标签，里面放评论内容*/}
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={replyTo ? '输入回复内容' : '输入评论内容'}
          rows="3"
          style={{width:"100%",padding:"8px"}}
        />
        <button onClick={submitComment} style={{marginTop:"10px", padding:"10px 15px"}}>
          {replyTo ? '回复' : '发表评论'}{/*按钮文字: 正在回复显示“回复”，否则显示“发表评论”*/}
        </button>
      </div>
    </div>
  );
}






