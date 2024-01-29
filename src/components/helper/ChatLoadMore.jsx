import React,{useState , useRef , useEffect} from 'react'
import {Spinner} from 'react-bootstrap'
import { connect } from 'react-redux'
import {
  fetchChatMoreDataStart,
} from "../../store/actions/ChatAction";

let scrolledPostion = 0;

const ChatLoadMore = (props) => {
  
  const [isFetching , setIsFetching] = useState(false)

  const [initialRender , seTinitialRender] = useState(false);

  const initalRenderRef  = useRef();

  initalRenderRef.current = initialRender;


  const setScrollHeight = (e) => {

    let element = e.target

    const triggerPositon = 60

    const messageHeight = document.querySelector('.chat-message .chat-message').clientHeight

    scrolledPostion = messageHeight * 12 + triggerPositon;

    if (element.scrollTop <= triggerPositon) {
      if(initalRenderRef &&  props.chatMessages.fetchMoreFlag){
        setIsFetching(true);
      }
    }
  }

  useEffect(() => {
    seTinitialRender(true)
  },[])

  useEffect(() => {
    if(isFetching){
        if(initialRender && props.chatMessages.fetchMoreFlag){
          props.dispatch(
            fetchChatMoreDataStart({
              to_user_id: props.toUserId,
              from_user_id: localStorage.getItem("userId"),
              skip: props.chatMessages.skip,
            })
          );
        }
    }
  },[isFetching])

  useEffect(() => {
    props.chatMessages.loadMoreLoading || setIsFetching(false);
    if(!props.chatMessages.loadMoreLoading){
      document.getElementById('options-holder').scrollTop +=  scrolledPostion; 
    }
  },[props.chatMessages.loadMoreLoading])

  return (
    <>
       <div id="InfiniteScroller" onScroll={setScrollHeight}>
       {isFetching && props.chatMessages.data.messages.length != 0 && (
          <div className="spinnerWrapper">
              <Spinner animation="border" />
          </div>
        )}
        {props.children}
        </div>
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapDispatchToProps)(ChatLoadMore)
