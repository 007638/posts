import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'//用来跳转页面
import {useLocation} from 'react-router-dom'//用来读url的的参数

export default function MyComments() {
  const [commentList, setCommentList] = useState([]);//变量commentList存回帖数组，初始为空
  const navigate = useNavigate(); //拿到跳转工具用来跳转页面
  const location = useLocation(); //拿到当前页面完整的url信息
  const searchParams = new URLSearchParams(location.search);//解析url后面的参数
  const userId = searchParams.get('user_id');//取出url里的user_id的值

  useEffect(()=>{
    fetch(`http://localhost:8099/api/my/comments?user_id=${userId}`) //向后端发送请求
      .then((res) => res.json())//请求成功
      .then((data) => setCommentList(data.result)) //把回帖数组存进CommentList
      .catch((err) => console.log('加载我的评论失败', err));//请求失败
  },[userId]);

  //使用return返回页面
  return (
    <div styel={{width:"600px",margin:"0 auto",padding:"20px"}}>
      <h2>我的回帖</h2>
      {/*没有评论过，提示文字*/}
      {commentList.length === 0 ? (
        <div style={{color:"#888"}}>你还没有评论过帖子</div>
      ) : (
        //有评论，map循环遍历数组
        commentList.map(item => (
          //key是react渲染列表的唯一标识，点击跳转到帖子详情页
          <div
            key={item.id}
            style={{borderBottom:"1px solid #eee",padding:"12px 8px"}}
            onClick={()=>navigate(`/post/${item.post?.id}`)}
          >
            <div style={{fontWeight:"bold",fontSize:"14px"}}>
              原贴:{item.Post?.Title}
            </div>
            {/*评论时间*/}
            <div style={{fontSize:"10px", color:"blue"}}>
              {item.Created_at}
            </div>
            <div style={{marginTop:"6px",padding:"3px 5px"}}>我的回复:{item.content}</div>
          </div>
        ))
      )}
      <button
        onClick={()=>navigate('/profile')}
        style={{marginTop:"20px",padding:"6px 8px"}}>返回个人主页
      </button>
    </div>
  )
}


