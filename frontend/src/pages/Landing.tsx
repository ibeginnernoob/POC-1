import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/lovable/card';
import { Badge } from '@/components/lovable/badge';
import { Button } from '@/components/lovable/button';

import { IconHome, IconInfoCircle, IconPhoneCall } from "@tabler/icons-react";
import {Header} from '@/components/ui/header';
import { useScroll, useTransform } from "motion/react";
import { GoogleGeminiEffect } from '@/components/lovable/google-gemini-effect';
import {
    Search,
    FileCheck,
    ArrowRight,
    Zap,
    Shield,
    TrendingUp,
    Package,
    BarChart3,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useIsAuth from '@/hooks/useIsAuth';
import AirplaneCanvas from '@/components/ui/AirplaneCanvas';
import { SidebarProvider, SidebarTrigger } from '@/components/lovable/sidebareal';
import { AppSidebar } from '@/components/ui/AppSidebar';
import React from 'react';

const Landing = () => {
    const navigation = useNavigate();
    const { isLoading, isAuth } = useIsAuth();
    const navigator = useNavigate();
    const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"],
    });
    const links = [
        { label: "Home", href: "#home", icon: <IconHome size={20} /> },
        { label: "About", href: "#about", icon: <IconInfoCircle size={20} /> },
        { label: "Contact", href: "#contact", icon: <IconPhoneCall size={20} /> },
      ];
    const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
    const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
    const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
    const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
    const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
  

    const features = [
        {
            id: 'new',
            title: 'Snag Rectification AI',
            description:
                'Intelligent analysis and resolution of aircraft maintenance issues with automated workflow management.',
            icon: FileCheck,
            color: 'from-blue-500 to-cyan-400',
            details:
                'AI-powered snag analysis, automated work order generation, and predictive maintenance scheduling.',
            status: 'Active',
            size: 'large', // Takes 2 columns
            accent: 'blue',
            url: '/new',
        },
        {
            id: 'defect-detection',
            title: 'Defect Detection System',
            description:
                'Computer vision and ML algorithms for automated detection of structural and mechanical defects.',
            icon: Search,
            color: 'from-emerald-500 to-teal-400',
            details:
                'Real-time visual inspection, thermal imaging analysis, and damage assessment reporting.',
            status: 'Inactive',
            size: 'medium',
            accent: 'emerald',
            url: '/',
        },
        {
            id: 'compliance-monitoring',
            title: 'Compliance Monitoring',
            description:
                'Automated regulatory compliance tracking and documentation management for aviation standards.',
            icon: Shield,
            color: 'from-purple-500 to-pink-400',
            details:
                'FAA/EASA compliance tracking, automated documentation, and audit trail management.',
            status: 'Coming Soon',
            size: 'medium',
            accent: 'purple',
            url: '/',
        },
        {
            id: 'predictive-maintenance',
            title: 'Predictive Maintenance',
            description:
                'Advanced analytics to predict component failures and optimize maintenance schedules.',
            icon: TrendingUp,
            color: 'from-orange-500 to-red-400',
            details:
                'Machine learning models for failure prediction, cost optimization, and downtime reduction.',
            status: 'Coming Soon',
            size: 'large', // Takes 2 columns
            accent: 'orange',
            url: '/',
        },
        {
            id: 'inventory-optimization',
            title: 'Inventory Optimization',
            description:
                'AI-driven spare parts management and supply chain optimization for aircraft components.',
            icon: Package,
            color: 'from-teal-500 to-green-400',
            details:
                'Smart inventory forecasting, automated reordering, and cost-effective parts sourcing.',
            status: 'Coming Soon',
            size: 'medium',
            accent: 'teal',
            url: '/',
        },
        {
            id: 'flight-data-analysis',
            title: 'Flight Data Analysis',
            description:
                'Comprehensive analysis of flight data recorder information for safety and performance insights.',
            icon: BarChart3,
            color: 'from-red-500 to-pink-400',
            details:
                'Real-time flight data processing, anomaly detection, and performance optimization recommendations.',
            status: 'Coming Soon',
            size: 'medium',
            accent: 'red',
            url: '/',
        },
    ];

    const handleFeatureClick = (featureId: string, url: string) => {
        if (isAuth) {
            navigator(url);
        } else {
            navigator('/login');
        }
    };

    return (
        <SidebarProvider>
        
        <AppSidebar/>
        <SidebarTrigger/>
        
          {/* Main content that fills remaining width */}
          <div className='w-screen'>

          <Header />
      
            <div
              className="h-[400vh] w-full dark:border rounded-md relative pt-40 overflow-clip"
              ref={ref}
            >
              <GoogleGeminiEffect
                pathLengths={[
                  pathLengthFirst,
                  pathLengthSecond,
                  pathLengthThird,
                  pathLengthFourth,
                  pathLengthFifth,
                ]}
              />
            </div>
      
            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm mt-20">
              <div className="container mx-auto px-6 py-8">
                <div className="text-center text-gray-600">
                  <p>
                    &copy; 2025 AircraftAI Management System. Ensuring aviation safety
                    through intelligent technology.
                  </p>
                </div>
              </div>
            </footer>
          </div>
          </SidebarProvider>
      );
      
};

export default Landing;
