import { Shield, ScanEye, Speech } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FeatureCard() {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-row px-10 py-6 gap-40">
            <div className="bg-white flex flex-col gap-6 max-w-xl">
                <div className="flex flex-col gap-1">
                    <h3 className="font-polysans text-lg text-gray-600 font-[400]">
                        Content AI Features
                    </h3>
                    <a
                        onClick={() => navigate('/snag/new')}
                        className="flex flex-row gap-3 max-w-md px-3 py-2 rounded-xl hover:cursor-pointer hover:bg-gray-100"
                    >
                        <div className="pt-1.5">
                            <Shield
                                size={22}
                                strokeWidth={3}
                                className="font-light"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-row items-center gap-3">
                                <p className="font-polysans font-bold text-lg/5 p-0 m-0">
                                    AI Snag Analyzer
                                </p>
                                <div className="border-[0.5px] border-solid border-black rounded-full px-2 py-0.5">
                                    <p className="font-polysans text-xs">
                                        Live
                                    </p>
                                </div>
                            </div>
                            <p className="text-base/5 text-gray-600 font-light font-polysans p-0 m-0">
                                AI-powered defect resolution recommendation
                                system
                            </p>
                        </div>
                    </a>
                </div>

                <div className="flex flex-col gap-1">
                    <h3 className="font-polysans text-lg text-gray-600 hover:cursor-pointer font-[400]">
                        OpenCV Features
                    </h3>
                    <a href='/opencv' className="flex flex-row items-start gap-3 max-w-md px-3 py-2 rounded-xl hover:bg-gray-100">
                        <div className="pt-1.5">
                            <ScanEye
                                size={22}
                                strokeWidth={3}
                                className="font-light"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className=" flex flex-row items-center gap-3">
                                <p className="font-polysans font-bold text-lg/5 p-0 m-0">
                                    CV for Fault Detection in Components
                                </p>
                                <div className="border-[0.5px] border-solid border-black rounded-full px-2 py-0.5">
                                    <p className="font-polysans text-xs">
                                        Beta
                                    </p>
                                </div>
                            </div>
                            <p className="text-base/5 text-gray-600 font-light font-polysans p-0 m-0">
                                AI-powered computer vision system for fault
                                detection
                            </p>
                        </div>
                    </a>
                </div>

                <div className="flex flex-col gap-1">
                    <h3 className="font-polysans text-lg text-gray-600 hover:cursor-pointer font-[400]">
                        AI Speech Features
                    </h3>
                    <a
                        href={`${import.meta.env.VITE_SPEECH_POC_URL}`}
                        className="flex flex-row items-start gap-3 max-w-md px-3 py-2 rounded-xl hover:bg-gray-100"
                    >
                        <div className="pt-1.5">
                            <Speech
                                size={22}
                                strokeWidth={3}
                                className="font-light"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className=" flex flex-row items-center gap-3">
                                <p className="font-polysans font-bold text-lg/5 p-0 m-0">
                                    Speech Recognition for Cockpit Commands
                                </p>
                                <div className="border-[0.5px] border-solid border-black rounded-full px-2 py-0.5">
                                    <p className="font-polysans text-xs">
                                        Beta
                                    </p>
                                </div>
                            </div>
                            <p className="text-base/5 text-gray-600 font-light font-polysans p-0 m-0">
                                Voice-activated cockpit command recognition
                                system
                            </p>
                        </div>
                    </a>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                <div
                    style={{
                        backgroundImage:
                            'url(../../../public/imgs/feature_card_1.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                    className="px-6 py-5 w-[20rem] h-[9rem] rounded-lg shadow-lg"
                >
                    <div className="flex flex-col justify-between h-full">
                        <h2 className="text-2xl font-bold text-white font-polysans">
                            SnaGenie
                        </h2>
                        <button
                            onClick={() => navigate('/snag/new')}
                            className="w-fit px-4 py-2 bg-white rounded-lg font-medium text-black font-roboto text-base hover:rounded-xl hover:bg-gray-100 duration-300 shadow-lg"
                        >
                            Go to Docs →
                        </button>
                    </div>
                </div>
                <div
                    style={{
                        backgroundImage:
                            'url(../../../public/imgs/feature_card_2.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                    className="px-6 py-5 w-[20rem] h-[9rem] rounded-lg shadow-lg"
                >
                    <div className="flex flex-col justify-between h-full">
                        <h2 className="text-2xl font-bold text-white font-polysans">
                            VisionCheck
                        </h2>
                        <button className="w-fit px-4 py-2 bg-white rounded-lg font-medium text-black font-roboto text-base hover:rounded-xl hover:bg-gray-100 duration-300 shadow-lg">
                            Go to Docs →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
