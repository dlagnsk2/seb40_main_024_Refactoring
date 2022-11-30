import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AssetBdata } from '../../Component/Asset/Asset_B_Data';
import AssetSetting from '../../Component/Asset/AssetSetting';
import {
  LongNavbarBox,
  MiniNavbarBox,
} from '../../Component/Common/NavebarRev';
import AssetList from '../../Component/Asset/AssetList';
import axios from 'axios';

const GuideBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  height: 250px;
  width: 550px;
  /* align-items: center; */
  /* color: #9ed5c5; */
  text-align: left;
  border-top: 5px solid #8ec3b0;
  border-bottom: 5px solid #8ec3b0;
  margin-top: 80px;
  margin-left: 300px;
  margin-bottom: 50px;
  color: grey;
  .TextHeader {
    text-align: center;
    color: #9ed5c5;
    width: 550px;
  }
  .Text {
    font-size: 17px;
  }
  .Hilight {
    color: #8ec3b0;
  }
`;

const PageContain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* display: inline-block; */
  align-items: center;
  /* position: relative; */
  box-sizing: border-box;
  .Contain {
    display: flex;
    flex-direction: column;
    /* margin-top: 30px;*/
    margin-left: 500px;
  }
`;

const ChartContain = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 750px;
  height: 400px;
  position: fixed !important;
  margin-top: -350px;
  margin-left: -800px;
  /* top: 300px !important; */
`;
const ChartBox = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 750px;
  height: 350px;
  /* margin-left: 120px; */
  /* top: 300px !important; */
`;

const BoxContain = styled.div`
  display: flex;
  flex-direction: column;
  display: inline-block;
  align-items: center;
  box-sizing: border-box;
  width: 650px;
  height: 1000px;
  top: 30px !important;
  left: 300px;
  margin-left: 100px;
`;

const GraphH1 = styled.h1`
  box-sizing: border-box;
  height: 100px;
  width: 100%;
  align-items: center;
  /* color: #9ed5c5; */
  text-align: center;
  text-shadow: 1px 1px 2px #bcead5;
  color: #bcead5;
  font-size: 40px;
`;

