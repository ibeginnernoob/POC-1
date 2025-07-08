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
    handleClose,
    selectedFile,
}: {
    dialogValues: any;
    setDialogValues: React.Dispatch<any>;
    handleClose: () => void;
    selectedFile: string;
}) {
    const { cols, isLoading } = useFetchCols(selectedFile);

    const [dropdowns, setDropdowns] = useState<any[]>([]);
    const [dropdownValues, setDropdownValues] = useState<any>({});

    const applyConfig = () => {
        setDialogValues(dropdownValues);
        handleClose();
    };

    const resetConfig = () => {
        setDropdownValues({});
    };

    useEffect(() => {
        if (cols && !isLoading) {
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
    }, [cols, isLoading]);

    if (isLoading) {
        return (
            <div className="p-10 flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    return (
        <div className="max-h-screen h-fit max-w-3xl min-w-[300px] bg-white px-8 py-3 rounded-md overflow-y-auto">
            {/* header */}
            <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center gap-2">
                    <Settings size={16} color="black" />
                    <h1 className="text-base font-semibold">
                        Snag Details Configuration
                    </h1>
                </div>
                {/* <p className="text-xs font-medium text-slate-600">
                    Select the category, priority, and location to provide
                    better context for AI analysis.
                </p> */}
            </div>

            {/* inputs */}
            <div className="mt-4 px-6 py-4 flex flex-col gap-3 border-[0.5px] border-solid border-gray-300 rounded-lg shadow-sm">
                <h2 className="text-base font-semibold">Select Details</h2>

                {/* dropdowns */}
                <div className="w-[100%] flex flex-row flex-wrap items-center gap-x-6 gap-y-4">
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
            <div className="w-[100%] mt-4 flex flex-row justify-between items-center gap-5">
                <button
                    onClick={resetConfig}
                    className="bg-white border-[0.5px] border-solid border-slate-300 px-3 py-1.5 text-xs font-medium rounded-md lg:text-sm"
                >
                    Reset All
                </button>
                <div className="flex flex-row items-center gap-4">
                    {/* <button className="bg-white border-[0.5px] border-solid border-slate-300 px-3 py-1.5 text-xs font-medium rounded-md lg:text-sm">
                        Cancel
                    </button> */}
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
        <div className="bg-white flex flex-col flex-1 gap-1.5">
            <div className="flex flex-row items-center">
                <h2 className="text-xs font-medium">{title}</h2>
            </div>
            {options.length > 0 && (
                <FormControl
                    size="small"
                    fullWidth
                    sx={{
                        minWidth: '120px',
                    }}
                >
                    <InputLabel
                        id="demo-simple-select-label"
                        sx={{
                            fontSize: 14,
                            margin: 0,
                            color: 'gray',
                        }}
                    >
                        {title}
                    </InputLabel>
                    <Select
                        value={value}
                        label={title}
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
                    placeholder={title}
                    value={value || ''}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                />
            )}
        </div>
    );
}

// const HoursSlider = ({
//     inputValues,
//     setInputValues,
// }: {
//     inputValues: DialogValues;
//     setInputValues: React.Dispatch<React.SetStateAction<DialogValues>>;
// }) => {
//     return (
//         <div className="flex flex-row gap-5 align-top">
//             <div className="pt-0.5">
//                 <Checkbox.Root
//                     checked={inputValues.checked}
//                     onCheckedChange={() =>
//                         setInputValues((prevState) => {
//                             return {
//                                 ...prevState,
//                                 checked: !prevState.checked,
//                             };
//                         })
//                     }
//                     size={'sm'}
//                     defaultChecked
//                     variant={'subtle'}
//                 >
//                     <Checkbox.HiddenInput />
//                     <Checkbox.Control />
//                 </Checkbox.Root>
//             </div>
//             <div className="w-[100%] flex flex-col gap-1">
//                 <Slider.Root
//                     className="w-[100%]"
//                     minStepsBetweenThumbs={5}
//                     defaultValue={[
//                         inputValues.hours[0] / 20,
//                         inputValues.hours[1] / 20,
//                     ]}
//                     disabled={!inputValues.checked}
//                     onValueChange={(e) =>
//                         setInputValues((prevState) => {
//                             const formattedMap: number[] = [];
//                             e.value.map((val) => {
//                                 formattedMap.push(val * 20);
//                             });
//                             return {
//                                 ...prevState,
//                                 hours: formattedMap,
//                             };
//                         })
//                     }
//                 >
//                     <Slider.Control>
//                         <Slider.Track className="bg-gray-300">
//                             <Slider.Range className="bg-green-500" />
//                         </Slider.Track>
//                         <Slider.Thumb
//                             index={0}
//                             className="bg-black border-[3px] border-solid border-white"
//                         ></Slider.Thumb>
//                         <Slider.Thumb
//                             index={1}
//                             className="bg-black border-[3px] border-solid border-white"
//                         ></Slider.Thumb>
//                     </Slider.Control>
//                 </Slider.Root>
//                 {inputValues.checked && (
//                     <div className="w-[100%] text-xs px-1 flex flex-row justify-between items-center">
//                         <p>{inputValues.hours[0]}</p>
//                         <p>{inputValues.hours[1]}</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
