import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Radar } from 'recharts';
const barchart = [
    {
        name: 'Jan',
        uv: 50,
        pv: 100,
        amt: 2400,
    },
    {
        name: 'Feb',
        uv: 51,
        pv: 88,
        amt: 2210,
    },
    {
        name: 'Mar',
        uv: 50,
        pv: 70,
        amt: 2290,
    },
    {
        name: 'Apr',
        uv: 50,
        pv: 8,
        amt: 2000,
    },
    {
        name: 'May',
        uv: 43,
        pv: 40,
        amt: 2181,
    },
    {
        name: 'Jun',
        uv: 20,
        pv: 60,
        amt: 2500,
    },
    {
        name: 'Jul',
        uv: 45,
        pv: 43,
        amt: 2100,
    },
    {
        name: 'Aug',
        uv: 30,
        pv: 51,
        amt: 2100,
    },
    {
        name: 'Sep',
        uv: 10,
        pv: 41,
        amt: 2100,
    },
    {
        name: 'Oct',
        uv: 21,
        pv: 47,
        amt: 2100,
    },
    {
        name: 'Nov',
        uv: 25,
        pv: 49,
        amt: 2100,
    },
    {
        name: 'Dec',
        uv: 34,
        pv: 50,
        amt: 2100,
    },
];
export default function Bar_Chart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={400}
                data={barchart}
                margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend iconType='circle' iconSize={10} verticalAlign="top" align='right' />
                <Bar dataKey="pv" fill="#475be8" activeBar={false} isAnimationActive={false} barSize={24} radius={[4, 4, 4, 4]} />
                <Bar dataKey="uv" fill="#e3e7fc" activeBar={false} isAnimationActive={false} barSize={24} radius={[4, 4, 4, 4]} />
            </BarChart>
        </ResponsiveContainer>
    )
}
