import MultiSelect from '../../molecules/MultiSelect';
import Input from '../../atoms/inputs/Input';

const FilterComponent = ({
  value,
  onChange,
  type,
  options = [],
  placeholder = '',
}: {
  value: any;
  onChange: (any: any) => void;
  type: 'text' | 'select' | undefined;
  options?: any[];
  placeholder: string | undefined;
}) => {
  if (type === 'select') {
    return (
      <MultiSelect
        options={options}
        values={(value ?? []) as Array<any>}
        onChange={onChange}
      />
    );
  } else {
    const inputOnChange: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      onChange(event.target.value);
    };

    return (
      <Input
        type="text"
        value={(value ?? '') as string}
        onChange={inputOnChange}
        icon="filter"
        placeholder={placeholder}
      />
    );
  }
};

export default FilterComponent;
