import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

export default function List() {
  const [posts, setPosts] = useState([])
  //声明状态keyword,初始值是空字符串，用户每次在搜索框打字时，就用setKeyword更新它
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  //读取网址参数，拿到首页更多传过来的tagId
  const [searchParams] = useSearchParams()
  const tagId = searchParams.get('tagId')

  useEffect(() => {
    let url = 'http://172.20.13.32:8099/api/posts'
    if(tagId){
      url += `?tagId=${tagId}`
    }
      fetch(url)
      //后端返回的是JSON字符串
      .then((res) => res.json())
      //等解析完，拿到真正的数据data,data.result是后端返回的帖子数组
      .then((data) => {
        setPosts(data.result || [])
      })
      .catch(err => console.log('获取列表失败',err))//请求失败返回错误信息
  },[])//useEffect的闭合,[]表示只执行一次

  //搜索出对应的帖子,先判断tagId,再判断关键词
  //posts.filter((post):从所有帖子里挑出符合条件的，并把它存到filteredposts中
  const filteredPosts = posts.filter((post) => {
    //判断标题里包不包含搜索词
    const searchMatch =  post.title.toLowerCase().includes(keyword.toLowerCase())
    return  searchMatch
  })

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
      </div>


      {/*遍历所有帖子*/}
      {filteredPosts.map((post) => (
        <div key={post.id} style={{borderBottom:"1px solid #f0f0f0",padding:"10px 5px"}}>
          {/*给每条帖子添加外框*/}
          {/*点击标题，跳转到这篇帖子的详情页*/}
          <div
            onClick={() => navigate(`/post/${post.id}`)}
            style={{color:"black",fontSize:"13px",fontWeight:"bold"}}>
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

      {/*一篇帖子没有就准备提示语*/}
      {filteredPosts.length === 0 && (
        <div style={{textAlign:"center",color:"black",padding:"20px 10px"}}>
          {keyword ? '没有搜到相关帖子' : '暂无帖子，点击右上角发布新话题'}
        </div>
      )}
  </div>
)
}
