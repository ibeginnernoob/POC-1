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
import {
    Search,
    FileCheck,
    User,
    ArrowRight,
    Zap,
    Shield,
    TrendingUp,
    Package,
    BarChart3,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import useIsAuth from '@/hooks/useIsAuth';

const Landing = () => {
    const navigation = useNavigate();
    const { isLoading, isAuth } = useIsAuth();
    const navigator = useNavigate();
    const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Header */}
            <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto py-0">
                    <div className="flex items-center justify-between px-5 md:px-10">
                        <div className="flex py-6 items-center space-x-2 md:space-x-4">
                            <img
                                src={'../../public/imgs/hal-logo.png'}
                                className="h-10 w-auto"
                                alt=""
                            />
                            <img src={'../../public/imgs/iiit-logo.png'} className="h-14" alt="" />
                        </div>
                        <div className="flex items-center space-x-4">
                            {isAuth && (
                                <div className="flex items-center space-x-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="" alt="User" />
                                        <AvatarFallback className="bg-blue-100 text-blue-600">
                                            <User className="w-5 h-5" />
                                        </AvatarFallback>
                                    </Avatar>                                    
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
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 md:text-6xl">
                        Aircraft Management
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {' '}
                            AI System
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 md:text-xl">
                        Revolutionizing aviation maintenance with cutting-edge
                        artificial intelligence. From defect detection to
                        predictive analytics, our comprehensive suite ensures
                        optimal aircraft performance and safety.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-4 py-2">
                            <Zap className="w-4 h-4 mr-2" />
                            AI-Powered
                        </Badge>
                        <Badge className="bg-green-100 text-green-700 border-green-200 px-4 py-2">
                            Real-time Analytics
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-700 border-purple-200 px-4 py-2">
                            Predictive Intelligence
                        </Badge>
                    </div>
                </div>

                {/* Unique Masonry-Style Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        const isLarge = feature.size === 'large';
                        const isActive = feature.status === 'Active';

                        return (
                            <Card
                                key={feature.id}
                                className={`group cursor-pointer transition-all duration-500 border-0 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 relative overflow-hidden
                  ${isLarge ? 'md:col-span-2' : 'col-span-1'}
                  ${index === 0 ? 'lg:row-span-2' : ''}
                  ${index === 3 ? 'lg:row-span-2' : ''}
                  ${hoveredFeature === feature.id ? 'scale-105 z-10' : ''}
                `}
                                onMouseEnter={() =>
                                    setHoveredFeature(feature.id)
                                }
                                onMouseLeave={() => setHoveredFeature(null)}
                                onClick={() =>
                                    handleFeatureClick(feature.id, feature.url)
                                }
                            >
                                {/* Animated Background */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                                />

                                {/* Geometric Accent */}
                                <div
                                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-10 transform rotate-45 translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700`}
                                />

                                <CardHeader className="pb-4 relative z-10">
                                    <div className="flex items-start justify-between mb-4">
                                        <div
                                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg`}
                                        >
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Badge
                                                variant={
                                                    isActive
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                className={`
                          ${
                              isActive
                                  ? 'bg-green-500 text-white border-green-500'
                                  : ''
                          }
                          ${
                              feature.status === 'Coming Soon'
                                  ? 'bg-amber-100 text-amber-700 border-amber-200'
                                  : ''
                          }
                          ${
                              feature.status === 'Inactive'
                                  ? 'bg-gray-100 text-gray-600 border-gray-200'
                                  : ''
                          }
                          transition-all duration-300 group-hover:scale-110
                        `}
                                            >
                                                {feature.status}
                                            </Badge>
                                            {isActive && (
                                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                            )}
                                        </div>
                                    </div>

                                    <CardTitle
                                        className={`text-xl font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:${feature.color} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}
                                    >
                                        {feature.title}
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="relative z-10">
                                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                        {feature.details}
                                    </p>

                                    {/* Interactive Button */}
                                    <Button
                                        className={`w-full bg-gradient-to-r ${feature.color} hover:shadow-lg text-white font-medium py-3 rounded-xl transition-all duration-300 group transform hover:scale-105 relative overflow-hidden`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFeatureClick(
                                                feature.id,
                                                feature.url
                                            );
                                        }}
                                    >
                                        <span className="flex items-center justify-center">
                                            Explore Feature
                                            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                                        </span>

                                        {/* Button shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
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
                            &copy; 2025 AircraftAI Management System. Ensuring
                            aviation safety through intelligent technology.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
