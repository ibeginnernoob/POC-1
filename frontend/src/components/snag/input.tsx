import { useMemo, useState } from 'react';
import {
    ArrowUp,
    Settings,
    Plus,
    MousePointer,
    ChevronRight,
} from 'lucide-react';
import {
    Textarea,
    Select,
    createListCollection,
    Popover,
    Button,
    Portal,
    HoverCard,
} from '@chakra-ui/react';

const getCollection = (items: string[]) => {
    const collection = createListCollection({
        items: items.map((item) => ({
            label: item,
            value: item,
        })),
    });

    collection.items.push({
        label: 'default',
        value: 'default',
    });

    return collection;
};

export default function Input({
    handleModalOpen,
    fetchDetails,
    query,
    handleSetQuery,
    files,
    selectedFile,
    handleSelectFile,
    dialogValues,
}: {
    handleModalOpen: () => void;
    fetchDetails: () => Promise<void>;
    query: string;
    handleSetQuery: (value: string) => void;
    files: string[];
    selectedFile: string[];
    handleSelectFile: (e: any) => void;
    dialogValues: any;
}) {
    const [openFileChooser, setOpenFileChooser] = useState<boolean>(true);

    const filledCount = useMemo(() => {
        return Object.values(dialogValues).filter((v) => v !== null && v !== '')
            .length;
    }, [dialogValues]);

    const isDisabled: boolean = useMemo(() => {
        if (query.length === 0) {
            return true;
        }
        return false;
    }, [query]);

    return (
        <div className="w-[100%] py-3 gap-3 flex flex-col items-center">
            <div className="w-[100%] flex flex-col justify-center items-center gap-1">
                <div className="max-w-3xl w-full flex flex-row items-center gap-4 mb-1">
                    <div className="border border-solid border-blue-600 rounded-md px-3 py-1 text-black font-roboto line-clamp-1">
                        File:{' '}
                        {selectedFile && selectedFile.length > 0
                            ? selectedFile
                            : 'default'}
                    </div>
                    <div className="border border-solid border-blue-600 rounded-md px-3 py-1 text-black font-roboto flex-shrink-0">
                        Details Configured: {filledCount}
                    </div>
                </div>
                <div className="max-w-3xl flex-1 flex flex-col gap-2 justify-center items-start px-2 border-[0.5px] border-solid border-gray-600 w-[100%] rounded-xl pb-2">
                    <InputTextArea
                        query={query}
                        handleSetQuery={handleSetQuery}
                    />
                    <div className="w-[100%] flex flex-row justify-between px-1">
                        <Popover.Root>
                            <Popover.Trigger asChild>
                                <Button size="sm" variant="outline">
                                    <button className="p-2 rounded-lg flex justify-center items-center transition-transform duration-200 border-[0.5px] border-solid border-gray-600 hover:bg-slate-100">
                                        <Plus
                                            className="h-5 w-5"
                                            color="black"
                                        />
                                    </button>
                                </Button>
                            </Popover.Trigger>
                            <Portal>
                                <Popover.Positioner>
                                    <Popover.Content maxWidth={'200px'}>
                                        <div className="px-2 py-1 bottom-12 bg-white border-[0.5px] border-solid border-gray-600 rounded-lg p-2 flex flex-col justify-between gap-1">
                                            <HoverCard.Root
                                                size="sm"
                                                open={openFileChooser}
                                                onOpenChange={(e) =>
                                                    setOpenFileChooser(e.open)
                                                }
                                                positioning={{
                                                    placement: 'right',
                                                }}
                                            >
                                                <HoverCard.Trigger asChild>
                                                    <button className="px-3 py-1.5 my-1 flex flex-row items-center justify-between rounded-lg hover:bg-gray-200">
                                                        <div className="flex flex-row items-center text-nowrap font-roboto text-base font-medium gap-3">
                                                            <MousePointer
                                                                className="h-5 w-5"
                                                                color="black"
                                                            />
                                                            <span className="text-black">
                                                                Select File
                                                            </span>
                                                        </div>
                                                        <ChevronRight
                                                            className="h-5 w-5"
                                                            color="black"
                                                        />
                                                    </button>
                                                </HoverCard.Trigger>
                                                <HoverCard.Positioner
                                                    className="ml-3"
                                                    placeContent={'right'}
                                                >
                                                    <HoverCard.Content
                                                        minWidth={'250px'}
                                                        maxWidth="500px"
                                                        className="px-2 py-3"
                                                    >
                                                        <div className="flex-1">
                                                            <Select.Root
                                                                collection={getCollection(
                                                                    files
                                                                )}
                                                                className="w-[100%] border-[0.5px] border-solid border-gray-400 rounded-md pl-4 text-sm font-medium"
                                                                size="sm"
                                                                positioning={{
                                                                    placement:
                                                                        'top',
                                                                    flip: false,
                                                                }}
                                                                value={
                                                                    selectedFile ||
                                                                    ''
                                                                }
                                                                onValueChange={
                                                                    handleSelectFile
                                                                }
                                                            >
                                                                <Select.HiddenSelect />
                                                                <Select.Control>
                                                                    <Select.Trigger>
                                                                        <Select.ValueText
                                                                            className="text-base font-medium font-roboto"
                                                                            placeholder="Select file"
                                                                        />
                                                                    </Select.Trigger>
                                                                    <Select.IndicatorGroup>
                                                                        <Select.Indicator />
                                                                    </Select.IndicatorGroup>
                                                                </Select.Control>
                                                                <Select.Positioner>
                                                                    <Select.Content className="mb-3 mr-3">
                                                                        {getCollection(
                                                                            files
                                                                        ).items.map(
                                                                            (
                                                                                file
                                                                            ) => (
                                                                                <Select.Item
                                                                                    item={
                                                                                        file
                                                                                    }
                                                                                    className="min-w-40 max-w-sm text-base font-roboto"
                                                                                    key={
                                                                                        file.value
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        file.label
                                                                                    }
                                                                                    <Select.ItemIndicator />
                                                                                </Select.Item>
                                                                            )
                                                                        )}
                                                                    </Select.Content>
                                                                </Select.Positioner>
                                                            </Select.Root>
                                                        </div>
                                                    </HoverCard.Content>
                                                </HoverCard.Positioner>
                                            </HoverCard.Root>
                                            <div className="border-t border-gray-300" />
                                            <button
                                                onClick={handleModalOpen}
                                                className="px-3 py-1.5 my-1 flex flex-row items-center justify-between text-nowrap font-roboto text-base font-medium gap-3 rounded-lg hover:bg-gray-200"
                                            >
                                                <Settings
                                                    className="h-5 w-5"
                                                    color="black"
                                                />
                                                <span className="text-black">
                                                    Configure Details
                                                </span>
                                            </button>
                                        </div>
                                    </Popover.Content>
                                </Popover.Positioner>
                            </Portal>
                        </Popover.Root>
                        <button
                            onClick={async () => {
                                await fetchDetails();
                            }}
                            disabled={isDisabled}
                            className={`p-2 rounded-lg flex justify-center items-center transition-transform duration-200 ${
                                isDisabled
                                    ? 'bg-orange-500 opacity-50 cursor-not-allowed'
                                    : 'bg-orange-500 hover:scale-105 hover:opacity-90'
                            }`}
                        >
                            <ArrowUp color="white" className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InputTextArea({
    query,
    handleSetQuery,
}: {
    query: string;
    handleSetQuery: (value: string) => void;
}) {
    return (
        <Textarea
            value={query}
            onChange={(e) => {
                handleSetQuery(e.target.value);
            }}
            placeholder="Enter your query or snag here..."
            resize="vertical"
            minH="1lh"
            maxH="8lh"
            className="pt-3 px-3 text-lg focus:outline-none"
            autoresize
        />
    );
}
