import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory-native';
import UseUserStore from "../../ZustandStore/ZuStore";

const MoneyGraph = () => {
    const mystore = UseUserStore();
    const today = new Date(); // Current date
    const fiveMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 4, today.getDate()); // Date 5 months ago
    const groupedData = mystore.refuelData.reduce((acc, data) => {
        const refuelDate = new Date(data.refuelDate);
    
        if (refuelDate >= fiveMonthsAgo && refuelDate < new Date()) {
            const monthDiff = (today.getMonth() - refuelDate.getMonth() + 60) % 12; // Calculate the month difference and ensure it's positive
            const monthKey = monthDiff === 0 ? 0 : monthDiff; // If monthDiff is 0, set monthKey to 12
    
            if (!acc[6 - (monthKey+1)]) {
                acc[6 - (monthKey+1)] = { month: 6 - (monthKey+1), totalMoney: 0 };
            }

            acc[6 - (monthKey+1)].totalMoney += data.price;
        }
    
        return acc;
    }, {});
    
    const chartData = Object.values(groupedData);
    // console.log("Chart = ",chartData)

    if(mystore.refuelData.length == 0){
        return (
            <></>
        )
    }

    return (
        <View style={styles.graphView1}>
            {/* <ScrollView horizontal> */}
            <VictoryChart padding={{ top: 30, right: 50, bottom: 50, left: 80 }}
                domainPadding={20} width= {370} >
                    <VictoryAxis
                        style={{
                            tickLabels: {fontSize: 15, padding: 20 },
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
                        style={{
                            grid: { stroke: '#CED8DE' },
                        }} />
                    <VictoryBar
                        data={chartData}
                        x="month"
                        y="totalMoney"
                        barWidth={20}
                        style={{ data: { fill: '#EB655F' } }}
                    />
                </VictoryChart>
            {/* </ScrollView> */}
        </View>
    );
};

// Function to get the name of the month based on its index
const getMonthName = (monthIndex) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthNames[(monthIndex + 12) % 12];
}

const styles = StyleSheet.create({
    graphView1: {
        // marginVertical: 10,
        // marginHorizontal : 20,
        backgroundColor : 'white',
        elevation: 5,
        borderRadius: 10,
        // backgroundColor: '#F0F2F2',

        // width: '90%',
        // padding : 20,
    }
});

export default MoneyGraph;
