import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom' //引入useNavigate, 用来跳转页面

export default function MyPosts() {
  const [posts, setPosts] = useState([]);//变量posts存帖子数组，初始为空
  const navigate = useNavigate();  //拿到跳转工具用来跳转页面

  useEffect(()=>{
    const userId = localStorage.getItem('userId');//从本地储存里取登录时的id
    fetch(`http://172.20.13.32:8099/api/my/posts?user_id=${userId}`)//向后端发送请求，要这个用户的信息
      .then((res) => res.json())//请求成功
      .then((data) => setPosts(data.result)) //把帖子数组存进posts
      .catch((err) => console.log('加载我的帖子失败', err));//请求失败
  },[]);


  //使用return返回页面
  return (
    <div style={{width:"600px",margin:"0 auto",padding:"20px"}}>
      <h2>我的帖子</h2>
      {posts.length === 0 ? (  //如果一篇帖子都没有
        <div style={{color: '#888'}}>还没有发布过帖子</div> //显示这行
      ) : (  //如果有帖子
        posts.map((post) => ( //循环每条帖子
          <div key={post.id} style={{borderBottom:"1px solid #eee", padding:"10px 8px"}}
            onClick={() =>navigate(`/post/${post.id}`)}> {/*点击跳转到对应帖子的详情页*/}
            <div style={{fontWeight:"bold"}}>{post.title}</div> {/*帖子标题加粗*/}
            <div style={{color:"black", fontSize:"13px"}}>{post.content}</div> {/*帖子内容*/}
          </div>
        ))
      )}
    </div>
  );
}



