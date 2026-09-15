import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage() {
  const [tagList, setTagList] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    fetch('http://172.20.13.32:8099/home')
      .then((res) => res.json())
      .then((data) => {
        console.log('完整返回数据',data);
        setTagList(data.tags);
      })
      .catch((err) => console.log('加载版面失败',err));
  },[])

  //点击跳转到对应标签列表
  const goTagList = (tagId) => {
    navigate(`/home?tag_id=${tagId}`)
  }

  return (
    <div style={{width:"1300px",margin:"0 auto",padding:"20px"}}>
      <div style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:'center'
      }}>
        <h1>汽车论坛</h1>
      </div>

      {/*渲染每一个标签板块*/}
      {tagList && tagList.map(tag => (
        <div key={tag.id} style={{borderBottom:"1px solid #eee",padding:"10px 8px"}}>
          <div style={{display:"flex",alignItems:"center"}}>
            <h2>{tag.name}</h2>
            <button onClick={()=>goTagList(tag.id)}>更多</button>
          </div>
          {
            //如果tag.posts存在,帖子数量大于0
            tag.posts && tag.posts.length > 0 ? (
              //循环当前标签下的所有帖子
              tag.posts.map(post => (
                //显示标题和id
                <div key={post.id}>{post.title}</div>
              ))
            ) : (
              <div style={{color:"#888"}}>暂无帖子</div>
            )
          }
        </div>
      ))}
    </div>
  )
}



