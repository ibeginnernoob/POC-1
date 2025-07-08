import React from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer as RadarResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { RadarStatsChart} from '../components/analytics/radarStatsChart';
import BarStatsChart from '../components/analytics/barStatsChart';
import {PieStatsChart} from '../components/analytics/pieStatsChart';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/lovable/button';


    const Analytics = () => {
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [analyticsData, setAnalyticsData] = React.useState<any>();
      //   const data = {
      //   "timestamp": "2025-07-02T19:29:43.963529",
      //   "query": "Query: TR Vibrations\nHelicopter Type: string\nFlight Hours: string\nEvent Type: string\nStatus: string\nRaised By: string",
      //   "status": "success",
      //   "based_on_historical_cases": 5,
      //   "analytics": {
      //     "total_similar_cases_found": 5,
      //     "average_similarity_percentage": 91.32,
      //     "highest_similarity_percentage": 91.71,
      //     "lowest_similarity_percentage": 90.58,
      //     "recommendation_reliability": "high"
      //   },
      //   "RadarChart": [
      //     {
      //       "category": "Complexity",
      //       "value": 3
      //     },
      //     {
      //       "category": "TimeNeeded",
      //       "value": 3
      //     },
      //     {
      //       "category": "ToolsRequired",
      //       "value": 2
      //     },
      //     {
      //       "category": "RiskLevel",
      //       "value": 2
      //     },
      //     {
      //       "category": "Frequency",
      //       "value": 4
      //     }
      //   ],
      //   "PieChart": [
      //     {
      //       "category": "TR Vibration Data Analysis",
      //       "value": 80
      //     },
      //     {
      //       "category": "Tail Rotor High",
      //       "value": 10
      //     },
      //     {
      //       "category": "MR and TR Vibration Data",
      //       "value": 10
      //     },
      //     {
      //       "category": "Other",
      //       "value": 10
      //     }
      //   ],
      //   "BarChart1": [
      //     {
      //       "category": "PLT",
      //       "value": 2
      //     },
      //     {
      //       "category": "GR",
      //       "value": 1
      //     },
      //     {
      //       "category": "Ground Observation",
      //       "value": 3
      //     }
      //   ],
      //   "BarChart2": [
      //     {
      //       "category": "IA",
      //       "value": 18
      //     },
      //     {
      //       "category": "J",
      //       "value": 5
      //     },
      //     {
      //       "category": "ZD",
      //       "value": 4
      //     },
      //     {
      //       "category": "IN",
      //       "value": 3
      //     },
      //     {
      //       "category": "CG",
      //       "value": 5
      //     }
      //   ]
      // }

      const fetchDetails = async () => {
        try {
          setIsLoading(true);
          const token = localStorage.getItem('token');
            
          const verify = await axios.post('http://192.168.2.53:7000/verify',
            {
              query: "",
              helicopter_type: "",
              flight_hours: "",
              event_type: "",
              status: "",
              raised_by: ""
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
              }
            }
          );
          console.log(verify.data)
          if (verify.data.result == "Yes"){
            const res = await axios.post('http://192.168.2.53:7000/analytics',
                {
                  query: "TR Vibrations",
                  helicopter_type: "",
                  flight_hours: "",
                  event_type: "",
                  status: "",
                  raised_by: ""
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                  }
                }
              );
          
              interface Response {
                msg: string;
              }
          
              const resBody = res.data as Response;
              setAnalyticsData(resBody);
              console.log(resBody);
          
              if (res.status !== 200) {
                throw new Error(resBody.msg);
          }
          else {
            return;
          }
          }
        } catch (e: any) {
          // setAnalyticsData(data);
          console.error('Error:', e);
      
          if (e.response) {
            console.error('Response error:', e.response.data);
            console.error('Status:', e.response.status);
          } else if (e.request) {
            console.error('Request made, but no response:', e.request);
          } else {
            console.error('Error:', e.message);
          }
        } finally {
          setIsLoading(false);
        }
      };
      
        // Rest of your component remains the same...
        type ReliabilityLevel = 'low' | 'medium' | 'high';
        
        const reliabilityLevel: Record<ReliabilityLevel, number> = {
            low: 1,
            medium: 2,
            high: 3
        };
        return (
            <>
            {!analyticsData && (
                <Button
                    onClick={async () => {
                        await fetchDetails();
                    }}
                    className="p-3 rounded-md bg-black text-white flex justify-center items-center"
                >
                    Fetch Analytics
                </Button>
            )}
    
            {isLoading && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="text-white text-lg">Loading...</div>
                </div>
            )}
            
            {analyticsData && (
                <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                            Analytics Dashboard
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
                            <RadarStatsChart data={analyticsData.RadarChart} />
                        </div>
    
                        <div className="transform hover:scale-105 transition-all duration-300">
                            <h2 className="text-2xl font-bold text-white mb-4 text-center">
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    Snag Category Distribution
                                </span>
                            </h2>
                            <PieStatsChart data={analyticsData.PieChart} />
                        </div>
                    </div>
    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="transform hover:scale-105 transition-all duration-300">
                            <h2 className="text-xl font-bold text-white mb-4 text-center">
                                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    Observation Types
                                </span>
                            </h2>
                            <BarStatsChart data={analyticsData.BarChart1} color='#10b981' height={250} gradient={true} />
                        </div>
    
                        <div className="transform hover:scale-105 transition-all duration-300">
                            <h2 className="text-xl font-bold text-white mb-4 text-center">
                                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    Aircraft Types
                                </span>
                            </h2>
                            <BarStatsChart data={analyticsData.BarChart2} color="#059669" height={250} gradient={true} />
                        </div>
    
                        <div className="transform hover:scale-105 transition-all duration-300">
                            <h2 className="text-xl font-bold text-white mb-4 text-center">
                                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                                    Total Similar Cases
                                </span>
                            </h2>
                            {analyticsData?.analytics &&
                                <BarStatsChart
                                    data={[{ category: 'Cases', value: analyticsData.analytics.total_similar_cases_found }]}
                                    color="#f97316"
                                    height={200}
                                    gradient={true}
                                />
                                }
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
                                    { category: "Avg %", value: analyticsData.analytics.average_similarity_percentage },
                                    { category: "High %", value: analyticsData.analytics.highest_similarity_percentage },
                                    { category: "Low %", value: analyticsData.analytics.lowest_similarity_percentage }
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
                                        {analyticsData.analytics.recommendation_reliability.toUpperCase()}
                                    </div>
                                    <div className="text-2xl text-green-700 font-semibold">
                                        Reliability Level
                                    </div>
                                    <div className="mt-4">
                                        <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-500"
                                                style={{ 
                                                    width: `${(reliabilityLevel[analyticsData.analytics.recommendation_reliability] / 3) * 100}%` 
                                                }}
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
                                        {analyticsData.analytics.total_similar_cases_found}
                                    </div>
                                    <div className="text-gray-300">Total Cases</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-purple-400">
                                        {analyticsData.analytics.average_similarity_percentage}%
                                    </div>
                                    <div className="text-gray-300">Avg Similarity</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-green-400">
                                        {analyticsData.analytics.recommendation_reliability.toUpperCase()}
                                    </div>
                                    <div className="text-gray-300">Reliability</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </>
        );
    };
    
    export default Analytics;