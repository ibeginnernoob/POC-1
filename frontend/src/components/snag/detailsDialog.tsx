import { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loader from '../ui/loader';
import useFetchCols from '@/hooks/useFetchCols';

export default function DetailsDialog({
    dialogValues,
    setDialogValues,
    selectedFile,
    handleClose,
}: {
    dialogValues: any;
    setDialogValues: React.Dispatch<any>;
    selectedFile: string;
    handleClose: () => void;
}) {
    const { cols, isLoading: isLoadingCols } = useFetchCols(selectedFile);

    const [dropdowns, setDropdowns] = useState<any[]>([]);
    const [dropdownValues, setDropdownValues] = useState<any>({});

    useEffect(() => {
        if (cols && !isLoadingCols) {
            const tempDropdowns: any[] = [];
            const tempDropdownValues: any = {};
            Object.keys(cols).forEach((key) => {
                tempDropdowns.push({
                    title: key,
                    options: cols[key],
                });
                tempDropdownValues[key] = dialogValues[key] || null;
            });
            setDropdowns(tempDropdowns);
            setDropdownValues(tempDropdownValues);
        }
    }, [cols, isLoadingCols]);

    const applyConfig = () => {
        setDialogValues(dropdownValues);
        handleClose();
    };

    const resetConfig = () => {
        setDropdownValues({});
    };

    if (isLoadingCols) {
        return (
            <div className="px-40 py-20 flex justify-center items-center rounded-md bg-white">
                <Loader />
            </div>
        );
    }

    return (
        <div className="max-h-[600px] max-w-3xl min-w-80 h-fit bg-white px-3 py-5 rounded-md overflow-y-auto">
            {/* header */}
            <div className="pl-2 flex flex-col gap-1">
                <div className="flex flex-row items-center gap-2">
                    <Settings size={18} color="black" />
                    <h1 className="text-lg font-semibold">
                        Snag Details Configuration
                    </h1>
                </div>
                <p className="text-xs font-medium text-slate-600">
                    Select the categories to provide better context for AI
                    analysis.
                </p>
            </div>

            {/* inputs */}
            <div className="mt-4 px-4 py-4 flex flex-col justify-center gap-3 border-[0.5px] border-solid border-gray-300 rounded-lg shadow-sm">
                <h2 className="text-base font-semibold">Select Details</h2>

                {/* dropdowns */}
                <div className="w-[100%] flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-4">
                    {dropdowns.map(
                        (details: { title: string; options: string[] }) => {
                            return (
                                <OptionSelect
                                    title={details.title}
                                    options={details.options}
                                    value={
                                        dropdownValues[details.title] || null
                                    }
                                    setValue={(value: string | null) =>
                                        setDropdownValues((prevState: any) => {
                                            return {
                                                ...prevState,
                                                [details.title]: value,
                                            };
                                        })
                                    }
                                />
                            );
                        }
                    )}
                </div>
            </div>

            {/* Buttons */}
            <div className="w-[100%] mt-4 px-2 flex flex-row justify-between items-center gap-5">
                <button
                    onClick={resetConfig}
                    className="bg-white border-[0.5px] border-solid border-slate-300 px-3 py-1.5 text-xs font-medium rounded-md lg:text-sm"
                >
                    Reset All
                </button>
                <div className="flex flex-row items-center gap-4">
                    <button
                        onClick={applyConfig}
                        className="bg-blue-600 text-white px-3 py-1.5 text-xs font-semibold rounded-md lg:text-sm"
                    >
                        Apply Configuration
                    </button>
                </div>
            </div>
        </div>
    );
}

function OptionSelect({
    title,
    options,
    value,
    setValue,
}: {
    title: string;
    options: string[];
    value: string | null;
    setValue: (value: string | null) => void;
}) {
    return (
        <div className="flex-1 max-w-60 w-[100%] flex flex-col items-center gap-1.5">
            <h2 className="text-xs font-medium md:text-sm">{title}</h2>
            {options.length > 0 && (
                <FormControl
                    size="small"
                    fullWidth
                    sx={{
                        minWidth: '160px',
                        flex: 1,
                    }}
                >
                    <Select
                        value={value}
                        // label={title}
                        onChange={(e) => setValue(e.target.value || '')}
                        sx={{
                            height: 40,
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: 14,
                        }}
                    >
                        {options.map((option) => {
                            return (
                                <MenuItem
                                    sx={{
                                        fontSize: 14,
                                    }}
                                    value={option}
                                >
                                    {option}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            )}
            {options.length === 0 && (
                <input
                    type="text"
                    placeholder={`Enter ${title}`}
                    value={value || ''}
                    className="flex-1 max-w-60 min-w-[150px] w-[100%] px-2 py-2.5 border-[0.5px] border-solid border-gray-400 rounded-md text-sm md:text-base"
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                />
            )}
        </div>
    );
}
