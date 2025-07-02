import { useState } from 'react';
import { Settings, Hand, Plane, Calendar, Hourglass } from 'lucide-react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Slider, Checkbox } from '@chakra-ui/react';
import { type InputDetails } from '@/pages/new';

type DropDowns = 'Type' | 'Event' | 'Raised By';

type DropdownDetails = {
    title: DropDowns;
    icon: any;
    options: string[];
    value: string | null;
    setValue: (dropdownType: DropDowns, value: string | null) => void;
};

export type DialogValues = {
    type: string | null;
    event: string | null;
    raised_by: string | null;
    hours: number[];
    checked: boolean;
};

export default function DetailsDialog({
    inputValues,
    setInputValues,
	handleClose
}: {
    inputValues: InputDetails;
    setInputValues: React.Dispatch<React.SetStateAction<InputDetails>>;
	handleClose: () => void
}) {
    const [dialogValues, setDialogValues] = useState<DialogValues>({
        type: inputValues.type,
        event: inputValues.event,
        raised_by: inputValues.raised_by,
        hours: inputValues.hours,
        checked: inputValues.checked,
    });

    const updateDropDown = (dropdownType: DropDowns, value: string | null) => {
        setDialogValues((prevState: any) => {
            if (dropdownType === 'Type') {
                return {
                    ...prevState,
                    type: value === 'None' ? null : value,
                };
            } else if (dropdownType === 'Event') {
                return {
                    ...prevState,
                    event: value === 'None' ? null : value,
                };
            } else if (dropdownType === 'Raised By') {
                return {
                    ...prevState,
                    raised_by: value === 'None' ? null : value,
                };
            }
        });
    };

	const applyConfig = () => {
		setInputValues(prevState => {
			return {
				...prevState,
				type: dialogValues.type,
				event: dialogValues.event,
				raised_by: dialogValues.raised_by,
				hours: dialogValues.hours,
				checked: dialogValues.checked
			}
		})
		handleClose();
	}

	const resetConfig = () => {
		setDialogValues((_) => {
			return {				
				type: null,
				event: null,
				raised_by: null,
				hours: [0, 2000],
				checked: false
			}
		})
	}

    const dropdowns: DropdownDetails[] = [
        {
            title: 'Type',
            icon: <Plane size={12} />,
            options: ['None', '10', '20', '30'],
            value: dialogValues.type,
            setValue: updateDropDown,
        },
        {
            title: 'Event',
            icon: <Calendar size={12} />,
            options: ['None', '10', '20', '30'],
            value: dialogValues.event,
            setValue: updateDropDown,
        },
        {
            title: 'Raised By',
            icon: <Hand size={12} />,
            options: ['None', '10', '20', '30'],
            value: dialogValues.raised_by,
            setValue: updateDropDown,
        },
    ];

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
                <p className="text-xs font-medium text-slate-600">
                    Select the category, priority, and location to provide
                    better context for AI analysis.
                </p>
            </div>

            {/* inputs */}
            <div className="mt-4 px-6 py-4 flex flex-col gap-3 border-[0.5px] border-solid border-gray-300 rounded-lg shadow-sm">
                <h2 className="text-base font-semibold">Select Details</h2>

                {/* dropdowns */}
                <div className="w-[100%] flex flex-row flex-wrap items-center gap-x-6 gap-y-4">
                    {dropdowns.map((details: DropdownDetails) => {
                        return (
                            <OptionSelect
                                title={details.title}
                                icon={details.icon}
                                options={details.options}
                                value={details.value}
                                setValue={details.setValue}
                            />
                        );
                    })}
                </div>
                <div className="my-3 w-[100%] flex flex-col gap-3">
                    <div className="flex flex-row items-center gap-1.5">
                        <Hourglass size={12} />
                        <h2 className="text-xs font-medium">Flight Hours</h2>
                    </div>
                    <HoursSlider inputValues={dialogValues} setInputValues={setDialogValues} />
                </div>
            </div>

            {/* Buttons */}
            <div className="w-[100%] mt-4 flex flex-row justify-between items-center gap-5">
                <button
					onClick={resetConfig}
					className="bg-white border-[0.5px] border-solid border-slate-300 px-3 py-1.5 text-xs font-medium rounded-md lg:text-sm">
                    Reset All
                </button>
                <div className="flex flex-row items-center gap-4">
                    {/* <button className="bg-white border-[0.5px] border-solid border-slate-300 px-3 py-1.5 text-xs font-medium rounded-md lg:text-sm">
                        Cancel
                    </button> */}
                    <button 
						onClick={applyConfig}
						className="bg-blue-600 text-white px-3 py-1.5 text-xs font-semibold rounded-md lg:text-sm">
                        Apply Configuration
                    </button>
                </div>
            </div>
        </div>
    );
}

function OptionSelect({
    icon,
    title,
    options,
    value,
    setValue,
}: DropdownDetails) {
    return (
        <div className="bg-white flex flex-col flex-1 gap-1.5">
            <div className="flex flex-row items-center gap-1.5">
                {icon}
                <h2 className="text-xs font-medium">{title}</h2>
            </div>
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
                    onChange={(e) => setValue(title, e.target.value)}
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
        </div>
    );
}

const HoursSlider = ({
    inputValues,
    setInputValues,
}: {
    inputValues: DialogValues;
    setInputValues: React.Dispatch<React.SetStateAction<DialogValues>>;
}) => {
    return (
        <div className="flex flex-row gap-5 align-top">
            <div className="pt-0.5">
                <Checkbox.Root
                    checked={inputValues.checked}
                    onCheckedChange={() =>
                        setInputValues((prevState) => {
                            return {
                                ...prevState,
                                checked: !prevState.checked,
                            };
                        })
                    }
                    size={'sm'}
                    defaultChecked
                    variant={'subtle'}
                >
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                </Checkbox.Root>
            </div>
            <div className="w-[100%] flex flex-col gap-1">
                <Slider.Root
                    className="w-[100%]"
                    minStepsBetweenThumbs={5}
                    defaultValue={[
                        inputValues.hours[0] / 20,
                        inputValues.hours[1] / 20,
                    ]}
                    disabled={!inputValues.checked}
                    onValueChange={(e) =>
                        setInputValues((prevState) => {
                            const formattedMap: number[] = [];
                            e.value.map((val) => {
                                formattedMap.push(val * 20);
                            });
                            return {
								...prevState,
								hours: formattedMap
							};
                        })
                    }
                >
                    <Slider.Control>
                        <Slider.Track className="bg-gray-300">
                            <Slider.Range className="bg-green-500" />
                        </Slider.Track>
                        <Slider.Thumb
                            index={0}
                            className="bg-black border-[3px] border-solid border-white"
                        ></Slider.Thumb>
                        <Slider.Thumb
                            index={1}
                            className="bg-black border-[3px] border-solid border-white"
                        ></Slider.Thumb>
                    </Slider.Control>
                </Slider.Root>
                {inputValues.checked && (
                    <div className="w-[100%] text-xs px-1 flex flex-row justify-between items-center">
                        <p>{inputValues.hours[0]}</p>
                        <p>{inputValues.hours[1]}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
