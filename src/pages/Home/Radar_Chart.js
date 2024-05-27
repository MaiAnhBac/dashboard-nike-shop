import React from 'react'
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
const radarchart = [
    {
        subject: 'Packed',
        A: 120,
        B: 110,
        fullMark: 150,
    },
    {
        subject: 'Dispatched',
        A: 98,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'Reach Station',
        A: 86,
        B: 130,
        fullMark: 150,
    },
    {
        subject: 'Out for delivery',
        A: 99,
        B: 100,
        fullMark: 150,
    },
    {
        subject: 'Delivered',
        A: 85,
        B: 90,
        fullMark: 150,
    },
    {
        subject: 'Earlier',
        A: 65,
        B: 85,
        fullMark: 150,
    },
];
export default function Radar_Chart() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarchart}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
        </ResponsiveContainer>
    )
}
