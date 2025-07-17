import Loader from '@/components//ui/loader';
import { RadarStatsChart } from '@/components/snag/analytics/radarStatsChart';
import BarStatsChart from '@/components/snag/analytics/barStatsChart';
import { PieStatsChart } from '@/components/snag/analytics/pieStatsChart';
import { useState } from 'react';
// import axios from 'axios';

const AnalyticsModal = ({ isLoading }: { isLoading: boolean }) => {
    const data = {
        timestamp: '2025-07-02T19:29:43.963529',
        query: 'Query: TR Vibrations\nHelicopter Type: string\nFlight Hours: string\nEvent Type: string\nStatus: string\nRaised By: string',
        status: 'success',
        based_on_historical_cases: 5,
        analytics: {
            total_similar_cases_found: 5,
            average_similarity_percentage: 91.32,
            highest_similarity_percentage: 91.71,
            lowest_similarity_percentage: 90.58,
            recommendation_reliability: 'high',
        },
        RadarChart: [
            {
                category: 'Complexity',
                value: 3,
            },
            {
                category: 'TimeNeeded',
                value: 3,
            },
            {
                category: 'ToolsRequired',
                value: 2,
            },
            {
                category: 'RiskLevel',
                value: 2,
            },
            {
                category: 'Frequency',
                value: 4,
            },
        ],
        PieChart: [
            {
                category: 'TR Vibration Data Analysis',
                value: 80,
            },
            {
                category: 'Tail Rotor High',
                value: 10,
            },
            {
                category: 'MR and TR Vibration Data',
                value: 10,
            },
            {
                category: 'Other',
                value: 10,
            },
        ],
        BarChart1: [
            {
                category: 'PLT',
                value: 2,
            },
            {
                category: 'GR',
                value: 1,
            },
            {
                category: 'Ground Observation',
                value: 3,
            },
        ],
        BarChart2: [
            {
                category: 'IA',
                value: 18,
            },
            {
                category: 'J',
                value: 5,
            },
            {
                category: 'ZD',
                value: 4,
            },
            {
                category: 'IN',
                value: 3,
            },
            {
                category: 'CG',
                value: 5,
            },
        ],
    };

    // Rest of your component remains the same...
    type ReliabilityLevel = 'low' | 'medium' | 'high';

    const reliabilityLevel: Record<ReliabilityLevel, number> = {
        low: 1,
        medium: 2,
        high: 3,
    };
    return (
        <div className="overflow-y-auto h-[100vh]">
            {isLoading && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="text-white text-lg">
                        <Loader />
                    </div>
                </div>
            )}

            {data && (
                <div className="min-h-screen bg-white p-6">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                            Snag Analysis
                        </h1>
                        <p className="text-gray-300 text-lg">Query Overview</p>
                        <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <div className="transform hover:scale-105 transition-all duration-300">
                            <h2 className="text-2xl font-bold text-white mb-4 text-center">
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    Radar Stats
                                </span>
                            </h2>
                            <RadarStatsChart data={data.RadarChart} />
                        </div>

                        <div className="transform hover:scale-105 transition-all duration-300">
                            <h2 className="text-2xl font-bold text-white mb-4 text-center">
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    Snag Category Distribution
                                </span>
                            </h2>
                            <PieStatsChart data={data.PieChart} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="transform hover:scale-105 transition-all duration-300">
                            <h2 className="text-xl font-bold text-white mb-4 text-center">
                                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    Observation Types
                                </span>
                            </h2>
                            <BarStatsChart
                                data={data.BarChart1}
                                color="#10b981"
                                height={250}
                                gradient={true}
                            />
                        </div>

                        <div className="transform hover:scale-105 transition-all duration-300">
                            <h2 className="text-xl font-bold text-white mb-4 text-center">
                                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    Aircraft Types
                                </span>
                            </h2>
                            <BarStatsChart
                                data={data.BarChart2}
                                color="#059669"
                                height={250}
                                gradient={true}
                            />
                        </div>

                        <div className="transform hover:scale-105 transition-all duration-300">
                            <h2 className="text-xl font-bold text-white mb-4 text-center">
                                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                    Total Similar Cases
                                </span>
                            </h2>
                            <BarStatsChart
                                data={[
                                    {
                                        category: 'Cases',
                                        value: data.analytics
                                            .total_similar_cases_found,
                                    },
                                ]}
                                color="#f97316"
                                height={200}
                                gradient={true}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="transform hover:scale-105 transition-all duration-300">
                            <h2 className="text-xl font-bold text-white mb-4 text-center">
                                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    Similarity Percentages
                                </span>
                            </h2>
                            <BarStatsChart
                                data={[
                                    {
                                        category: 'Avg %',
                                        value: data.analytics
                                            .average_similarity_percentage,
                                    },
                                    {
                                        category: 'High %',
                                        value: data.analytics
                                            .highest_similarity_percentage,
                                    },
                                    {
                                        category: 'Low %',
                                        value: data.analytics
                                            .lowest_similarity_percentage,
                                    },
                                ]}
                                color="#6366f1"
                                height={280}
                                gradient={true}
                            />
                        </div>

                        <div className="transform hover:scale-105 transition-all duration-300">
                            <h2 className="text-xl font-bold text-white mb-4 text-center">
                                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                    Recommendation Reliability
                                </span>
                            </h2>
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 shadow-lg border border-green-200 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl font-bold text-green-600 mb-2">
                                        {data.analytics.recommendation_reliability.toUpperCase()}
                                    </div>
                                    <div className="text-2xl text-green-700 font-semibold">
                                        Reliability Level
                                    </div>
                                    <div className="mt-4">
                                        <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                                                // style={{
                                                //     width: `${
                                                //         (reliabilityLevel[
                                                //             data.analytics
                                                //                 .recommendation_reliability
                                                //         ] /
                                                //             3) *
                                                //         100
                                                //     }%`,
                                                // }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 shadow-lg border border-slate-600">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <div className="text-3xl font-bold text-cyan-400">
                                        {
                                            data.analytics
                                                .total_similar_cases_found
                                        }
                                    </div>
                                    <div className="text-gray-300">
                                        Total Cases
                                    </div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-purple-400">
                                        {
                                            data.analytics
                                                .average_similarity_percentage
                                        }
                                        %
                                    </div>
                                    <div className="text-gray-300">
                                        Avg Similarity
                                    </div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-green-400">
                                        {data.analytics.recommendation_reliability.toUpperCase()}
                                    </div>
                                    <div className="text-gray-300">
                                        Reliability
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnalyticsModal;
