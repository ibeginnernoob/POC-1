import { Bot, User } from 'lucide-react';
import Markdown from 'react-markdown';
import type { SnagDetails } from '@/types/snag';

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
                        <UserMessage query={snagDetails?.query || ''} />
                        <Message details={snagDetails} />
                    </>
                )}
            </div>
        </div>
    );
}

function Message({ details }: { details: SnagDetails | null | undefined }) {
    return (
        <div className="flex flex-row items-start gap-3">
            <div className="rounded-full p-2 bg-blue-600">
                <Bot className='h-4 w-4 md:h-6 md:w-6' color="white" />
            </div>
            <div className="bg-blue-100 max-w-2xl px-4 py-5 rounded-2xl">
                {!details ? (
                    <p className="text-sm font-medium md:text-base">
                        Hello! I'm your AI Snag Report Analyzer. I can help you
                        find the best rectification actions based on past
                        resolutions. Simply describe your snag issue, select the
                        relevant details from the dropdowns, and I'll analyze it
                        using natural language processing to suggest appropriate
                        solutions.
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
    );
}

function UserMessage({ query }: { query: string }) {
    return (
        <div className="flex flex-row justify-end items-start gap-1">
            <div className="max-w-2xl flex flex-col flex-start bg-green-200">
                <p className="text-sm font-medium md:text-base">{query}</p>
            </div>
            <div className="rounded-full p-2 bg-black">
                <User color="white" className='h-4 w-4 md:h-6 md:w-6' />
            </div>
        </div>
    );
}
