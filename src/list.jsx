import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function List() {
  const [posts, setPosts] = useState([])
  //声明状态keyword,初始值是空字符串，用户每次在搜索框打字时，就用setKeyword更新它
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    fetch('http://172.20.13.32:8099/api/posts')
      //后端返回的是JSON字符串
      .then((res) => res.json())
      //等解析完，拿到真正的数据data,data.result是后端返回的帖子数组
      .then((data) => {
        setPosts(data.result || [])
      })
      .catch(err => console.log('获取列表失败',err))//请求失败返回错误信息
  },[])//useEffect的闭合,[]表示只执行一次

  //搜索出对应的帖子
  //posts.filter((post):从所有帖子里挑出符合条件的，并把它存到filteredposts中
  const filteredPosts = posts.filter((post) =>
    //判断标题里包不包含搜索词
    post.title.toLowerCase().includes(keyword.toLowerCase())
  )

  //使用return返回渲染页面
  return (
    <div style={{width:"1300px",margin:"0 auto",padding:"20px"}}>
      <div style={{
        display:'flex',
        justifyContent:"space-between",
        alignItems:'center',
        marginTop:"10px"
      }}>
        <input
          placeholder="搜索帖子"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{width:"120px",borderRadius:"8px",padding:"8px 12px",border:"1px solid black"}}
        />
        <button onClick={() => navigate('/create')}
          style={{background:"white",padding:"2px 6px",color:"black",borderRadius:"8px",fontSize:"13px"}}
        >
          发布新话题
        </button>
      </div>

      {/*遍历所有帖子*/}
      {filteredPosts.map((post) => (
        <div key={post.id} style={{borderBottom:"1px solid #f0f0f0",padding:"10px 5px"}}>
          {/*给每条帖子添加外框*/}
          {/*点击标题，跳转到这篇帖子的详情页*/}
          <div
            onClick={() => navigate(`/post/${post.id}`)}
            style={{color:"#f0f0f0",fontSize:"13px",fontWeight:"bold"}}>
            {/*显示帖子标题*/}
            {post.title}
          </div>
          {/*作者信息行的外框*/}
          <div style={{marginTop:"3px",fontSize:"10px",color:"#999"}}>
            {/*显示作者名，如果存在就显示作者名，如果不存在就显示匿名*/}
            {post.user ? post.user.username : '匿名'}
            {/*最右侧显示回复数*/}
            <span style={{float:"right",color:"blue"}}>
              回复{post.comments ? post.comments.length : 0}
            </span>
          </div>
        </div>
      ))}

      {/*如果一篇帖子都没有就准备提示语*/}
      {filteredPosts.length === 0 && (
        <div style={{textAlign:"center",color:"black",padding:"20px 10px"}}>
          {/*根据有没有搜索词，显示对应的提示词*/}
          {keyword ? '没有搜到相关帖子' : '暂无帖子，点击右上角"发布新话题"'}
        </div>
      )}
    </div>
  )
}

