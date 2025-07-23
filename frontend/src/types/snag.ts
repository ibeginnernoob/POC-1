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
  isAnalysisFetch: boolean;
  based_on_historical_cases: string;
  analytics: {
    total_similar_cases_found: string;
    average_similarity_percentage: string;
    highest_similarity_percentage: string;
    lowest_similarity_percentage: string;
    recommendation_reliability: string;
  };
  graphs: any;
  created_at: Date;
};
