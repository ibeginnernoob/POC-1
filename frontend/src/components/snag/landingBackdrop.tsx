import { useState } from 'react';
import { Box, HoverCard, Link, Portal, Strong } from '@chakra-ui/react';
import { ChevronDown } from 'lucide-react';
import { InteractiveHoverButton } from '../magicui/interactive-hover-button';
import FeatureCard from './featureCard';

export default function LandingBackdrop({
    children,
}: {
    children?: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className={`relative w-full flex-1 overflow-hidden`}>
            {/* Base gradient background */}
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    background: `linear-gradient(135deg, 
								#f0f4f8 0%,
								#e8f5f3 15%,
								#d4f1f4 30%,
								#b8e6d3 45%,
								#a7dbd8 55%,
								#f4c2a1 70%,
								#f5b7b1 85%,
								#f8cecc 100%
							)`,
                }}
            />

            {/* Floating gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Orb 1 - Top left, mint green */}
                <div
                    className="absolute rounded-full opacity-70 animate-pulse"
                    style={{
                        width: '400px',
                        height: '400px',
                        background:
                            'radial-gradient(circle, rgba(168, 219, 216, 0.8) 0%, rgba(168, 219, 216, 0.3) 70%)',
                        filter: 'blur(60px)',
                        top: '-100px',
                        left: '-100px',
                        animation: 'float1 20s ease-in-out infinite',
                    }}
                />

                {/* Orb 2 - Top right, peachy pink */}
                <div
                    className="absolute rounded-full opacity-70"
                    style={{
                        width: '350px',
                        height: '350px',
                        background:
                            'radial-gradient(circle, rgba(245, 183, 177, 0.9) 0%, rgba(245, 183, 177, 0.2) 70%)',
                        filter: 'blur(60px)',
                        top: '20%',
                        right: '-50px',
                        animation: 'float2 25s ease-in-out infinite',
                    }}
                />

                {/* Orb 3 - Bottom center, light blue */}
                <div
                    className="absolute rounded-full opacity-70"
                    style={{
                        width: '300px',
                        height: '300px',
                        background:
                            'radial-gradient(circle, rgba(212, 241, 244, 0.8) 0%, rgba(212, 241, 244, 0.2) 70%)',
                        filter: 'blur(60px)',
                        bottom: '-50px',
                        left: '30%',
                        animation: 'float3 30s ease-in-out infinite',
                    }}
                />

                {/* Orb 4 - Mid left, warm orange */}
                <div
                    className="absolute rounded-full opacity-60"
                    style={{
                        width: '250px',
                        height: '250px',
                        background:
                            'radial-gradient(circle, rgba(244, 194, 161, 0.7) 0%, rgba(244, 194, 161, 0.1) 70%)',
                        filter: 'blur(60px)',
                        top: '60%',
                        left: '10%',
                        animation: 'float4 22s ease-in-out infinite',
                    }}
                />
            </div>

            {/* Additional mesh gradient overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
							radial-gradient(ellipse at 20% 80%, rgba(168, 219, 216, 0.3) 0%, transparent 50%),
							radial-gradient(ellipse at 80% 20%, rgba(245, 183, 177, 0.3) 0%, transparent 50%),
							radial-gradient(ellipse at 40% 40%, rgba(212, 241, 244, 0.2) 0%, transparent 50%),
							radial-gradient(ellipse at 60% 70%, rgba(248, 206, 204, 0.2) 0%, transparent 50%)
							`,
                }}
            />

            <div className="bg-transparent sticky top-4 left-0 right-0 py-0 opacity-100 z-10">
                <div className="bg-white mx-auto px-5 py-1 rounded-lg max-w-4xl flex flex-row items-center justify-between backdrop-blur-sm">
                    <div className="flex flex-row items-center ">
                        <img
                            src={'../../public/imgs/hal-logo.png'}
                            className="h-11 w-auto"
                            alt="HAL Logo"
                        />
                        <img
                            src={'../../public/imgs/iiit-logo.png'}
                            className="h-[52px] w-auto"
                            alt="IIIT Logo"
                        />
                    </div>
                    <div className="flex flex-row items-center gap-6">
                        <button className="text-gray-600 px-3 py-1.5 font-polysans font-medium text-lg flex flex-row items-center gap-1.5 rounded-xl hover:text-black hover:bg-gray-100 duration-300">
                            Home
                        </button>
                        <HoverCard.Root
                            size="lg"
                            open={open}
                            onOpenChange={(e) => setOpen(e.open)}
                        >
                            <HoverCard.Trigger asChild>
                                <button className="text-gray-600 px-3 py-1.5 font-polysans font-medium text-lg flex flex-row items-center gap-1.5 rounded-xl hover:text-black hover:bg-gray-100 duration-300">
                                    Features
                                    <ChevronDown size={14} />
                                </button>
                            </HoverCard.Trigger>
                            <Portal>
                                <HoverCard.Positioner className="mt-3">
                                    <HoverCard.Content
                                        maxWidth="1000px"
                                        className="flex-1 w-full"
                                    >
                                        <FeatureCard />
                                    </HoverCard.Content>
                                </HoverCard.Positioner>
                            </Portal>
                        </HoverCard.Root>
                        <button className="text-gray-600 px-3 py-1.5 font-polysans font-medium text-lg flex flex-row items-center gap-1.5 rounded-xl hover:text-black hover:bg-gray-100 duration-300">
                            Docs
                        </button>
                    </div>
                    <InteractiveHoverButton className="border-[0.5px] border-solid border-gray-300 hover:border-none">
                        Sign In
                    </InteractiveHoverButton>
                </div>
            </div>

            {/* Content layer */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
                {children || (
                    <div className="text-center max-w-4xl">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-8">
                            The editor suite to build products with{' '}
                            <span className="font-serif italic">
                                version control efficiency
                            </span>
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button className="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors">
                                Read the docs →
                            </button>
                            <button className="px-8 py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-gray-900 rounded-full font-semibold hover:bg-white/30 transition-colors">
                                Try it live
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* CSS animations */}
            <style jsx>{`
                @keyframes float1 {
                    0%,
                    100% {
                        transform: translate(0, 0) rotate(0deg);
                    }
                    33% {
                        transform: translate(30px, -30px) rotate(120deg);
                    }
                    66% {
                        transform: translate(-20px, 20px) rotate(240deg);
                    }
                }

                @keyframes float2 {
                    0%,
                    100% {
                        transform: translate(0, 0) rotate(0deg);
                    }
                    33% {
                        transform: translate(-40px, 30px) rotate(-120deg);
                    }
                    66% {
                        transform: translate(20px, -40px) rotate(-240deg);
                    }
                }

                @keyframes float3 {
                    0%,
                    100% {
                        transform: translate(0, 0) rotate(0deg);
                    }
                    50% {
                        transform: translate(40px, -20px) rotate(180deg);
                    }
                }

                @keyframes float4 {
                    0%,
                    100% {
                        transform: translate(0, 0) rotate(0deg);
                    }
                    25% {
                        transform: translate(20px, -30px) rotate(90deg);
                    }
                    50% {
                        transform: translate(-30px, -10px) rotate(180deg);
                    }
                    75% {
                        transform: translate(-10px, 25px) rotate(270deg);
                    }
                }
            `}</style>
        </div>
    );
}
