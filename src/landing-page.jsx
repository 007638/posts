import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const [tagList, setTagList] = useState([])
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')
  useEffect(() => {
    fetch('http://172.20.13.32:8099/home')
      .then((res) => res.json())
      .then((data) => {
        console.log('完整返回数据',data);
        setTagList(data.tags);
      })
      .catch((err) => console.log('加载版面失败',err));
  },[])

  //搜索对应的帖子
  const filteredPosts = (postList) => {
    //如果keyword是空，直接返回全部帖子
    if(!keyword) return postList
    //过滤帖子
    return postList.filter(post =>
      post.title.toLowerCase().includes(keyword.toLowerCase())
    )
  }

  //点击跳转到对应标签列表
  const goTagList = (tagId) => {
    navigate(`/list?tagId=${tagId}`)
  }

  return (
    <div style={{width:"1300px",margin:"0 auto",padding:"20px"}}>
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:'flex-end',
        marginTop:"20px"
      }}>
        <h1>汽车论坛</h1>
        <input
          placeholder="搜索帖子"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{width:"120px",borderRadius:"8px",padding:"8px 12px",border:"1px solid black"}}
        />
      </div>

      {/*渲染每一个标签板块*/}
      {tagList && tagList.map(tag => (
        <div key={tag.id} style={{borderBottom:"1px solid #eee",padding:"10px 8px"}}>
          <div>
            <h2>{tag.name}</h2>
          </div>
          {
            //如果tag.Posts存在,帖子数量大于0
            filteredPosts(tag.Posts) && filteredPosts(tag.Posts).length > 0 ? (
              //循环当前标签下的所有帖子
             filteredPosts(tag.Posts).map((post, index) => (
                //显示标题和id
                <div key={post.id} style={{padding:"4px 0"}}>
                  {index+1}. {post.title}
                </div>
              ))
            ) : (
              <div style={{color:"#888"}}>暂无帖子</div>
            )
          }
          <button
            onClick={()=>goTagList(tag.id)}
            style={{right:"8px",bottom:"10px",marginLeft:"1200px"}}
          >更多</button>
        </div>
      ))}
    </div>
  )
}

