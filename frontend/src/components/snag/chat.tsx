import { Bot, User } from 'lucide-react';
import { type GeneratedData } from '@/pages/snag';
import { type SnagQueryData } from '@/hooks/useFetch';
import type { SnagDetails } from '@/hooks/useFetch';
import Markdown from 'react-markdown';

export default function Chat({
    isNew,
    snagDetails,
}: {
    isNew: boolean;
    snagDetails: SnagDetails | null;
}) {
    return (
        <div className="bg-white w-[100%]">
            <div className="bg-white max-w-5xl mx-auto px-6 py-8 flex flex-col gap-10">
                {isNew && <Message details={null} />}
                {!isNew && snagDetails && (
                    <>
                        <UserMessage details={snagDetails.details} />
                        <Message details={snagDetails.generated} />
                    </>
                )}
            </div>
        </div>
    );
}

function Message({ details }: { details: GeneratedData | null }) {
    return (
        <div className="flex flex-row items-start gap-3">
            <div className="rounded-full p-2 bg-blue-600">
                <Bot size={14} color="white" />
            </div>
            <div className="bg-blue-100 max-w-2xl px-4 py-5 rounded-2xl">
                {!details ? (
                    <p className="text-sm font-medium">
                        Hello! I'm your AI Snag Report Analyzer. I can help you
                        find the best rectification actions based on past
                        resolutions. Simply describe your snag issue, select the
                        relevant details from the dropdowns, and I'll analyze it
                        using natural language processing to suggest appropriate
                        solutions.
                    </p>
                ) : (
                    <div className="flex flex-col gap-5">
                        <p className="text-sm font-medium">
                            <Markdown>
                                {details.rectification.ai_recommendation}
                            </Markdown>
                        </p>
                        <div>
                            {/* <p className="text-sm font-medium">
                                Recommendation Reliability:{' '}
                                {
                                    details.ana
                                        .recommendation_reliability
                                }
                            </p> */}
                            {/* <p className="text-sm font-medium">
                                Average Similarity Percentage:{' '}
                                {
                                    ?.summary
                                        .average_similarity_percentage
                                }
                            </p>
                            <p className="text-sm font-medium">
                                Total similar cases found:{' '}
                                {response?.summary.total_similar_cases_found}
                            </p> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function UserMessage({ details }: { details: SnagQueryData }) {
    return (
        <div className="flex flex-row justify-end items-start gap-1">
            <div className="max-w-2xl flex flex-col flex-start bg-green-200">
                <p className="text-sm font-medium">{details.query}</p>
            </div>
            <div className="rounded-full p-2 bg-black">
                <User size={14} color="white" />
            </div>
        </div>
    );
}
