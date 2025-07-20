import { useMemo } from "react";
import { ArrowUp, Settings, Plus } from "lucide-react";
import { Textarea } from "@chakra-ui/react";
import { Select, createListCollection } from "@chakra-ui/react";

const getCollection = (items: string[]) => {
  const collection = createListCollection({
    items: items.map((item) => ({
      label: item,
      value: item,
    })),
  });

  collection.items.push({
    label: "default",
    value: "default",
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
}: {
  handleModalOpen: () => void;
  fetchDetails: () => Promise<void>;
  query: string;
  handleSetQuery: (value: string) => void;
  files: string[];
  selectedFile: string[];
  handleSelectFile: (e: any) => void;
}) {
  // const validCount = useMemo(() => {
  //     let count = 0;
  //     if (inputValues.type) {
  //         count += 1;
  //     }
  //     if (inputValues.event) {
  //         count += 1;
  //     }
  //     if (inputValues.raised_by) {
  //         count += 1;
  //     }
  //     if (inputValues.checked && inputValues.checked === true) {
  //         count += 1;
  //     }
  //     return count;
  // }, [
  //     inputValues.event,
  //     inputValues.type,
  //     inputValues.raised_by,
  //     inputValues.hours,
  //     inputValues.checked,
  // ]);

  const isDisabled: boolean = useMemo(() => {
    if (query.length === 0) {
      return true;
    }
    return false;
  }, [query]);

  return (
    <div className="w-[100%] py-3 gap-3 flex flex-col items-center">
      <div className="w-[100%] max-w-xl px-3 flex flex-row items-center justify-between gap-2">
        {/* <div className="flex-1">
                    <button
                        onClick={handleModalOpen}
                        className="w-[100%] px-3 py-2 bg-white flex flex-row items-center justify-between gap-3 text-xs font-medium border-[0.5px] border-solid border-gray-400 rounded-md sm:text-sm"
                    >
                        <div className="flex flex-row items-center gap-3">
                            <Settings size={14} color="black" />
                            <p>Configure Details</p>
                        </div>
                        <div className="p-1 h-5 w-5 rounded-full bg-gray-300 flex justify-center items-center">
                            <p className="text-xs font-light">{0}</p>
                        </div>
                    </button>
                </div> */}
        {/* <div className="flex-1">
                    <Select.Root
                        collection={getCollection(files)}
                        className="w-[100%] border-[0.5px] border-solid border-gray-400 rounded-md pl-4 text-sm font-medium"
                        size="sm"
                        positioning={{ placement: 'top', flip: false }}
                        value={selectedFile || ''}
                        onValueChange={handleSelectFile}
                    >
                        <Select.HiddenSelect />
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText
                                    className="text-xs font-medium sm:text-sm"
                                    placeholder="Select file"
                                />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                            <Select.Content>
                                {getCollection(files).items.map((file) => (
                                    <Select.Item item={file} key={file.value}>
                                        {file.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Select.Root>
                </div> */}
      </div>
      <div className="w-[100%] flex flex-col justify-center items-center gap-1">
        <div className="max-w-3xl flex-1 flex flex-col gap-2 justify-center items-start px-2 border-[0.5px] border-solid border-gray-600 w-[100%] rounded-xl pb-2">
          <InputTextArea query={query} handleSetQuery={handleSetQuery} />
          <div className="w-[100%] flex flex-row justify-between px-1">
            <button className="p-2 rounded-lg flex justify-center items-center transition-transform duration-200 border-[0.5px] border-solid border-gray-600 hover:bg-slate-100">
              <Plus className="h-5 w-5" color="black" />
            </button>
            <button
              onClick={async () => {
                await fetchDetails();
              }}
              disabled={isDisabled}
              className={`p-2 rounded-lg flex justify-center items-center transition-transform duration-200 ${
                isDisabled
                  ? "bg-orange-500 opacity-50 cursor-not-allowed"
                  : "bg-orange-500 hover:scale-105 hover:opacity-90"
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
      resize="vertical"
      minH="1lh"
      maxH="8lh"
      className="pt-3 px-3 text-base focus:outline-none"
      autoresize
    />
  );
}
