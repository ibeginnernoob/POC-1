import TableModal from './TableModal';

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

export default function SimilarSnagsList({
    data,
    open,
    setOpen,
}: SimilarSnagsListProps) {
    // Step 1: Extract all unique keys from 'fields'
    const fieldKeys = Array.from(
        new Set(data.flatMap((item) => Object.keys(item.fields)))
    );

    const columns = [
        {
            key: 'rank',
            label: 'Rank',
            render: (_: any, row: SnagItem) => row.rank,
        },
        {
            key: 'row number',
            label: 'Row Number',
            render: (_: any, row: SnagItem) => row.metadata.row_index,
        },
        ...fieldKeys.map((key) => ({
            key: `field_${key}`,
            label: key.charAt(0).toUpperCase() + key.slice(1),
            render: (_: any, row: SnagItem) => row.fields[key] ?? '-',
        }))
    ];

    return (
        <TableModal
            title="Similar Historical Snags"
            data={data}
            columns={columns}
            triggerText="View Similar Snags"
            maxHeight="500px"
            open={open}
            setOpen={setOpen}
        />
    );
}
