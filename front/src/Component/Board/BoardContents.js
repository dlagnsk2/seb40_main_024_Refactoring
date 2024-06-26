import styled from 'styled-components';
import { ModifyContentBtn, DeleteContentBtn } from '../Common/Button';
import ProfileIcon from '../Member/ProfileIcon';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import { Modal } from '../Common/Modal';
// #6a8bca
const TotalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 850px;
  min-height: 400px;
  margin-top: 100px;
  border: 3px solid #6a8bca;
  border-radius: 10px;
  color: gray;
  @media only screen and (max-width: 768px) {
    width: 700px;
  }

  @media only screen and (max-width: 320px) {
    width: 280px;
  }
`;

const BtnContain = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 600px;
  width: auto;
  margin-bottom: 10px;
`;

const ContentContain = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  height: 100%;
  padding: 5px;
  margin-top: 20px;
  border-top: 3px solid #c0daf9;
  border-bottom: 3px solid #c0daf9;
  line-height: normal;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  @media only screen and (max-width: 320px) {
    display: none;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  max-height: 400px;
  width: 100%;
  margin: 10px;
  padding: 10px;
  /* border: 1px solid black; */
  @media only screen and (max-width: 320px) {
  }
`;

const IdEtcBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
  div {
    padding-bottom: 5px;
  }
  @media only screen and (max-width: 320px) {
    flex-direction: column;
  }
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  min-width: 40px;
  margin-right: 10px;
  font-size: 12px;
  border: 3px solid #92b4ec;
  border-radius: 10px;
  background-color: #eaf4fe;

  @media only screen and (max-width: 320px) {
    margin-left: -170px;
    min-width: 30px;
  }
`;
const Id = styled.div`
  display: flex;
  width: auto;
  height: 30px;
  margin-left: 5px;
  line-height: normal;
  align-content: center;
  justify-content: center;
  @media only screen and (max-width: 320px) {
    font-size: 12px;
    margin-left: -60px;
    margin-top: -25px;
  }
`;

const EtcBox = styled.div`
  display: flex;
  margin-left: auto;
  @media only screen and (max-width: 320px) {
    margin-left: 20px;
    .mobileEtcBox {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
    }
  }
`;

const Date = styled.div`
  display: flex;
  width: auto;
  height: 30px;
  line-height: normal;
  align-content: center;
  justify-content: center;
  @media only screen and (max-width: 320px) {
    font-size: 12px;
    margin-left: 5px;
  }
`;

const View = styled.div`
  display: flex;
  width: auto;
  height: 30px;
  line-height: normal;
  align-content: center;
  justify-content: center;
  margin: 0 10px 0 10px;
  @media only screen and (max-width: 320px) {
    font-size: 12px;
  }
`;

const LikeBox = styled.div`
  display: flex;
  width: auto;
  height: 30px;
  margin-right: 3px;
  line-height: normal;
  align-content: center;
  justify-content: center;
  color: red;
  -webkit-text-stroke: 1.5px black;
  cursor: pointer;
  @media only screen and (max-width: 320px) {
    font-size: 12px;
  }
`;

const UnLikeBox = styled.div`
  display: flex;
  width: auto;
  height: 30px;
  margin-left: 3px;
  line-height: normal;
  align-content: center;
  justify-content: center;
  color: white;
  -webkit-text-stroke: 1.5px black;
  cursor: pointer;
  @media only screen and (max-width: 320px) {
    font-size: 12px;
  }
`;

const TitleBox = styled.div`
  display: flex;
  height: auto;
  width: 100%;
  max-height: 200px;
  margin-left: 5px;
  margin-top: 20px;
  overflow: auto;
  font-size: 23px;
  font-weight: 600;
  @media only screen and (max-width: 320px) {
    font-size: 17px;
    margin-left: 15px;
  }
`;

const TextBox = styled.div`
  display: flex;
  height: auto;
  max-height: 630px;
  max-width: 600px;
  margin-left: 5px;
  padding-top: 5px;
  overflow: auto;
  margin-top: 15px;
  @media only screen and (max-width: 320px) {
    font-size: 15px;
    margin-left: 15px;
  }
`;

const Contents = () => {
  const URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [Decode] = useState(authCtx.parseJwt);

  const [Modalopen, setModalopen] = useState(false);
  const [errModalopen, setErrModalopen] = useState(false);

  const { id } = useParams();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [createdAt, setcreatedAt] = useState();
  const [name, setName] = useState();
  const [boardId, setBoardId] = useState();
  const [like, setLike] = useState();
  const [memberid, setMemberId] = useState();
  const [view, setView] = useState();
  const [category, setCategory] = useState();
  const [errLikeopen, setErrLikeopen] = useState();
  const date = moment(createdAt);
  const momentdata = date.format('YYYY-MM-DD hh:mm:ss');

  const openModal = () => {
    setModalopen(true);
  };
  const closeModal = () => {
    setModalopen(false);
    navigate('/board');
  };

  const UnerrModalopen = () => {
    setErrModalopen(true);
  };

  const UnsetErrLikeopen = () => {
    setErrLikeopen(true);
  };

  const UnerrcloseModal = () => {
    setErrModalopen(false);
    setErrLikeopen(false);
  };

  const Delete = async () => {
    try {
      await axios.delete(`${URL}/board/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      openModal();
    } catch (e) {
      UnerrModalopen();
    }
  };

  const Patchlike = async () => {
    try {
      const res = await axios.patch(
        `${URL}/board/${id}/like`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      setLike(res.data.like);
    } catch (e) {
      UnsetErrLikeopen();
    }
  };

  const Patchdislike = async () => {
    try {
      const res = await axios.patch(
        `${URL}/board/${id}/dislike`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      setLike(res.data.like);
    } catch (e) {
      UnsetErrLikeopen();
    }
  };

  const ModifyButton = () => {
    navigate(`/modifyboard/${boardId}`);
  };

  const DeleteButton = () => {
    Delete();
  };

  useEffect(() => {
    const Get = async () => {
      try {
        const res = await axios.get(`${URL}/board/${id}`);
        setBoardId(res.data.boardId);
        setTitle(res.data.title);
        setBody(res.data.body);
        setcreatedAt(res.data.createdAt);
        setCategory(res.data.category);
        setLike(res.data.like);
        setName(res.data.memberPosted.name);
        setMemberId(res.data.memberPosted.id);
        setView(res.data.view);
      } catch (e) {
        console.log(e);
      }
    };
    Get();
  }, []);

  return (
    <>
      <TotalContent>
        <BtnContain>
          {memberid === Decode.id ? (
            <>
              <ModifyContentBtn ModifyButton={ModifyButton} />
              <DeleteContentBtn DeleteButton={DeleteButton} />
            </>
          ) : null}
        </BtnContain>
        <ContentContain>
          <ImageBox>
            <ProfileIcon />
          </ImageBox>
          <ContentBox>
            <IdEtcBox>
              <Tag>{category}</Tag>
              <Id>{name}</Id>

              <EtcBox>
                <Date>{momentdata}</Date>
                <View>View : {view}</View>
                <LikeBox onClick={Patchlike}>❤</LikeBox>
                {like}
                <UnLikeBox onClick={Patchdislike}>❤</UnLikeBox>
              </EtcBox>
            </IdEtcBox>
            <TitleBox>{title}</TitleBox>
            <TextBox>{body}</TextBox>
          </ContentBox>
        </ContentContain>
        <Modal open={Modalopen} close={closeModal} header="게시물 삭제 알림">
          게시물이 삭제 되었습니다.
        </Modal>
        <Modal open={errModalopen} close={UnerrcloseModal} header="오류 알림">
          게시물이 삭제가 정상적으로 처리되지 않았습니다.
        </Modal>
        <Modal open={errLikeopen} close={UnerrcloseModal} header="오류 알림">
          이미 투표를 완료한 게시물입니다.
        </Modal>
      </TotalContent>
    </>
  );
};

export default Contents;
