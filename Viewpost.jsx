

import React, { useState, useEffect,callback,useCallback,useRef } from 'react';
import './Viewpost.css';
import CommentCard from './CommentCard.jsx';
import { useNavigate,useLocation } from "react-router-dom";

import axios from 'axios';
import Header_islogin from './Header_islogin';

const { kakao } = window;

export const Viewpost=(props)=>{
    const location = useLocation();
    const restaurantname=location.state.restaurantname;
    /*const id2 = location.state.id2;
    console.log(id2)*/
    // 겸상 신청 페이지
  const [diningSpoonList, setDiningSpoonList] = useState([]);
  const [diningDescription, setDiningDescription] = useState("");
  const handleDining_descreption = useCallback((e) => {
    setDiningDescription(e.target.value);
  }, []);
    // 겸상 신청 또는 취소가 완료되었다는 팝업
  const [showAttendPopup, setShowAttendPopup] = useState(false);
  const [showUnattendPopup, setShowUnattendPopup] = useState(false);
    
    
    useEffect(()=>{
        axios
      .get("/applications")
      .then((response) => {
        setDiningSpoonList(
          response.data.filter((data) => data.spoon_id !== "")
        );
      })
      .catch((error) => {
        console.log('/applications',error);
      });
  

    var infowindow = new kakao.maps.InfoWindow({zIndex:1});

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 9 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(); 

// 키워드로 장소를 검색합니다
ps.keywordSearch(region+' '+restaurantname, placesSearchCB); 

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB (data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
    } 
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
    
    // 마커를 생성하고 지도에 표시합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x) 
    });

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        infowindow.open(map, marker);
    });
}

    },[])
     //posts 데이터베이스 업데이트
     const [attender1, setAttender1] = useState("");
     const [attender2, setAttender2] = useState("");
    const [attender3, setAttender3] = useState("");
    const [attendcounter, setAttendcounter] = useState(0);
    useEffect(() => {
      axios
        .get(`/dining/${id}`) 
        .then((response) => {
          console.log('response.data.attender1:'+response.data[0].attender1);
          // response에서 받아온 데이터를 각 상태에 할당
          const post = response.data;
          let attender01=response.data[0].attender1;
          let attender02=response.data[0].attender2;
          let attender03=response.data[0].attender3;
          let attendcounterr=response.data[0].attendcounter;
          setAttender1(attender01);
          setAttender2(attender02);
          setAttender3(attender03);
          setAttendcounter(attendcounterr);
          console.log('post에get요청한결과'+attender01+attender02+attender03);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    
    const navigate = useNavigate();
    const goToback = () => {
        navigate(-1);
        
      };
    function hourcal(hour){
        if(hour>12){hour=hour-12;
        return "오후 "+hour;}
        else {return "오전 "+hour;}
      };
      function minutecal(minute){
        if(minute==0){
        return ;
        }
        else {
          return minute+"분";
        }
      };
      const deletepost=()=>{
        if(userid===accessuserid){
        axios.delete(deleteurl,{})
        alert("삭제되었습니다.");
        goToback();
        }else{
            alert("작상자만 삭제할 수 있습니다.")
        }
      }
    const id=location.state.id;
    let deleteurlf='/dining/';
    let deleteurl=deleteurlf+id;
    const postthumbnail=location.state.postthumbnail;
    const posttitle = location.state.posttitle;
    const accessuserid=location.state.accessuserid;
    const region=location.state.region;
    const month=location.state.month;
    const day=location.state.day;
    const hour=location.state.hour;
    const minute=location.state.minute;
    const writeday=location.state.writeday;
    const writemonth=location.state.writemonth;
    const endday=location.state.endday;
    const endmonth=location.state.endmonth;
    const introduction=location.state.introduction;
    const maxattender=location.state.maxattender;
    const my_attendcounter=location.state.attendcounter;
    //const attender1=location.state.attender1;
    //const attender2=location.state.attender2;
    //const attender3=location.state.attender3;
    const postid=location.state.postid;
    const userid=location.state.userid;
    const[comment,setcomment]=useState('');
    // 겸상자 선정이 완료된 사람


    // 여기서부터 수정
    // const renderSpoonButtons = () => {
    //     const isAttending = diningSpoonList.filter(
    //       (spoon) =>
    //         spoon.username == accessuserid &&
    //         spoon.message == id
    //     ).length > 0;
    
        
    //     const hasAlreadyAttended = [attender1, attender2, attender3].includes(accessuserid);
    //     console.log('==========================='+hasAlreadyAttended);
    //     console.log(attender1+'  '+attender2+'   '+attender3+'   '+accessuserid);
    //     if (hasAlreadyAttended) {
    //       return <div className="AttendCompleteContent">{accessuserid}님은 밥장 {userid}님과 겸상하셨습니다!</div>; // 또는 원하는 메시지 혹은 컴포넌트
    //     } else if (isAttending) {
    //       return (
    //         <button className="unattendInviteButton" onClick={handleCancelAttendance}>
    //           겸상 취소하기
    //         </button>
    //       );
    //     } else {
    //       return (
    //         accessuserid===undefined
    //         ?<>
    //         <button className="attendInviteButton" onClick={() => alert('로그인 후 이용해주세요')}>
    //         겸상하기
    //       </button></>
    //         :<>         
    //         <button className="attendInviteButton" onClick={handleAttendInvite}>
    //           겸상하기
    //         </button></>
    //       );
    //     }
    //   };

    // 겸상신청을 이미 한 사람 조회
useEffect(() => {
  axios
    .get('/applications/dining_spoon') 
    .then((response) => {
      // 현재 post에서 신청한 모든 사람들을 가져와서 상태에 할당
      const allApplicants = response.data.filter(
        (item) => item.DiningId === postnumber
      );
      setDiningSpoonList(allApplicants);

      // 겸상자 선정이 완료된 사람, 현재 post에서 attending이 true인 사람들을 필터링하여 상태에 할당
      const actualAttenders = response.data.filter(
        (item) => item.DiningId === postnumber && item.attending === 1
      );
      setAttenders(actualAttenders);
    })
    .catch((error) => {
      console.log(error);
    });
}, []);

    
    const [attenders, setAttenders] = useState([]); 
    // 현재 유저가 이미 해당 게시글에 겸상신청을 한 경우 찾음 attender와 다름!!
const renderSpoonButtons = () => {
  const isApplying = diningSpoonList.some(
    (spoon) =>
        spoon.username === accessuserid && spoon.attending === 0
);


 // 현재 유저가 이미 해당 게시글에  attender인지 확인
  const hasAlreadyAttended = attenders.some((item) => item.username === accessuserid);

  if (hasAlreadyAttended) {
    return <div className="AttendCompleteContent">{accessuserid}님은 밥장 {postid}님과 겸상하셨습니다!</div>;
  } else if (isApplying) {
    return (
      <button className="unattendInviteButton" onClick={handleCancelAttendance}>
        겸상 취소하기
      </button>
    );
  } else {
    return (
      accessuserid===undefined
      ?<>
        <button className="attendInviteButton" onClick={() => alert('로그인 후 이용해주세요')}>
          겸상하기
        </button></>
      :<>         
        <button className="attendInviteButton" onClick={handleAttendInvite}>
          겸상하기
        </button></>
    );
  }
};

        // 겸상 신청 및 확인 버튼 함수
  const handleConfirmClick = useCallback(() => {
    const userId = accessuserid;
    console.log('userId',userId)
    // axios.put(`/dining/${userId}`,{attendcounter:my_attendcounter+1,});
    axios
      .post("/applications", {
        username: userId,
        message: diningDescription,
        DiningId: id,
      })
      .then((response) => {
        console.log('겸상 신청하여 db에 올라가는 값',response.data);
        setShowAttendPopup(false); // 전송이 성공하면 팝업을 닫음
        const addedSpoonId = response.data.spoon_id;
        if (addedSpoonId == userId) {
          setShowAttendPopup(false);
        }
        //직접 state를 업데이트합니다.
        setDiningSpoonList(prevList => [
          ...prevList,
          response.data
        ]);
      })
      .catch((error) => {
        console.log('겸상신청',error);
        console.log('diningDescription',diningDescription)
        console.log('id',id)
      });
  }, [accessuserid, diningDescription, id]);
  
  // 겸상 신청 소개글 작성 팝업 열기
  const handleAttendInvite = useCallback(() => {
    setShowAttendPopup(true);
  }, []);
  // 겸상 신청 팝업 닫기
  const handleAttendPopupClose = useCallback(() => {
    setShowAttendPopup(false);
  }, []);

  // 현재까지 신청한 겸상자 수 구하는 함수
  const AttendInviteCount = diningSpoonList.filter(
    (spoon) => spoon.postnumber == id && spoon.attending == 0
  ).length;

  // 겸상 신청 취소를 위한 함수
  const handleCancelAttendance = useCallback(() => {
    // axios.put(`/dining/${id}`);
    const userId = accessuserid;
    
    // 해당 게시글에 내 아이디가 있으면 mySpoonId(diningSpoon 데이터베이스의 id) 존재
    const mySpoon = diningSpoonList.find(spoon => spoon.username == userId && spoon.DiningId == id);
    const mySpoonId = mySpoon ? mySpoon.id : null;
    console.log('내 db의 고유 id',mySpoonId);

    if (!mySpoonId) {
      console.log("해당하는 항목을 찾을 수 없습니다.");
      return;
    }

    axios
      .delete(`/applications/${mySpoonId}`)
      .then((response) => {
        console.log('response.data',response.data);
        setShowUnattendPopup(true);
        // 취소가 성공하면 diningSpoonList를 다시 불러옵니다.
        // 직접 state를 업데이트합니다.
      // setDiningSpoonList(prevList => prevList.filter(item => item.id !== mySpoonId));    
    })    
    .catch((error) => {
      console.log(error);
    });
  }, [accessuserid, id, diningSpoonList]);


// // 겸상 신청 팝업 닫기
// const handleUnattendPopupClose = useCallback(() => {
//   // setShowUnattendPopup(false);
//   setShowAttendPopup(false);
// }, []);

// 겸상 신청 팝업 닫기
const handleUnattendPopupClose = useCallback(() => {
  setShowUnattendPopup(false);
}, []);

  function gotoSelectSpoon() {
    navigate("/SelectSpoon", {
      state: {
        maxattender:maxattender,
        attendcounter:attendcounter,
        // attender1: attender1,
        // attender2: attender2,
        // attender3: attender3,
        // viewpost 밥장인지 아닌지 추가
        postid: postid,
        id2: accessuserid,
        postnumber: id,
        AttendInviteCount: AttendInviteCount,
        accessuserid: accessuserid,
      },
    });
  }
  const renderMySpoon = ()=>{
    return(
      <div className="myspoon">
        {diningSpoonList.map(spoon=>{
          const isMyAttend = spoon.username == accessuserid && spoon.DiningId == id;
          if(isMyAttend){
            console.log('신청한 내 아이디 확인',spoon.username);
            console.log('신청한 내 소개글 확인',spoon.message);
            console.log('신청한 내 id값 확인',spoon.id);
          }
          return null;
        })}
      </div>
    );
  };

  // 댓글부분 , 여기까지 수정함
    const handlecomment=(e)=>{
        setcomment(e.target.value);
      }
      
      const now=new Date();
      const commentwritemonth=now.getMonth()+1;
      const commentwriteday=now.getDate();
      const commentwritethour=now.getHours();
      const commentwriteminute=now.getMinutes();
      const [mentions,setComments]=useState([]);
    function sendcomment(){
        axios.post('/mentions', {
            commentpostid:id,
            writerid:accessuserid,
            comment:comment,    
            writeday:commentwriteday,
            writemonth:commentwritemonth,
            writehour:commentwritethour,
            writeminute:commentwriteminute
          })
          .then((response) => {
            getComments();
            alert('댓글을 등록하였습니다.');
           
          })
          .catch((error) => {
            // 예외 처리
          })
    };
    const getComments=()=>{
        axios.get('/mentions').then((res)=>{
          
          console.log(res.data);
          setComments(res.data);})
    }
    useEffect(()=>{
    
        getComments();
      },[]);
      let attender_1=(attender1=='')?attender1:attender1+'님';
      let attender_2=(attender2=='')?attender2:attender2+'님';
      let attender_3=(attender3=='')?attender3:attender3+'님';
  return (
    <div className="Viewpost">
    <Header_islogin userid={accessuserid}/>
     <div className="Viewpost2">
        <div className="Viewpost3">
            <br></br><br></br>
            <div className='gridview'>
              <div className="post3">
            
               
                 <img src={postthumbnail} className="postimage"/>
               
              
                
                
            
             
             </div>
             
            <div className="rightbar">
          <div>
            {userid === accessuserid ? (
              <>
                <div className="postid">
                  밥장 {userid}님<br></br>별점{" "}
                </div>
                <br></br>
                <div className="attenderlist">
                  지금까지 신청한 인원수
                  <br></br>
                  <h3>{AttendInviteCount}명</h3>
                  <div className="div3">
                    <button className="invitebutton" onClick={gotoSelectSpoon}>
                      겸상자 선택
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="postid">
                  밥장 {userid}님<br></br>별점{" "}
                </div>
                <br></br>
                <div className="attenderlist">
                  지금까지 신청한 인원 수
                  <br></br>
                  <h3>{AttendInviteCount}명</h3>
                  <div className="div3">
                    {renderMySpoon()}
                    {renderSpoonButtons()}
                  </div>
                  {showAttendPopup && (
                    <div className="popup">
                      <h1>{posttitle} 밥상에 겸상하기!</h1>
                      <input
                        value={diningDescription}
                        onChange={handleDining_descreption}
                        type="text"
                        name="dining_description"
                        placeholder="겸상 참여 신청글"
                        className="input_description"
                      ></input>
                      <div className="button-container">
                        <button className="confirm-button" onClick={handleConfirmClick}                        >
                          확인
                        </button>
                        <button className="close-button" onClick={handleUnattendPopupClose}                  >
                          닫기
                        </button>
                      </div>
                    </div>
                  )}
                  {showUnattendPopup && (
                    <div className="popup">
                      <div className="popup-title">취소가 완료되었습니다</div>
                      <div className="button-container">
                        <button className="close-button" onClick={handleUnattendPopupClose}                        >
                          닫기
                        </button>
                      </div>
                    </div>
                  )}
 
                </div>
              </>
            )}
          </div>
        </div>
            
             </div>
                <div className='post1'>
                <br></br>
 <div className='title'> {posttitle} <br></br><div className="color"> #{maxattender}인상 #{restaurantname}</div></div>
 <div className='bar'></div>
 <br></br>
 

 <div className="contentname">식사 장소: {region} / {restaurantname}</div>
 <br></br>
 <div className="contentname">식사 일시: {month}월 {day}일 {hourcal(hour)}시{minutecal(minute)}</div>
 <br></br>
 <div className="contentname">모집 기간: {writemonth}월 {writeday}일 ~ {endmonth}월 {endday}일</div>
 <br></br>
 <div className="contentname">겸상자: {attender_1} {attender_2} {attender_3} </div>
 <br></br>
 <div className="contentname">소개글: {introduction}</div>
 <br></br>
 <div className="contentname"></div>
 
         {/* <div id="map" style={{width:'400px',height:'500px'}}></div>*/}
         
        
                
         </div>
         <br></br>
         <div className='kmap' id="map" style={{width:'100%',height:'200px'}}></div>
         <br></br>
        
         <button onClick={deletepost} className="delbutton">삭제하기</button>
         <br></br>
         <div className='post2'><br></br></div>
         
         <div className="comment"></div>
            <div className="inputWrappost_viewpost">
            <textarea value={comment} onChange={handlecomment} type='text' name="comment" placeholder="댓글 입력" className="inputboxpost2_viewpost" ></textarea>
            <button onClick={()=>sendcomment()} className="delbutton">댓글 등록</button>
            </div>
            <br></br><br></br>
            <div className="no">
             
             {mentions.map(comment=>{
               
              
               if(comment.commentpostid==id){
               return (
                 
                 <CommentCard 
                 commentpostid={comment.commentpostid}
                 writemonth={comment.writemonth}
                 writeday={comment.writeday}
                 comment={comment.comment}
                 writerid={comment.writerid}
                 writehour={comment.writehour}
                 writeminute={comment.writeminute}
                 />
                 
               );}
              
             })}
           </div>
         
    </div>
   
    </div>
    
    {/*<div>접근유저아이디출력 (테스트용):{accessuserid}</div>*/}
</div>

  );
}
export default Viewpost;