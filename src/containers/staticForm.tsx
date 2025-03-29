import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Container } from "@mui/material";
import { IEmployee } from "@/interfaces";

// interface FormData {
//   name: string;
//   initial: string;
//   email: string;
//   password: string;
//   role: string;
//   phone: string;
//   region: string[];
//   ivrActive: boolean;
//   reporting: string;
//   department: string;
// }

interface StaticFormProps {
  onFormSubmit: (data: IEmployee) => void;
}

const StaticForm: React.FC<StaticFormProps> = ({onFormSubmit}) => {
  const { control, handleSubmit } = useForm<IEmployee>({
    defaultValues: {
      name: "callerB",
      intial: "mA",
      email: "callerB@gmail.com",
      password: "test123",
      role: "admin",
      phone: "9876543210",
      // region: ["67c199f6f9ee01aac09253c0"],
      // ivrActive: true,
      reporting: "67c6d4eeca39a9c9c3c3f831",
      department: "Sales",
    },
  });

  const onSubmit = (data: IEmployee) => {
    console.log("Form Data Submitted:", data);
    onFormSubmit(data);
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
        <Controller name="name" control={control} render={({ field }) => <TextField {...field} label="Name" fullWidth />} />
        <Controller name="intial" control={control} render={({ field }) => <TextField {...field} label="Initial" fullWidth />} />
        <Controller name="email" control={control} render={({ field }) => <TextField {...field} label="Email" type="email" fullWidth />} />
        <Controller name="password" control={control} render={({ field }) => <TextField {...field} label="Password" type="password" fullWidth />} />
        <Controller name="role" control={control} render={({ field }) => <TextField {...field} label="Role" fullWidth />} />
        <Controller name="phone" control={control} render={({ field }) => <TextField {...field} label="Phone" fullWidth />} />
        <FormControl fullWidth>
          <InputLabel>Department</InputLabel>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Support">Support</MenuItem>
              </Select>
            )}
          />
        </FormControl>
        {/* <Controller
          name="ivrActive"
          control={control}
          render={({ field }) => (
            <FormControlLabel control={<Switch {...field} checked={field.value} />} label="IVR Active" />
          )}
        /> */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default StaticForm;
