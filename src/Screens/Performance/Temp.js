import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis } from 'victory-native';
import { useRealm } from "@realm/react";
import FetchRefuelData from "../../API/FetchRefuelData";
import UseUserStore from "../../ZustandStore/ZuStore";

const Temp = (props) => {

    const mystore = UseUserStore();

    var totMielage = Array(12).fill(0);
    var odo = Array(12).fill(0);
    const fuels=mystore.refuelData;
    fuels.forEach((fuel)=>{
      totMielage[(new Date(fuel.refuelDate)).getMonth()]+=((fuel.consumed/(fuel.endReading+1-fuel.startReading)));
      odo[(new Date(fuel.refuelDate)).getMonth()]+=1;
    })
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December",
    ];
    const formattedData = months.map((month, index) => {
        return {'month': month, 'y':odo[index]===0?0:totMielage[index]/odo[index]};
    });


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

            // acc[6 - (monthKey + 1)].totalMoney += data.price;
            const distance = data.endReading - data.startReading;
            acc[6 - (monthKey + 1)].totalDistance += distance;
            acc[6 - (monthKey + 1)].totalFuel += data.consumed;
        }

        return acc;
    }, {});


    // Calculate average mileage for each month
    Object.values(groupedData).forEach((monthData) => {
        monthData.averageMileage = monthData.totalDistance / monthData.totalFuel;
    });

    const chartData = Object.values(groupedData);
    console.log("chartData = ", chartData)



    return (
        <View style={styles.graphView2}>

            <VictoryChart width={380} domainPadding={60} >
                <VictoryAxis
                    tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                    tickFormat={months}
                    style={{
                        axis: { stroke: "#CED8DE" },
                        tickLabels: {fontSize: 15 }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    style={{
                        axis: { stroke: "transparent" },
                        grid: { stroke: '#CED8DE' },
                        tickLabels: {fontSize: 15 }
                    }}
                />
                <VictoryScatter data={formattedData}
                    style={{
                        data: { fill: '#EB655F' },
                    }}
                />
                <VictoryLine
                    data={formattedData}
                    style={{
                        data: { stroke: '#EB655F' },
                    }}
                    interpolation="cardinal"
                />
            </VictoryChart>
        </View>
    );
};

const styles = StyleSheet.create({
    graphView2: {
        // marginHorizontal : 20,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
    }
});
const getMonthName = (monthIndex) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[(monthIndex + 12) % 12];
}


export default Temp;
