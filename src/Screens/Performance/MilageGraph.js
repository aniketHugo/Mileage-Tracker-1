import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { VictoryChart, VictoryLine, VictoryScatter, VictoryAxis } from 'victory-native';
import { useRealm } from "@realm/react";
import FetchRefuelData from "../../API/FetchRefuelData";
import UseUserStore from "../../ZustandStore/ZuStore";

const MileageGraph = (props) => {

    const mystore = UseUserStore();

 

    // Group data by months and calculate average mileage for each month
    const groupedData = mystore.refuelData.reduce((acc, data) => {  
        const refuelDate = new Date(data.refuelDate);
        const monthKey = refuelDate.getMonth();

        if (!acc[monthKey]) {
            acc[monthKey] = { month: monthKey + 1, totalDistance: 0, totalFuel: 0, averageMileage: 0 };
        }

        // Assuming 'startReading' and 'endReading' represent odometer readings
        const distance = data.endReading - data.startReading;
        acc[monthKey].totalDistance += distance;
        acc[monthKey].totalFuel += data.consumed;



        // console.log("acc = ",acc)
        return acc;
    }, {});

    // Calculate average mileage for each month
    Object.values(groupedData).forEach((monthData) => {
        monthData.averageMileage = monthData.totalDistance / monthData.totalFuel;
    });

    const chartData = Object.values(groupedData);
    console.log("chartData = ",chartData)

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
                        }}
                    />
                    <VictoryLine
                        style={{ data: { stroke: '#EB655F' } }}
                        data={chartData}
                        x="month"
                        y="averageMileage"
                        interpolation="natural"
                    />
                    <VictoryScatter
                        style={{ data: { fill: '#EB655F' } }}
                        size={5}
                        data={chartData}
                        x="month"
                        y="averageMileage"
                    />
                </VictoryChart>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    graphView: {
        marginVertical: 10,
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 10,
        width: '90%',

    }
});

export default MileageGraph;
