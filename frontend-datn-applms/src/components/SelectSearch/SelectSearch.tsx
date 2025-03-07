import Select, { components } from 'react-select'
import { User } from '../../types/User';

interface SelectSearchProps {
    onSelectChange: (value: string | null) => void;
    instructors: User[],
}

const SelectSearch: React.FC<SelectSearchProps> = ({ onSelectChange, instructors }) => {

    const instructorResult: Instructors[] = instructors.map((instructor) => ({
        label: instructor.fullname == "" ? instructor.username : instructor.fullname,
        value: instructor._id,
    }));    

    const handleChange = (selectedOption: any) => {
        const selectedValue = selectedOption ? selectedOption.value : null;
        onSelectChange(selectedValue);
    };

    return (
        <Select
            options={instructorResult}
            isClearable={true}
            isSearchable={true}
            onChange={handleChange}
            placeholder="Chọn giảng viên"
            components={{
                IndicatorSeparator: () => null,
                DropdownIndicator,
            }}
        />
    );
};

export default SelectSearch;

export interface Instructors {
    label?: string
    value?: string
}

const DropdownIndicator = (props: any) => {
    return (
        components.DropdownIndicator && (
            <components.DropdownIndicator {...props}>
                <SearchIcon />
            </components.DropdownIndicator>
        )
    );
}

const SearchIcon = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="38" cy="40" r="20.5" stroke="currentColor" strokeWidth="7" />
        <path
            d="M76.0872 84.4699C78.056 86.4061 81.2217 86.3797 83.158 84.4109C85.0943 82.442 85.0679 79.2763 83.099 77.34L76.0872 84.4699ZM50.4199 59.2273L76.0872 84.4699L83.099 77.34L57.4317 52.0974L50.4199 59.2273Z"
            fill="currentColor"
        />
    </svg>
);
