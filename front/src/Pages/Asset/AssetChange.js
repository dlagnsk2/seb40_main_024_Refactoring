/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import {
  LongNavbarBox,
  MiniNavbarBox,
} from '../../Component/Common/NavebarRev';
import { TitleCashBtn } from '../../Component/Common/Button';
import { Fade } from 'react-awesome-reveal';
import { useState, useEffect, useContext } from 'react';
import { Modal, AssetTextEditModal } from '../../Component/Common/Modal';
import { AssetAdata, pieOptions } from '../../Component/Asset/Asset_A_Data';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { FiEdit, FiDelete } from 'react-icons/fi';
import AuthContext from '../../store/AuthContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const URL = process.env.REACT_APP_API_URL;

const MainPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid blue;
  width: 100%;
  height: 100%;
`;

const TopPage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* border: 1px solid green; */
`;

const BottomPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid green;
`;

const MainContain = styled.div`
  margin-left: 120px;
  /* border: 1px solid pink; */
  /* margin-top: 400px; */
`;

const ChartContain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 800px;
  height: 800px;
  margin-right: 120px;
  /* border: 1px solid red; */
  div {
    width: 800px;
    height: 800px;
  }
`;

const H1 = styled.h1`
  margin-bottom: 50px;
  border-bottom: 5px solid #8ec3b0;
  color: #9ed5c5;
  margin-left: 13px;
  width: 200px;
`;

const H2 = styled.h2`
  margin-bottom: 40px;
  border-bottom: 5px solid #8ec3b0;
  color: #9ed5c5;
  margin-left: 13px;
  width: 190px;
  margin-top: 100px;
`;

const H3 = styled.h3`
  color: #9ed5c5;
  width: 300px;
  margin-left: 13px;
  margin-bottom: 10px;
  line-height: normal;
`;
const H3Title = styled.h3`
  color: orange;
  width: 300px;
  margin-left: 13px;
  margin-bottom: 10px;
  line-height: normal;
  div {
    cursor: pointer;
  }
`;

const P = styled.p`
  color: red;
  margin-top: -10px;
  margin-bottom: 15px;
  margin-left: 25px;
  font-size: 12px;
`;

const Div = styled.div`
  display: flex;
  align-items: left;
  margin: 15px;
  div {
    margin-left: 20px;
  }
`;

const Input = styled.input`
  width: 300px;
  height: 30px;
  border-top: none;
  border-left: none;
  border-right: none;
  padding-left: 5px;
  padding-right: 5px;
  outline: none;
  color: #9ed5c5;
  font-weight: 700;
  border-bottom: 3px solid #9ed5c5;
  ::placeholder {
    color: #777;
    margin-top: 20px;
  }
`;

const ChartBox = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 450px;
  height: 500px;
  /* margin-left: 120px; */
  /* top: 300px !important; */
`;

const FirstGraph = styled.div`
  display: flex;
  margin: 0 auto;
`;

const GraphPie = styled.div`
  display: flex;
  margin-top: 30px;
  width: 400px;
  div {
    display: flex;
  }
`;

const GraphH1 = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 50px;
  margin-top: 300px;
  margin-bottom: 150px;
  width: 450px;
  font-size: 50px;
  align-items: center;
  /* color: #9ed5c5; */
  text-align: center;
  text-shadow: 1px 1px 2px #bcead5;
  color: #bcead5;
`;

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 90px;
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 5px solid #8ec3b0;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #8ec3b0 transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const EditButton = styled.button`
  color: orange;
  background-color: transparent;
  font-weight: bold;
  font-size: 18px;
  border: none;
  line-height: normal;
  margin-left: 10px;
  cursor: pointer;
  :hover {
    color: #9ed5c5;
    letter-spacing: 1px;
    transform: scale(1.5);
  }

  :active {
    color: yellow;
  }
`;

const AssetListBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
  line-height: normal;
  border: 1px solid #9ed5c5;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 20px;
  :hover {
    color: #fff;
    letter-spacing: 1px;
    transform: scale(1.2);
  }
`;

