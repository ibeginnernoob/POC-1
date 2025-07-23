import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/lovable/dialog';
import { Badge } from '@/components/lovable/badge';

interface TableColumn {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
}

interface TableModalProps {
    title: string;
    data: any[];
    columns: TableColumn[];
    triggerText: string;
    maxHeight?: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TableModal({
    title,
    data,
    columns,
    triggerText,
    maxHeight = '400px',
    open,
    setOpen,
}: TableModalProps) {
    const getValue = (obj: any, key: string) => {
        const keys = key.split('.');
        let value = obj;
        for (const k of keys) {
            value = value?.[k];
        }
        return value;
    };

    const renderCellValue = (value: any, column: TableColumn, row: any) => {
        if (column.render) {
            return column.render(value, row);
        }

        if (typeof value === 'object' && value !== null) {
            return <Badge variant="secondary">[Object]</Badge>;
        }

        if (typeof value === 'number') {
            return value.toFixed(2);
        }

        return String(value || '-');
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white max-w-5xl max-h-[80vh] px-10 py-8">
                <DialogHeader>
                    <DialogTitle className="text-xl font-roboto font-semibold">
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <div
                    className="border-l-[0.5px] border-t-[0.5px] border-solid border-gray-400 rounded-md"
                    style={{
                        maxHeight: '60vh',
                        maxWidth: '100%',
                        overflowX: 'auto',
                        overflowY: 'auto',
                        scrollbarWidth: 'none' /* For Firefox */,
                        msOverflowStyle:
                            'none' /* For Internet Explorer and Edge */,
                    }}
                >
                    <style>
                        {`
                            div::-webkit-scrollbar {
                                display: none; /* For Chrome, Safari, and Opera */
                            }
                        `}
                    </style>
                    <table
                        className="w-full"
                        style={{
                            tableLayout: 'auto',
                            minWidth: 'max-content',
                        }}
                    >
                        <thead className="bg-gray-300">
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        className="px-6 py-3 text-left text-sm font-medium text-gray-900 border-b-[0.5px] border-r-[0.5px] border-solid border-gray-400"
                                        style={{
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {column.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {data.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    {columns.map((column) => {
                                        const value = getValue(row, column.key);
                                        return (
                                            <td
                                                key={column.key}
                                                className="px-6 py-3 text-sm text-gray-900 border-b-[0.5px] border-r-[0.5px] border-solid border-gray-300"
                                                style={{
                                                    minWidth: '40px',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                {renderCellValue(
                                                    value,
                                                    column,
                                                    row
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DialogContent>
        </Dialog>
    );
}
