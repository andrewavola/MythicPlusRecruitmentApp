

function Message({own}) {
  return (
    <div className={own ? "message" : "message own"}>
      <div className="messageTop">
        <img src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U" alt="" className="messageImg" />
        <p className="messageText">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  )
}

export default Message