function AssetChange() {
  const authCtx = useContext(AuthContext);
  const [TextModalopen, setTextModalopen] = useState(false);
  const [errTextModalopen, seterrTextModalopen] = useState(false);
  const [Modalopen, setModalopen] = useState(false);
  const [errModalopen, seterrModalopen] = useState(false);

  const [Cash, setCash] = useState('');
  const [Text, setText] = useState('');
  const [EditText, setEditText] = useState('');
  const [Data, setData] = useState('');

  console.log(authCtx.parseJwt.id);

  //? POST
  const Postdata = {
    assetType: Text,
    assetValue: Cash,
  };
  // eslint-disable-next-line no-unused-vars
  const postAssetApi = async () => {
    await axios
      .post(`${URL}member/1/asset`, Postdata)
      .then((res) => openCashModal())
      .catch((err) => openCashModal());
  };
  //?

  //? PATCH
  // eslint-disable-next-line no-unused-vars
  const Patchdata = {
    assetType: EditText,
    strValue: '+1000',
  };

  // eslint-disable-next-line no-unused-vars
  const patchAssetsApi = async () => {
    await axios
      .patch(`${URL}/member/1/asset/1`, Patchdata)
      .then((res) => openEditTextModal())
      .catch((err) => console.log(err));
  };
  //?

  //? GET
  // eslint-disable-next-line no-unused-vars
  const getAssetsApi = async () => {
    await axios
      .get(`${URL}/member/${authCtx.parseJwt.id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  //?

  //? DELET
  // eslint-disable-next-line no-unused-vars
  async function deletAssetApi() {
    await axios
      .delete(`${URL}/member/1/asset/4`)
      .then((res) => openCashModal())
      .catch((err) => console.log(err));
  }
  //?

  const openEditTextModal = () => {
    setTextModalopen(true);
  };

  const openCashModal = () => {
    Text && Cash && isNaN(Cash) === false
      ? setModalopen(true)
      : Text || Cash || isNaN(Cash) === true
      ? seterrModalopen(true)
      : null;
  };

  const closeModal = () => {
    setModalopen(false);
    setTextModalopen(false);
  };

  const errcloseModal = () => {
    seterrModalopen(false);
    seterrTextModalopen(false);
  };

  const TextonChange = (e) => {
    setText(e.target.value);
  };
  const EditTextonChange = (e) => {
    setEditText(e.target.value);
  };

  const CashonChange = (e) => {
    setCash(e.target.value);
  };

  const Cashtarget = Cash.toString().replace(
    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
    ','
  );

  let ReviewCash = 0;
  if (Cashtarget) {
    ReviewCash = Data[0].assetValue + Number(Cash);
  }
  const Reviewtarget = ReviewCash.toString().replace(
    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
    ','
  );

  // let title = [];
  // {
  //   Data
  //     ? Data.map((data) => {
  //         title.push(data.assetType);
  //       })
  //     : null;
  // }
  // const AssetTitle = [...new Set(title)];
  // if (AssetTitle.length < 7) {
  //   for (let i = 0; i < 7 - AssetTitle.length; i++) {
  //     AssetTitle.push(undefined);
  //   }
  // }

  useEffect(() => {
    getAssetsApi();
  }, []);

  useEffect(() => {
    getAssetsApi();
  }, [Modalopen, TextModalopen, errTextModalopen, errModalopen, Text, Cash]);

  return (
    <>
      <LongNavbarBox />
      <MiniNavbarBox />
      {Data ? (
        <>
          <MainPage>
            <GraphH1>보유자산 현황</GraphH1>
            <TopPage>
              <ChartContain>
                <ChartBox>
                  <FirstGraph>
                    <GraphPie>
                      <Pie data={AssetAdata} options={pieOptions} />
                    </GraphPie>
                  </FirstGraph>
                </ChartBox>
              </ChartContain>

              <MainContain>
                <Modal
                  open={Modalopen}
                  close={closeModal}
                  header="자산 금액 수정 알림"
                >
                  자산 금액이 수정 되었습니다.
                </Modal>

                <Modal
                  open={errModalopen}
                  close={errcloseModal}
                  header="자산 금액 오류 알림"
                >
                  <p>
                    오류 : 수정할 자산명칭 및 자산 금액을 &#34; , &#34; 없이
                  </p>
                  <p style={{ marginLeft: '42px', marginTop: '10px' }}>
                    숫자로만 입력해주세요.
                  </p>
                </Modal>

                <Modal
                  open={TextModalopen}
                  close={closeModal}
                  header="자산 종류 수정 알림"
                >
                  변경할 자산 명칭 ( 현재 자산 명칭 : {Data[0].assetType})
                  <Div>
                    <Input
                      onChange={EditTextonChange}
                      value={EditText}
                      type="text"
                      placeholder="변경하실 자산 명칭을 적어주세요. (ex. 다이아몬드)"
                    />
                  </Div>
                </Modal>

                <AssetTextEditModal
                  open={TextModalopen}
                  close={closeModal}
                  header="자산 종류 수정 알림"
                  api={patchAssetsApi}
                >
                  변경할 자산 명칭 ( 현재 자산 명칭 : {Text} )
                  <Div>
                    <Input
                      onChange={EditTextonChange}
                      value={EditText}
                      type="text"
                      placeholder="변경하실 자산 명칭을 적어주세요. (ex. 다이아몬드)"
                    />
                  </Div>
                </AssetTextEditModal>

                <Modal
                  open={errTextModalopen}
                  close={errcloseModal}
                  header="자산 종류 오류 알림"
                >
                  오류 : 수정할 자산 종류를 입력해주세요
                </Modal>

                <H1>자산 리스트</H1>
                {Data ? (
                  <>
                    <AssetListBox>
                      <H3Title style={{ marginTop: '10px' }}>1 &nbsp;)</H3Title>
                      {/* {AssetTitle[0] === undefined ? ( */}
                      <H3Title>
                        명칭
                        <EditButton onClick={openEditTextModal}>
                          <FiEdit />
                        </EditButton>
                        <EditButton onClick={deletAssetApi}>
                          <FiDelete />
                        </EditButton>
                      </H3Title>
                      {/* ) : ( */}
                      <H3Title>
                        명칭
                        <EditButton onClick={openEditTextModal}>
                          <FiEdit />
                        </EditButton>
                        <EditButton onClick={deletAssetApi}>
                          <FiDelete />
                        </EditButton>
                      </H3Title>
                      {/* )} */}
                      <H3>총 금액: &nbsp;원</H3>
                    </AssetListBox>
                    {/* 
                    <H3Title style={{ marginTop: '10px' }}> 2 &nbsp;) </H3Title>
                    {AssetTitle[1] === undefined ? (
                      <H3Title>
                        명칭
                        <EditButton onClick={openEditTextModal}>
                          <FiEdit />
                        </EditButton>
                        <EditButton onClick={deletAssetApi}>
                          <FiDelete />
                        </EditButton>
                      </H3Title>
                    ) : (
                      <H3Title>
                        {AssetTitle[1]}
                        <EditButton onClick={openEditTextModal}>
                          <FiEdit />
                        </EditButton>
                        <EditButton onClick={deletAssetApi}>
                          <FiDelete />
                        </EditButton>
                      </H3Title>
                    )}
                    <H3>총 금액: &nbsp;원</H3>

                    <H3Title style={{ marginTop: '10px' }}> 3 &nbsp;) </H3Title>
                    {AssetTitle[2] === undefined ? (
                      <H3Title>
                        명칭
                        <EditButton onClick={openEditTextModal}>
                          <FiEdit />
                        </EditButton>
                        <EditButton onClick={deletAssetApi}>
                          <FiDelete />
                        </EditButton>
                      </H3Title>
                    ) : (
                      <H3Title>
                        {AssetTitle[2]}
                        <EditButton onClick={openEditTextModal}>
                          <FiEdit />
                        </EditButton>
                        <EditButton onClick={deletAssetApi}>
                          <FiDelete />
                        </EditButton>
                      </H3Title>
                    )}
                    <H3>총 금액: &nbsp;원</H3>

                    <H3Title style={{ marginTop: '10px' }}> 4 &nbsp;) </H3Title>
                    {AssetTitle[3] === undefined ? (
                      <H3Title>
                        명칭
                        <EditButton onClick={openEditTextModal}>
                          <FiEdit />
                        </EditButton>
                        <EditButton onClick={deletAssetApi}>
                          <FiDelete />
                        </EditButton>
                      </H3Title>
                    ) : (
                      <H3Title>
                        {AssetTitle[3]}
                        <EditButton onClick={openEditTextModal}>
                          <FiEdit />
                        </EditButton>
                        <EditButton onClick={deletAssetApi}>
                          <FiDelete />
                        </EditButton>
                      </H3Title>
                    )}
                    <H3>총 금액: &nbsp;원</H3>

                    <H3Title style={{ marginTop: '10px' }}> 5 &nbsp;) </H3Title>
                    {AssetTitle[4] === undefined ? (
                      <H3Title>
                        명칭
                        <EditButton onClick={openEditTextModal}>
                          <FiEdit />
                        </EditButton>
                        <EditButton onClick={deletAssetApi}>
                          <FiDelete />
                        </EditButton>
                      </H3Title>
                    ) : (
                      <H3Title>
                        {AssetTitle[4]}
                        <EditButton onClick={openEditTextModal}>
                          <FiEdit />
                        </EditButton>
                        <EditButton onClick={deletAssetApi}>
                          <FiDelete />
                        </EditButton>
                      </H3Title>
                    )}
                    <H3>총 금액: &nbsp;원</H3>

                    <H3Title style={{ marginTop: '10px' }}> 6 &nbsp;) </H3Title>
                    {AssetTitle[5] === undefined ? (
                      <H3Title>
                        명칭
                        <EditButton onClick={openEditTextModal}>
                          <FiEdit />
                        </EditButton>
                        <EditButton onClick={deletAssetApi}>
                          <FiDelete />
                        </EditButton>
                      </H3Title>
                    ) : (
                      <H3Title>
                        {AssetTitle[5]}
                        <EditButton onClick={openEditTextModal}>
                          <FiEdit />
                        </EditButton>
                        <EditButton onClick={deletAssetApi}>
                          <FiDelete />
                        </EditButton>
                      </H3Title>
                    )}
                    <H3>총 금액: &nbsp;원</H3> */}
                  </>
                ) : null}

                <H2>자산 금액 수정</H2>
                <Div>
                  <Input
                    onChange={TextonChange}
                    value={Text}
                    type="text"
                    placeholder="자산 명칭을 적어주세요. (ex. 다이아몬드)"
                  />
                </Div>
                {Text && Data ? (
                  <Fade>
                    <P>{`* 반영될 자산명칭: "${Text}"`}</P>
                  </Fade>
                ) : null}
                <Div>
                  <Input
                    onChange={CashonChange}
                    value={Cash}
                    type="text"
                    placeholder="숫자로만 금액을 적어주세요. (ex. 10000)"
                  />
                  <div>
                    <TitleCashBtn postAssetApi={postAssetApi}>
                      수정
                    </TitleCashBtn>
                  </div>
                </Div>
                {Cash && Data && Reviewtarget.length <= 21 ? (
                  <Fade>
                    <P
                      style={{ color: 'blue' }}
                    >{`✔ 반영될 금액 : "${Cashtarget}원"`}</P>
                    <P>{`✔ 수정 후 금액 : "${Reviewtarget}원"`}</P>
                    <P>{`✔ 수정 후 금액 자리수 : ${Reviewtarget.length}자리`}</P>
                    <P>{`✔ 숫자만 기입 + " , " 포함 21자리까지 금액수정이 가능합니다.`}</P>
                  </Fade>
                ) : Cash && Data && Reviewtarget.length >= 22 ? (
                  <Fade>
                    <P>{`✔ 수정 후 금액 자리수 : ${Reviewtarget.length}자리`}</P>
                    <P>{`✔ " , " 포함 21자리까지 금액수정이 가능합니다.`}</P>
                    <P
                      style={{ color: 'blue' }}
                    >{`✔   현재 수정금액 자리수가 22자리 이상입니다.`}</P>
                    <P
                      style={{ color: 'blue' }}
                    >{`✔  반영금액을 수정해주세요.`}</P>
                  </Fade>
                ) : null}
              </MainContain>
            </TopPage>
          </MainPage>
        </>
      ) : (
        <>
          <LongNavbarBox />
          <MiniNavbarBox />
          <LoadingDiv>
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </LoadingDiv>
        </>
      )}
    </>
  );
}

export default AssetChange;
