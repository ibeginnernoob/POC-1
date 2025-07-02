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
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/lovable/avatar';
import { useNavigate } from 'react-router-dom';
import { Search, FileCheck, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import useIsAuth from '@/hooks/useIsAuth';

const Landing = () => {
    const navigation = useNavigate();
    const { isLoading, isAuth } = useIsAuth();

    const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

    const features = [
        {
            id: 'new',
            title: 'Snag Rectification AI',
            description:
                'Intelligent analysis and resolution of aircraft maintenance issues with automated workflow management.',
            icon: FileCheck,
            color: 'bg-gradient-to-br from-blue-500 to-blue-600',
            details:
                'AI-powered snag analysis, automated work order generation, and predictive maintenance scheduling.',
            status: 'Active',
        },
        {
            id: 'defect-detection',
            title: 'Defect Detection System',
            description:
                'Computer vision and ML algorithms for automated detection of structural and mechanical defects.',
            icon: Search,
            color: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
            details:
                'Real-time visual inspection, thermal imaging analysis, and damage assessment reporting.',
            status: 'Inactive',
        },
        {
            id: 'compliance-monitoring',
            title: 'Compliance Monitoring',
            description:
                'Automated regulatory compliance tracking and documentation management for aviation standards.',
            icon: FileCheck,
            color: 'bg-gradient-to-br from-purple-500 to-purple-600',
            details:
                'FAA/EASA compliance tracking, automated documentation, and audit trail management.',
            status: 'Coming Soon',
        },
        {
            id: 'predictive-maintenance',
            title: 'Predictive Maintenance',
            description:
                'Advanced analytics to predict component failures and optimize maintenance schedules.',
            icon: Search,
            color: 'bg-gradient-to-br from-orange-500 to-orange-600',
            details:
                'Machine learning models for failure prediction, cost optimization, and downtime reduction.',
            status: 'Coming Soon',
        },
        {
            id: 'inventory-optimization',
            title: 'Inventory Optimization',
            description:
                'AI-driven spare parts management and supply chain optimization for aircraft components.',
            icon: FileCheck,
            color: 'bg-gradient-to-br from-teal-500 to-teal-600',
            details:
                'Smart inventory forecasting, automated reordering, and cost-effective parts sourcing.',
            status: 'Coming Soon',
        },
        {
            id: 'flight-data-analysis',
            title: 'Flight Data Analysis',
            description:
                'Comprehensive analysis of flight data recorder information for safety and performance insights.',
            icon: Search,
            color: 'bg-gradient-to-br from-red-500 to-red-600',
            details:
                'Real-time flight data processing, anomaly detection, and performance optimization recommendations.',
            status: 'Coming Soon',
        },
    ];

    const handleFeatureClick = (featureId: string) => {
        if (isAuth) {
            navigation(featureId);
        } else {
            navigation('/login');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                <div className="container mx-auto  py-0">
                    <div className="flex items-center justify-between px-10">
                        <NavLink
                            to={'/'}
                            className="flex items-center space-x-3"
                        >
                            <img
                                src="/imgs/f5e2075d-1858-4f73-a6fc-b4fe773e4fed.png"
                                alt="HAL Logo"
                                className="h-24 w-auto justify-center"
                            />
                        </NavLink>
                        <div className="flex items-center space-x-4">
                            {/* <Badge
                                variant="outline"
                                className="text-green-600 border-green-500"
                            >
                                System Online
                            </Badge> */}
                            {isAuth && (
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="" alt="User" />
                                        <AvatarFallback className="bg-blue-100 text-blue-600">
                                            <User className="w-5 h-5" />
                                        </AvatarFallback>
                                    </Avatar>
                                    {/* <span className="text-sm font-medium text-gray-900">
                                        John Doe
                                    </span> */}
                                </div>
                            )}
                            {!isAuth && (
                                <div className="flex items-center space-x-3">
                                    <Button
                                        className="button-signup text-xs text-blue-600 border border-solid border-blue-300 rounded-lg"
                                        variant="outline"
                                        onClick={() => {
                                            navigation('/login');
                                        }}
                                    >
                                        Login
                                    </Button>
                                </div>
                            )}
                            {!isAuth && (
                                <div className="flex items-center space-x-3">
                                    <Button
                                        className="button-signup text-xs text-blue-600 border border-solid border-blue-300 rounded-lg"
                                        variant="outline"
                                        onClick={() => {
                                            navigation('/signup');
                                        }}
                                    >
                                        Signup
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-6 pt-12">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Aircraft Management
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {' '}
                            AI System
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Revolutionizing aviation maintenance with cutting-edge
                        artificial intelligence. From defect detection to
                        predictive analytics, our comprehensive suite ensures
                        optimal aircraft performance and safety.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                            AI-Powered
                        </Badge>
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                            Real-time Analytics
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                            Predictive Intelligence
                        </Badge>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => {
                        const IconComponent = feature.icon;
                        return (
                            <Card
                                key={feature.id}
                                className={`group cursor-pointer transition-all duration-300 border-gray-200 bg-white hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 ${
                                    hoveredFeature === feature.id
                                        ? 'ring-2 ring-blue-500/30'
                                        : ''
                                }`}
                                onMouseEnter={() =>
                                    setHoveredFeature(feature.id)
                                }
                                onMouseLeave={() => setHoveredFeature(null)}
                                onClick={() => handleFeatureClick(feature.id)}
                            >
                                <CardHeader className="pb-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <div
                                            className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>
                                        <Badge
                                            variant={
                                                feature.status === 'Active'
                                                    ? 'default'
                                                    : feature.status === 'Beta'
                                                    ? 'secondary'
                                                    : 'outline'
                                            }
                                            className={
                                                feature.status === 'Active'
                                                    ? 'bg-green-100 text-green-700 border-green-200'
                                                    : feature.status === 'Beta'
                                                    ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                                    : 'bg-gray-100 text-gray-600 border-gray-200'
                                            }
                                        >
                                            {feature.status}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {feature.title}
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        {feature.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {feature.details}
                                    </p>
                                    <Button
                                        className="w-full bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white border-0"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFeatureClick(feature.id);
                                        }}
                                    >
                                        Explore Feature
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm mt-20">
                <div className="container mx-auto px-6 py-8">
                    <div className="text-center text-gray-600">
                        <p>
                            &copy; 2024 AircraftAI Management System. Ensuring
                            aviation safety through intelligent technology.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
