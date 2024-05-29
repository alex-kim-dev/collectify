import MuiTextField from '@mui/material/TextField';
import { ComponentProps } from 'react';
import { type Control, Controller } from 'react-hook-form';

interface TextFieldProps extends ComponentProps<typeof MuiTextField> {
  name: string;
  label: string;
  control: Control<any>;
}

export const TextField: React.FC<TextFieldProps> = ({
  name,
  control,
  label,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <MuiTextField
          error={!!error}
          helperText={error?.message}
          inputRef={ref}
          label={label}
          {...field}
          {...props}
        />
      )}
    />
  );
};
