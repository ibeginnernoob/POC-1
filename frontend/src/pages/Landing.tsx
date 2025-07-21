import { useState } from 'react';
import { motion } from 'framer-motion';
import FeatureCard from '@/components/snag/featureCard';
import LandingBackdrop from '@/components/snag/landingBackdrop';
import { useNavigate } from 'react-router-dom';
import useIsAuth from '@/hooks/useIsAuth';
import Navbar from '@/components/snag/navbar';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import LandingTypewriter from '@/components/snag/landingTypewriter';

const changingTexts = [
    'SnaGenie to analyze defect reports and recommend optimal solutions based on historical resolution data',
    'VisionCheck to detect faults and defects in aerospace components through advanced computer vision technology',
    'CockpitVoice to enable hands-free command recognition and voice-activated assistance for pilots during critical operations',
];

const Landing = () => {
    const navigation = useNavigate();
    const { isLoading, isAuth } = useIsAuth();
    const navigator = useNavigate();

    const handleFeatureClick = (featureId: string, url: string) => {
        if (isAuth) {
            navigator(url);
        } else {
            navigator('/login');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            {/* <Navbar isAuth={isAuth} /> */}
            <div className="h-screen">
                <AnimatedBanner />
                <LandingBackdrop>
                    <section className="container mx-auto">
                        <div className="text-center mb-16 flex flex-col justify-center items-center">
                            <h1 className="text-8xl font-black text-gray-900 mb-6 max-w-5xl">
                                Aircraft Management
                                <span className="bg-gradient-to-r from-yellow-400 font-extrabold to-orange-600 bg-clip-text text-transparent">
                                    {' '}
                                    AI System
                                </span>
                            </h1>
                            <div className="mt-10">
                                <p className="text-4xl/10 text-black font-bold font-polysans max-w-6xl mx-auto">
                                    Revolutionizing aviation maintenance with
                                    cutting-edge artificial intelligence using{' '}
                                    <LandingTypewriter
                                        texts={changingTexts}
                                        className="text-4xl/10 text-black font-light italic font-polysans"
                                    />
                                </p>
                            </div>
                            <div className="flex flex-row mt-28 gap-20">
                                <button className="px-6 py-3 text-2xl italic text-black font-polysans bg-white border-[2px] border-solid border-black rounded-full hover:bg-gray-200 duration-200">
                                    Read the Docs →
                                </button>
                                <button className="px-6 py-3 text-2xl italic text-black font-polysans bg-white border-[2px] border-solid border-black rounded-full hover:bg-gray-200 duration-200">
                                    Try it Live
                                </button>
                            </div>
                        </div>
                    </section>
                </LandingBackdrop>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-8">
                        <div className="text-center text-gray-600">
                            <p>
                                &copy; 2025 AircraftAI Management System.
                                Ensuring aviation safety through intelligent
                                technology.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export function AnimatedBanner() {
    return (
        <a href="">
            <motion.div
                className="w-full py-3 text-center text-white font-medium"
                animate={{
                    background: [
                        'linear-gradient(90deg, #ec4899, #8b5cf6)',
                        'linear-gradient(90deg, #3b82f6, #06b6d4)',
                        'linear-gradient(90deg, #10b981, #f59e0b)',
                        'linear-gradient(90deg, #ef4444, #ec4899)',
                        'linear-gradient(90deg, #ec4899, #8b5cf6)',
                    ],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear',
                }}
            >
                The AI Snag Rectifier is now live!{' '}
                <span className="font-bold">Start Here →</span>
            </motion.div>
        </a>
    );
}

export default Landing;
