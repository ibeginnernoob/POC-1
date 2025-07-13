import { Wrench, PanelRight } from 'lucide-react';
import { Button } from '@/components/lovable/button';
import type { Dispatch } from 'react';
export default function Header({
    handleSidebarOpen,
    handleFileSelect,
    fileUploadRef,
    isNew,
    setOpen,
}: {
    handleSidebarOpen: () => void;
    handleFileSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileUploadRef?: React.RefObject<HTMLInputElement>;
    isNew: boolean;
    setOpen?: Dispatch<React.SetStateAction<boolean>>;
}) {
    const handleInputActive = () => {
        if (fileUploadRef && fileUploadRef.current) {
            fileUploadRef.current.click();
        }
    };

    return (
        <div className="w-[100%] py-3 border-b-[0.5px] border-solid border-gray-300">
            <div className="max-w-4xl mx-auto px-8 flex flex-row items-center justify-between gap-4">
                <div className="flex flex-row items-center gap-3">
                    <button
                        className="flex justify-center items-center bg-white p-2 rounded-full hover:bg-gray-100 duration-200"
                        onClick={handleSidebarOpen}
                    >
                        <PanelRight size={16} />
                    </button>

                    <div className="items-center gap-3 hidden sm:flex">
                        <div className="hidden p-2 bg-blue-600 rounded-lg sm:block">
                            <Wrench className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-bold text-slate-800 sm:text-xl">
                                AI Snag Report Analyzer
                            </h1>
                            <p className="text-xs text-slate-600 sm:text-sm">
                                Natural Language Processing for Construction
                                Management
                            </p>
                        </div>
                    </div>
                </div>
                {isNew && (
                    <div className="flex flex-row items-center">
                        <input
                            type="file"
                            ref={fileUploadRef}
                            onChange={handleFileSelect}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            style={{ opacity: '0', width: 0 }}
                        />
                        <button
                            onClick={() => handleInputActive()}
                            className="px-2.5 py-1.5 text-nowrap text-black text-xs font-roboto font-medium border border-solid border-black rounded-md md:text-sm hover:bg-slate-100 duration-200"
                        >
                            Upload
                        </button>
                    </div>
                )}
                {!isNew && (
                    <div className="flex gap-6">
                        <div className="flex flex-row items-center">
                            <Button
                                onClick={() => setOpen?.(true)}
                                className="px-2.5 py-1.5 text-nowrap text-black text-xs font-roboto font-medium border border-solid border-black rounded-md md:text-sm hover:bg-slate-100 duration-200"
                            >
                                Historical Cases
                            </Button>
                        </div>
                        <div className="flex flex-row items-center">
                            <Button
                                // onClick={() => handleShowAnalysis()}
                                className="px-2.5 py-1.5 text-nowrap text-black text-xs font-roboto font-medium border border-solid border-black rounded-md md:text-sm hover:bg-slate-100 duration-200"
                            >
                                Analytics
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