const AssetTargetPage = () => {
  const tokenAxios = () => {
    const loginData = {
      email: 'hoju5@gmail.com',
      password: 'password5',
    };

    axios.post(`${url}/member/login`, loginData).then((res) => {
      const { accessToken } = res.headers.authorization;
      // token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      console.log(res.headers.authorization);
    });
  };
  const url = process.env.REACT_APP_API_URL;
  const [goal, setGoal] = useState(''); // 명칭
  const [extended, setExtended] = useState(''); // 목표금액
  const [period, setPeriod] = useState(''); // 기간
  const [target, setTarget] = useState('');
  const [render, setRender] = useState(0);
  const [goalName, setGoalName] = useState(''); //목표명
  const [goalPrice, setGoalPrice] = useState(''); //목표금액
  const [targetLength, setTargetLength] = useState(''); //목표기간
  const [up, setUp] = useState(0); //저축횟수
  const [countList, setCountList] = useState([]);

  let monthly = Math.floor(extended / period);
  if (isNaN(monthly)) {
    monthly = 0;
  } else if (monthly === Infinity) {
    monthly = 0;
  }

  const targetAmount = monthly
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  let percentage = Math.floor((monthly / extended) * 100);
  if (isNaN(percentage)) {
    percentage = 0;
  }

  const handlerGoal = (e) => {
    setGoal(e.target.value);
  };
  const handlerExtended = (e) => {
    setExtended(e.target.value);
  };
  const handlerPeriod = (e) => {
    setPeriod(e.target.value);
  };
  const handlerTarget = (e) => {
    setTarget(e.target.value);
  };
  const goalNameonChange = (e) => {
    setGoalName(e.target.value);
  };

  const goalPriceonChange = (e) => {
    setGoalPrice(e.target.value);
  };

  const targetLengthonChange = (e) => {
    setTargetLength(e.target.value);
  };

  useEffect(() => {
    const goalGet = async () => {
      try {
        const res = await axios.get(`${url}/1/goal`);
        setCountList(res.data._embedded.responseList);
        setUp(res.data._embedded.responseList.completed);
        setUp(res.data._embedded.responseList.incompleted);
        console.log('get', res);
        console.log('responseList', res.data._embedded.responseList);
      } catch (err) {
        console.log('error', err);
      }
    };
    goalGet();
    tokenAxios();
  }, [render]);

  const goalPost = async () => {
    const data = {
      goalName: goal,
      goalPrice: extended,
      targetLength: period,
      calculatedPrice: targetAmount,
    };
    try {
      const res = await axios.post(`${url}/1/goal`, data);

      setGoal('');
      setExtended('');
      setPeriod('');
      setTarget('');
      setRender((el) => el + 1);
      console.log(countList);
      console.log('post', res);
      console.log(res.data.goalId);
      if (countList.length < 6) return;
      alert('최대 6개의 목표를 설정할 수 있습니다');
    } catch (err) {
      console.log('error', err);
    }
  };
  const goalDelete = async (e) => {
    try {
      const res = await axios.delete(`${url}/1/goal/${e.target.dataset.id}`);
      setRender((el) => el + 1);
      console.log('dataset.id', e.target.dataset.id);
      console.log('삭제', res);
    } catch (err) {
      console.log('deleteerror', err);
    }
  };

  const goalPatch = async (e) => {
    const patchdata = {
      goalName: goalName,
      goalPrice: goalPrice,
      targetLength: targetLength,
    };
    try {
      const res = await axios.patch(
        `${url}/1/goal/${e.target.dataset.id}`,
        patchdata
      );
      setRender((el) => el + 1);

      console.log('patch', res);
      console.log('patchId', e.target.dataset.id);
    } catch (err) {
      console.log('patcherror', err);
    }
  };

  const goalUpPatch = async (e) => {
    try {
      const res = await axios.patch(
        `${url}/1/goal/${e.target.dataset.id}/complete`
      );
      setUp(res.data.completed);
      console.log(res.data.completed);
    } catch (err) {
      console.log('up', err);
    }
  };

  const goalDownPatch = async (e) => {
    try {
      const res = await axios.patch(
        `${url}/1/goal/${e.target.dataset.id}/incomplete`
      );
      setUp(res.data.completed);
    } catch (err) {
      console.log('up', err);
    }
  };

  // useEffect(() => {
  //   goalGet();
  //   goalPost();
  //   goalDelete();
  //   tokenAxios();
  // }, [setGoal, setExtended, setPeriod]);
  // [setGoal, setExtended, setPeriod]
  return (
    <>
      <LongNavbarBox />
      <MiniNavbarBox />
      <>
        <GuideBox>
          <h2 className="TextHeader">목표 작성을 위한 안내</h2>
          <br />
          <p className="Text">
            첫째, <span className="Hilight">&apos;나의 목표&apos;</span>에
            목표를 작성해주세요.
          </p>
          <br />
          <p className="Text">
            둘째, <span className="Hilight">START</span> 버튼을 클릭하면
            목표리스트가 생성됩니다.
          </p>
          <br />
          <p className="Text">
            셋째, 목표리스트의 <span className="Hilight">SAVING</span> 버튼을
            클릭하여 납입 기간을 표시할 수 있습니다.
          </p>
          <br />
          <p className="Text">*그래프를 통해 목표 달성률을 확인해보세요!*</p>
        </GuideBox>
        <PageContain>
          <ChartContain className="ScrollActive">
            <GraphH1>목표 현황</GraphH1>
            <ChartBox>
              <AssetBdata
                goal={goal}
                monthly={monthly}
                extended={extended}
                period={period}
                countList={countList}
              />
            </ChartBox>
          </ChartContain>

          <div className="Contain">
            <BoxContain>
              <AssetSetting
                goalPost={goalPost}
                countList={countList}
                handlerGoal={handlerGoal}
                handlerExtended={handlerExtended}
                handlerPeriod={handlerPeriod}
                handlerTarget={handlerTarget}
                goal={goal}
                extended={extended}
                period={period}
                target={target}
                targetAmount={targetAmount}
              />
              {countList.map((count, id) => (
                <AssetList
                  count={count}
                  key={id}
                  id={count.goalId}
                  goal={goal}
                  extended={extended}
                  period={period}
                  setGoal={setGoal}
                  setExtended={setExtended}
                  setPeriod={setPeriod}
                  target={target}
                  goalDelete={goalDelete}
                  targetAmount={targetAmount}
                  goalPatch={goalPatch}
                  goalNameonChange={goalNameonChange}
                  goalPriceonChange={goalPriceonChange}
                  targetLengthonChange={targetLengthonChange}
                  goalUpPatch={goalUpPatch}
                  up={up}
                  goalDownPatch={goalDownPatch}
                ></AssetList>
              ))}
            </BoxContain>
          </div>
        </PageContain>
      </>
    </>
  );
};

export default AssetTargetPage;
