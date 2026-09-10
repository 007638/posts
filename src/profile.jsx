import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom' //引入useNavigate,用来跳转页面

export default function Profile() {
  const [user, setUser] = useState(null);//变量user存用户信息
  const [postCount, setPostCount] = useState(0); //变量post存帖子总数，初始为0
  const [commentCount, setCommentCount] = useState(0);//变量存回帖总数，初始为0
  const navigate = useNavigate(); //拿到跳转工具用来跳转页面

  useEffect(()=>{
    const userId = localStorage.getItem('userId');//从localStorage里取登录时id
    fetch(`http://172.20.13.32:8099/api/profile?user_id=${userId}`)//向后端发送请求，要这个用户的信息
      .then((res) => res.json())//请求成功
      .then((data) => {   //拿到数据后执行
        setUser(data.user) //把用户信息存进user显示用户名
        setPostCount(data.post_count);//把帖子总数存起来
        setCommentCount(data.comment_count);//把回帖总数存起来
    })
    .catch((err) => console.log('加载个人信息失败',err));//请求失败
  },[]);

  //使用return返回页面
  return (
    <div style={{width:"600px",margin:"0 auto",padding:"20px"}}>
      <h2>个人信息</h2>
       {/*用户信息加载出来才渲染下面*/}
      {user && (
        <div style={{display:"flex",alignItems:"center",marginBottom:"20px"}}>
          <img
            src="/yuan.jpg"
            alt="头像"
            style={{width:"80px",height:"80px",borderRadius:"50%",objectFit:"cover"}}
          />

          <div>
            <div style={{fontSize:"20px",fontWeight:"bold"}}>{user.username}</div>
            <div style={{color:"black"}}>账号ID:{user.id}</div>
          </div>
        </div>
      )}

      {/*帖子总数+回帖总数,点击跳转对应的页面*/}
      <div style={{display:"flex",justifyContent:"space-around",top:"20px", borderTop:"1px solid #eee",paddingTop:"20xp"}}>
        <div onClick={() =>navigate('/my/posts')} style={{textAlign:"center", flex:1}}>
          <div style={{fontSize:"13px", fontWeight:"bold"}}>{postCount}</div>
          <div style={{color:"blue"}}>帖子总数</div>
        </div>

        <div onClick={() =>navigate('/my/comments')} style={{textAlign:"center"}}>
          <div style={{fontSize:"13px",fontWeight:"bold"}}>{commentCount}</div>
          <div style={{color:"blue"}}>回帖总数</div>
        </div>
      </div>
    </div>
  );
}


