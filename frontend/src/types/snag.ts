export type SnagDetails = {
    _id: string;
    userId: string;
	pb_number: string;
	filename: string;
    timestamp: string;
    query: string;
    rectification: {
        ai_recommendation: string;
        based_on_historical_cases: string;
    };
    similar_historical_snags: any[];
};
