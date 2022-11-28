import { useState } from 'react';
import styled from 'styled-components';
import { AssetBdata } from '../../Component/Asset/Asset_B_Data';
import AssetSetting from '../../Component/Asset/AssetSetting';
import { PlusBtn } from '../../Component/Common/Button';
import {
  LongNavbarBox,
  MiniNavbarBox,
} from '../../Component/Common/NavebarRev';

const PageContain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* display: inline-block; */

  align-items: center;
  /* position: relative; */
  box-sizing: border-box;
  /* width: 100%;
  height: 100%; */
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
  width: 700px;
  height: 400px;
  position: fixed !important;
  margin-top: -50px;
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
  height: 50px;
  width: 700px;
  align-items: center;
  /* color: #9ed5c5; */
  text-align: center;
  margin-top: 10px;
  text-shadow: 1px 1px 2px #bcead5;
  color: #bcead5;
`;

// const PlusButton = styled.button`
//   width: 200px;
//   height: 60px;
//   margin-left: 680px;
// `;

const AssetTargetPage = () => {
  const [goal, setGoal] = useState('현금'); // 명칭
  const [extended, setExtended] = useState(''); // 목표금액
  const [period, setPeriod] = useState(''); // 기간
  const [savings, setSavings] = useState(''); // 저축횟수
  // eslint-disable-next-line no-unused-vars
  // const [texttarget, setTexttarget] = useState(''); // 횟수별 저축액
  const [countList, setCountList] = useState([
    { goal: '자동차', extended: '목표금액', period: '기간' },
  ]);
  // console.log('countList', countList.length);
  const HandlerAdd = () => {
    // let countArr = [...countList];
    // let counter = countArr.slice(-1)[0];
    // counter += 1;
    // countArr.push(counter.length);
    // index 사용 X
    // countArr[counter] = counter	// index 사용 시 윗줄 대신 사용
    // console.log('countArr', countArr);
    // setCountList(countArr);
    setCountList([
      ...countList,
      { goal: goal, extended: extended, period: period },
    ]);
  };
  const HandlerRemove = (id) => {
    setCountList(countList.filter((user) => user.id !== id));
    console.log('handler', countList);
  };

  let monthly = Math.floor(extended / period);
  if (isNaN(monthly)) {
    monthly = 0;
  } else if (monthly === Infinity) {
    monthly = 0;
  }

  const target = monthly
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  let percentage = Math.floor((monthly / extended) * 100);
  if (isNaN(percentage)) {
    percentage = 0;
  }
  // setTexttarget(target);
  // console.log(`percentage: ${percentage}`);
  // console.log(`goal: ${goal}`);
  // console.log(`extended: ${extended}`);
  // console.log(`period: ${period}`);
  // console.log(`savings: ${savings}`);
  const HandlerAddCount = () => {
    let countArr = countArr + 1;
    setSavings(countArr);
    setPeriod('');
  };

  return (
    <>
      <LongNavbarBox />
      <MiniNavbarBox />
      <PageContain>
        <ChartContain className="ScrollActive">
          <ChartBox>
            <AssetBdata
              goal={goal}
              monthly={monthly}
              extended={extended}
              period={period}
            />
          </ChartBox>
          <GraphH1>목표 현황</GraphH1>
        </ChartContain>

        <div className="Contain">
          {countList.length === 6 ? (
            <>
              <PlusBtn disabled />
            </>
          ) : (
            <>
              <PlusBtn HandlerAdd={HandlerAdd} />
            </>
          )}

          <BoxContain>
            {countList.map((count, id) => (
              <AssetSetting
                count={count}
                key={id}
                HandlerRemove={HandlerRemove}
                HandlerAddCount={HandlerAddCount}
                setGoal={setGoal}
                setExtended={setExtended}
                setPeriod={setPeriod}
                target={target}
                savings={savings}
                // period={period}
              />
            ))}
          </BoxContain>
        </div>
      </PageContain>
    </>
  );
};

export default AssetTargetPage;

// return (
//   <>
//     <LongLoginNavbarBox />
//     {/* <MiniNavbarBox /> */}
//     <PageContain>
//       <ChartContain className="ScrollActive">
//         <ChartBox>
//           <AssetBdata
//             goal={goal}
//             monthly={monthly}
//             extended={extended}
//             period={period}
//           />
//         </ChartBox>
//         <GraphH1>목표 현황</GraphH1>
//       </ChartContain>

//       <div className="Contain">
//         {countList.length === 6 ? (
//           <>
//             <PlusBtn disabled />
//           </>
//         ) : (
//           <>
//             <PlusBtn HandlerAdd={HandlerAdd} />
//           </>
//         )}

//         <BoxContain>
//           {countList.map((count, id) => (
//             <AssetSetting
//               count={count}
//               key={id}
//               HandlerRemove={HandlerRemove}
//               HandlerAddCount={HandlerAddCount}
//               setGoal={setGoal}
//               setExtended={setExtended}
//               setPeriod={setPeriod}
//               target={target}
//               savings={savings}
//               // period={period}
//             />
//           ))}
//         </BoxContain>
//       </div>
//     </PageContain>
//   </>
// );
// };

// export default AssetTargetPage;
