import TableModal from "./TableModal";

interface SimilarSnag {
  rank: number;
  fields: Record<string, any>;
  metadata: Record<string, any>;
  similarity_score: number;
  similarity_percentage: number;
}

type SnagItem = {
    rank: number;
    fields: Record<string, any>;
    metadata: {
      row_index: number;
      source: string;
    };
    similarity_score: number;
    similarity_percentage: number;
  };
  
  type SimilarSnagsListProps = {
    data: SnagItem[];
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
export default function SimilarSnagsList({ data, open,setOpen }: SimilarSnagsListProps) {
    // Step 1: Extract all unique keys from 'fields'
    const fieldKeys = Array.from(
      new Set(data.flatMap(item => Object.keys(item.fields)))
    );
  
    // Step 2: Define base columns like Rank and Similarity Score
    const columns = [
      {
        key: "rank",
        label: "Rank",
      },
      ...fieldKeys.map((key) => ({
        key: `field_${key}`,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        render: (_: any, row: SnagItem) => row.fields[key] ?? "-",
      })),
      {
        key: "similarity_score",
        label: "Similarity Score",
        render: (_: any, row: SnagItem) => row.similarity_score.toFixed(4),
      },
      {
        key: "similarity_percentage",
        label: "Similarity %",
        render: (_: any, row: SnagItem) => `${row.similarity_percentage.toFixed(2)}%`,
      },
    ];
  return (
    <TableModal
      title="Similar Historical Snags"
      data={data}
      columns={columns}
      triggerText="View Similar Snags"
      maxHeight="500px"
      open = {open}
      setOpen={setOpen}
    />
  );
}