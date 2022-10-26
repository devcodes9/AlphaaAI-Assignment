import React, {useEffect, useState} from 'react'
import ReactEcharts from "echarts-for-react";
import Axios from 'axios'
import { IAlphaaChart } from './IAlphaaChart';

export const AlphaaChart = () => {
  const [saleData, setData] = useState([]);
  useEffect(() => {
    Axios.get('https://run.mocky.io/v3/e2ffac92-48e0-4826-a59f-bf76fc727383')
        .then((res) => {
          setData(res.data.data);
        });
  },[])
  
  var profit = saleData?.filter((ele) => {
    return ele.d__2022sale > ele.d__2021sale;
  });

  var loss = saleData?.filter((ele) => {
    return ele.d__2022sale < ele.d__2021sale;
  });

  var profDiff = profit?.map((ele) => {
    var prof = ele.d__2022sale - ele.d__2021sale;
    var sub = ele.subcategory;

    return {prof,sub};
  });

  var lossDiff = loss?.map((ele) => {
    var loss = ele.d__2022sale - ele.d__2021sale;
    var sub = ele.subcategory;
    return {loss, sub};
  });
  
  profDiff.sort((a,b) => {
    return b.prof - a.prof;
  })

  lossDiff.sort((a,b) => {
    return b.loss - a.loss;
  })

  var finalDiff = [...profDiff, ...lossDiff];
  var finalProf = finalDiff.map((ele) => {
    if(ele.prof){
      return Number(ele.prof.toFixed(2));
    }
    return "-";
  });

  var finalLoss = finalDiff.map((ele) => {
    if(ele.loss){
      return -Number(ele.loss.toFixed(2));
    }
    return "-";
  });
  
  var helpProf = [0];
  var sum = 0;
  for(let i = 0; i < finalDiff.length; i++){
    if(i === 0){
      helpProf.push(finalDiff[0].prof.toFixed(2));
      sum += Number(finalDiff[0].prof.toFixed(2));
    }
    else if(finalDiff[i].prof){
      sum += Number(finalDiff[i].prof.toFixed(2));
      helpProf.push(sum);
    }
  }

  var helpLoss = [];
  var lossData = finalLoss.filter((item) => item !== "-");
  for(let i = 0; i < lossData.length; i++){
    helpLoss.push(helpProf[helpProf.length - 1] - Number(lossData[i]));
  }

  var helper = [...helpProf.slice(0, helpProf.length - 1), ...helpLoss];
    console.log(helper);
    console.log(helpProf)
    var totalProf = 0;
    profDiff?.map((ele) => {
      totalProf += ele.prof;
    })

    var totalLoss = 0;
    lossDiff?.map((ele) => {
      totalLoss += ele.loss;
    })
    const totalDiff = totalProf + totalLoss;
    const summary = Array(helper.length).fill("-");

    let option = {
      title: {
          text: "Waterfall"
      },
      legend: {
          data: ["Loss", "Profit","Net"],
      },
      grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
      },
      xAxis: {
          type: "category",
          splitLine: { show: false },
          data: (function () {
              let list = [];
              for (let i = 0; i < finalDiff.length; i++) {
                  list.push(finalDiff[i]["sub"]);
              }
              list.push("total")
              return list;
          })()
      },
      yAxis: {
          type: "value"
      },
      series: [
          {
              name: "Placeholder",
              type: "bar",
              stack: "Total",
              itemStyle: {
                  borderColor: "transparent",
                  color: "transparent"
              },
              emphasis: {
                  itemStyle: {
                      borderColor: "transparent",
                      color: "transparent"
                  }
              },
              data: [...helper]
          },
          {
              name: "Profit",
              type: "bar",
              stack: "Total",
              label: {
                  show: true,
                  position: "top"
              },
              itemStyle: {
                  color: "#b7e8ac"
              },
              data: [...finalProf]
          },
          {
              name: "Loss",
              type: "bar",
              stack: "Total",
              label: {
                  show: true,
                  position: "bottom"
              },
              itemStyle: {
                  color: "#e8acb3"
              },
              data: [...finalLoss]
          },
          {
              name: "Net",
              type: "bar",
              stack: "all",
              label: {
                  show: true,
                  position: "top"
              },
              data: [...summary, Number(totalDiff.toFixed(2))],
              itemStyle: {
                  color: "#accfe8"
              }
          }
      ]
  };

  return (
    <div>
      <h1>Accumulated Waterfall Chart</h1>
      <ReactEcharts option={option}
            style={{ height: "90vh", maxWidth: "80rem" }} />
      <IAlphaaChart profDiff = {profDiff} lossDiff = {lossDiff} />
    </div>
  )
}

