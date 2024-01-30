import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory-native';
import { useRealm } from "@realm/react";
import FetchRefuelData from "../../API/FetchRefuelData";
import UseUserStore from "../../ZustandStore/ZuStore";
const MoneyGraph = (props) => {
    const [refuelData, setRefuelData] = useState([]);
    const { selectedUserId, selectedVehicleImage, refuelSelectedVehicleId } = UseUserStore();
    const realm = useRealm()
    useEffect(()=>{
        if(props.refuelData){
          setRefuelData(props.refuelData)
        }
      },[props])
    // Group data by months and calculate total money spent for each month
    const groupedData = refuelData.reduce((acc, data) => {
        const refuelDate = new Date(data.refuelDate);
        const monthKey = refuelDate.getMonth();

        if (!acc[monthKey]) {
            acc[monthKey] = { month: monthKey + 1, totalMoney: 0 };
        }

        acc[monthKey].totalMoney += data.price;
        return acc;
    }, {});

    // console.log("ref = ",refuelData)
    const chartData = Object.values(groupedData);
    if(refuelData.length == 0){
        return (
            <></>
        )
    }
    return (
        <View style={styles.graphView}>

        <ScrollView horizontal >

            <VictoryChart>
                <VictoryAxis
                    style={{
                        axisLabel: { padding: 50 },
                        tickLabels: { angle: -45, fontSize: 12, padding: 20 },
                    }}

                    tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
                    tickFormat={(tick) => {
                        const monthNames = [
                            '', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
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
        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    graphView: {
        marginVertical: 10,
        backgroundColor : 'white',
        elevation: 5,
        borderRadius: 10,
        width: '90%',
      }
});

export default MoneyGraph;
