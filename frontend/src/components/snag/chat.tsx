import { Bot, User, File } from 'lucide-react';
import Markdown from 'react-markdown';
import type { SnagDetails } from '@/types/snag';
import { TypewriterEffect } from '../adheils-cumponents/typewriter-effect';
import TypewriterAnimation from '../adheils-cumponents/typewriter-claude';

export default function Chat({
    isNew,
    snagDetails,
}: {
    isNew: boolean;
    snagDetails?: SnagDetails | null;
}) {
    return (
        <div className="bg-white w-[100%] h-[100%]">
            <div className="bg-white max-w-5xl mx-auto px-6 py-8 flex flex-col gap-10">
                {isNew ? (
                    <>
                        <Message details={null} />
                    </>
                ) : (
                    <>
                        <UserMessage
                            query={snagDetails?.query || ''}
                            filename={snagDetails?.filename || ''}
                        />
                        <Message details={snagDetails} />
                    </>
                )}
            </div>
        </div>
    );
}

const text = `Hello! I'm your AI Snag Report Analyzer. I can help you find the best rectification actions based on past resolutions. Simply describe your snag issue, select the relevant details from the dropdowns, and I'll analyze it using natural language processing to suggest appropriate solutions.`;

function Message({ details }: { details: SnagDetails | null | undefined }) {
    return (
        <>
            <div className="flex flex-row items-start gap-3">
                <div className="rounded-full p-2 bg-blue-600">
                    <Bot className="h-4 w-4 md:h-6 md:w-6" color="white" />
                </div>
                <div className="bg-blue-100 max-w-2xl px-8 py-4 rounded-2xl shadow-lg">
                    {!details ? (
                        <p className="text-sm font-medium md:text-base">
                            <TypewriterAnimation text={text} />
                        </p>
                    ) : (
                        <div className="flex flex-col gap-5">
                            <p className="text-sm font-medium md:text-base">
                                <Markdown>
                                    {details.rectification.ai_recommendation}
                                </Markdown>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function UserMessage({ query, filename }: { query: string; filename: string }) {
    return (
        <div className="flex flex-col items-end">
            <div className="max-w-2xl flex flex-row items-center justify-end text-end gap-3 mb-2">
                <File size={16} color="darkblue" />
                <p className="text-blue-800 text-sm font-roboto font-medium text-clamp-1">
                    {filename}
                </p>
            </div>
            <div className="flex flex-row justify-end items-start gap-3">
                <div className="flex flex-col flex-start px-4 rounded-2xl">
                    <div className="flex-1 w-full max-w-2xl">
                        <p className="text-sm font-medium md:text-base whitespace-pre-line">
                            {query}
                        </p>
                    </div>
                </div>
                <div className="rounded-full p-2 bg-black">
                    <User color="white" className="h-4 w-4 md:h-6 md:w-6" />
                </div>
            </div>
        </div>
    );
}
