import { Send, Settings } from 'lucide-react';
import { Textarea } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import type { InputDetails } from '@/pages/new';
import { Select } from '@chakra-ui/react';

export default function Input({
    handleModalOpen,
    inputValues,
    setInputValues,
    fetchDetails,
}: {
    handleModalOpen: () => void;
    inputValues: InputDetails;
    setInputValues: React.Dispatch<React.SetStateAction<InputDetails>>;
    fetchDetails: () => Promise<void>;
}) {
    const validCount = useMemo(() => {
        let count = 0;
        if (inputValues.type) {
            count += 1;
        }
        if (inputValues.event) {
            count += 1;
        }
        if (inputValues.raised_by) {
            count += 1;
        }
        if (inputValues.checked && inputValues.checked === true) {
            count += 1;
        }
        return count;
    }, [
        inputValues.event,
        inputValues.type,
        inputValues.raised_by,
        inputValues.hours,
        inputValues.checked,
    ]);

    const isDisabled: boolean = useMemo(() => {
        if (inputValues.prompt.length === 0) {
            return true;
        }
        return false;
    }, [inputValues.prompt]);

    const files = [
        {
            id: '1',
            name: 'Document.pdf',
            size: 102400,
            type: 'application/pdf',
            uploadDate: new Date(),
        },
        {
            id: '2',
            name: 'Image.png',
            size: 204800,
            type: 'image/png',
            uploadDate: new Date(),
        },
    ];

    const handleFileSelect = (fileId: string | null) => {
        console.log('Selected file ID:', fileId);
        setFileId(fileId || '');
    };

    const [fileId, setFileId] = React.useState<string>('');

    return (
        <div className="h-[20vh] pt-3 w-[100%] flex flex-col items-center gap-3 border-t-[0.5px] border-solid border-slate-200 bg-white">
            <div className="flex flex-row items-center justify-between gap-5">
                <div className="max-w-xl">
                    <button
                        onClick={handleModalOpen}
                        className="w-[100%] px-3 py-2 bg-white flex flex-row items-center gap-3 text-sm font-medium border-[0.5px] border-solid border-gray-400 rounded-md"
                    >
                        <Settings size={14} color="black" />
                        <p>Configure Snag Details</p>
                        <div className="p-1 h-5 w-5 rounded-full bg-gray-300 flex justify-center items-center">
                            <p className="text-xs font-light">{validCount}</p>
                        </div>
                    </button>
                </div>
                <div className="max-w-xl bg-red-200">
                    <Select.Root className="w-[100%]" size="sm">
                        <Select.HiddenSelect />
                        {/* <Select.Label>Select framework</Select.Label> */}
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder="Select framework" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                            <Select.Content>
                                {files.map((file) => (
                                    <Select.Item item={file} key={file.name}>
                                        {file.name}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Select.Root>
                </div>
            </div>
            <div className="bg-white w-[100%] flex flex-col justify-center items-center gap-1">
                <div className="flex-1 flex flex-row gap-3 justify-center items-start w-[100%] max-w-4xl px-5">
                    <InputTextArea
                        inputValues={inputValues}
                        setInputValues={setInputValues}
                    />
                    <button
                        onClick={async () => {
                            await fetchDetails();
                        }}
                        disabled={isDisabled}
                        className={`p-3 rounded-md bg-black flex justify-center items-center ${
                            isDisabled
                                ? 'opacity-60'
                                : 'hover:opacity-60 duration-200'
                        }`}
                    >
                        <Send size={20} color="white" />
                    </button>
                </div>
                <p className="text-xs font-light px-6">
                    Tip: Use the "Configure Snag Details" button above to
                    provide category, priority, and location for more accurate
                    recommendations.
                </p>
            </div>
        </div>
    );
}

function InputTextArea({
    inputValues,
    setInputValues,
}: {
    inputValues: InputDetails;
    setInputValues: React.Dispatch<React.SetStateAction<InputDetails>>;
}) {
    return (
        <Textarea
            className="max-w-3xl py-2 px-3 border border-solid border-gray-300 rounded-lg text-sm"
            value={inputValues.prompt}
            onChange={(e) => {
                setInputValues((prevState) => {
                    return {
                        ...prevState,
                        prompt: e.target.value,
                    };
                });
            }}
            placeholder="Describe your snag issue ..."
            maxH="3lh"
            minH="3lh"
            _focus={{
                borderColor: 'blue.300',
                borderWidth: '1.1px',
                boxShadow: '0 0 0 1px blue.500',
            }}
            autoresize
        />
    );
}
