import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis } from 'victory-native';
import { useRealm } from "@realm/react";
import FetchRefuelData from "../../API/FetchRefuelData";
import UseUserStore from "../../ZustandStore/ZuStore";

const MileageGraph = (props) => {

    const mystore = UseUserStore();

    const today = new Date(); // Current date
    const fiveMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 4, today.getDate()); // Date 5 months ago
    const groupedData = mystore.refuelData.reduce((acc, data) => {
        const refuelDate = new Date(data.refuelDate);

        if (refuelDate >= fiveMonthsAgo && refuelDate < new Date()) {
            const monthDiff = (today.getMonth() - refuelDate.getMonth() + 60) % 12; // Calculate the month difference and ensure it's positive
            const monthKey = monthDiff === 0 ? 0 : monthDiff; // If monthDiff is 0, set monthKey to 12

            if (!acc[6 - (monthKey + 1)]) {
                acc[6 - (monthKey + 1)] = { month: 6 - (monthKey + 1), totalDistance: 0, totalFuel: 0, averageMileage: 0 };
            }

                const distance = data.endReading - data.startReading;
                acc[6 - (monthKey + 1)].totalDistance += distance;
                acc[6 - (monthKey + 1)].totalFuel += data.consumed;
        }

        return acc;
    }, {});


    const fillMissingMonths = (data) => {
        const filledData = [];
        const monthsPresent = data.map(item => item.month);
        for (let month = 0; month <= 5; month++) {
          if (monthsPresent.includes(month)) {
            filledData.push(data.find(item => item.month === month));
          } else {
            if(month == 0)
            filledData.push({
              averageMileage: 0,
              month,
              totalDistance: 0,
              totalFuel: 0
            });
          }
        }
        return filledData;
      };

    // Calculate average mileage for each month
    Object.values(groupedData).forEach((monthData) => {
        monthData.averageMileage = monthData.totalDistance / monthData.totalFuel;
    });

    const chartArrayData = Object.values(groupedData);
    const chartData = fillMissingMonths(chartArrayData);
    // console.log("chartArrayData = ", chartArrayData)
    // console.log("chartData = ", chartData)



    return (
        <View style={styles.graphView2}>

            <VictoryChart padding={{ top: 20, right: 50, bottom: 50, left: 50 }}
                domainPadding={20} width= {370} >
                <VictoryAxis
                        style={{
                            tickLabels: {fontSize: 15, padding: 20 },
                            axis: { stroke: "transparent" },
                        }}
                        tickValues={[0,1,2,3,4,5]}
                        tickFormat={(tick) => {
                            const monthNames = [
                                '',
                                getMonthName(today.getMonth() - 4), 
                                getMonthName(today.getMonth() -3), 
                                getMonthName(today.getMonth() -2), 
                                getMonthName(today.getMonth() -1), 
                                getMonthName(today.getMonth()), 
                            ];
                            return monthNames[tick];
                        }}
                    />
                    <VictoryAxis dependentAxis
                    
                    domain={{ "averageMileage": [0, 'max'] }}
                        style={{
                            grid: { stroke: '#CED8DE' },
                            axis: { stroke: "transparent" },
                        }}
                    />
                    <VictoryLine
                        style={{ data: { stroke: '#EB655F' } }}
                        data={chartData}
                        x="month"
                        y="averageMileage"
                        interpolation="cardinal"
                    />
                    <VictoryScatter
                        style={{ data: { fill: '#EB655F' } }}
                        size={5}
                        data={chartData}
                        x="month"
                        y="averageMileage"
                    />
                </VictoryChart>
        </View>
    );
};

const styles = StyleSheet.create({
    graphView2: {
        // marginHorizontal : 20,
        backgroundColor : 'white',
        elevation: 5,
        borderRadius: 10,
    }
});
const getMonthName = (monthIndex) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[(monthIndex + 12) % 12];
}


export default MileageGraph;
