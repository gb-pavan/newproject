import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField, Button, MenuItem, Select, InputLabel,
  FormControl, Box, Container, Switch, FormControlLabel, ListItemText, Checkbox,
} from "@mui/material";
import { IEmployee } from "@/interfaces";
import { handleError } from "@/utils/helpers";
import { AxiosError } from "axios";
import { TeamInstance } from "@/services/team.service";

interface Reports {
  _id: string;
  name: string;
  role: 'manager' | string; // You can make this more specific with a union type
  isDeleted: boolean;
  department: string;
  email: string;
  depth: number;
}


interface StaticFormProps {
  onFormSubmit: (data: IEmployee) => void;
}

const StaticForm: React.FC<StaticFormProps> = ({ onFormSubmit }) => {
  const { control, handleSubmit, watch, reset } = useForm<IEmployee>({
    defaultValues: {
      name: "",
      initial: "",
      email: "",
      password: "",
      role: "",
      phone: "",
      department: "",
      reporting: "",
      reportees: [], // if used
      ivrActive: false,
    },
  });


  const [reportingOptions, setReportingOptions] = useState<Reports[]>([]);
  const [reporteesOptions, setReporteesOptions] = useState<Reports[]>([]);
  const [removedReportees, setRemovedReportees] = useState<string[]>([]); // ← store unchecked


  const selectedDepartment = watch("department");

  useEffect(() => {
  if (!selectedDepartment) return;

  const fetchDropdowns = async () => {
    try {
      const reportingRes = await TeamInstance.getReportingByDepartment(selectedDepartment);
      const reporteesRes = await TeamInstance.getReporteesByDepartment(selectedDepartment);
      
      setReportingOptions(reportingRes?.users);
      setReporteesOptions(reporteesRes?.users);

      reset((prevValues) => ({
        ...prevValues,
        reporting: reportingRes?.users?.[0]?._id ?? "",
        reportees: reporteesRes?.users?.[0]?._id ?? "",
      }));
    } catch (error) {
      handleError(error as AxiosError, false);
    }
  };

  fetchDropdowns();
}, [selectedDepartment, reset]);


  const onSubmit = (data: IEmployee) => {
    console.log("Form Data Submitted:", data);
    // const teamDetails = {
    //   ...(() => {
    //     const { reportees, ...rest } = data; // remove `reporting` from `data`
    //     return rest;
    //   })(),
    //   "permission": "full",
    //   reporteeChanges: {
    //     "remove": [...removedReportees],
    //     "add": data.reportees || [], // add from `reporting` or empty array
    //   },
    // };
    // const teamDetails = {
    //   ...(() => {
    //     const { reportees, ...rest } = data;
    //     return rest;
    //   })(),
    //   permission: "full",
    //   reporteeChanges: {
    //     remove: [...removedReportees],
    //     // add: data.reportees || [],
    //     add: reportees || [], // ✅ uses destructured value, no lint error
    //   },
    // };
    const { reportees, ...rest } = data;

    const teamDetails = {
      ...rest,
      permission: "full",
      reporteeChanges: {
        remove: [...removedReportees],
        add: reportees || [],
      },
    };



    onFormSubmit(teamDetails);
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
        <Controller name="name" control={control} render={({ field }) => <TextField {...field} label="Name" fullWidth />} />
        <Controller name="initial" control={control} render={({ field }) => <TextField {...field} label="Initial" fullWidth />} />
        <Controller name="email" control={control} render={({ field }) => <TextField {...field} label="Email" type="email" fullWidth />} />
        <Controller name="password" control={control} render={({ field }) => <TextField {...field} label="Password" type="password" fullWidth />} />

        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="caller">Caller</MenuItem>
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="executive">Executive</MenuItem>
              </Select>
            )}
          />
        </FormControl>

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

        <FormControl fullWidth>
          <InputLabel>Reporting</InputLabel>
          <Controller
            name="reporting"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Reporting">
                {reportingOptions?.map((option: Reports) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {/* <FormControl fullWidth>
          <InputLabel>Reportees</InputLabel>
          <Controller
            name="reportees"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Reportees">
                {reporteesOptions?.map((option: any) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl> */}
        {/* <FormControl fullWidth>
          <InputLabel id="reportees-label">Reportees</InputLabel>
          <Controller
            name="reportees"
            control={control}
            defaultValue={[]} // Always an array
            render={({ field }) => (
              <Select
                {...field}
                labelId="reportees-label"
                label="Reportees"
                multiple
                value={[field.value] || []}
                onChange={(event) => {
                  const value = event.target.value;
                  field.onChange(typeof value === 'string' ? value.split(',') : value);
                }}
                renderValue={(selected) =>
                  reporteesOptions
                    ?.filter((option) => selected.includes([option._id]))
                    .map((option) => option.name)
                    .join(', ') || 'Select reportees'
                }
              >
                {reporteesOptions?.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    <Checkbox checked={field.value?.includes(option._id)} />
                    <ListItemText primary={option.name} />
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl> */}
        {/* <FormControl fullWidth>
          <InputLabel id="reportees-label">Reportees</InputLabel>
          <Controller
            name="reportees"
            control={control}
            defaultValue={[]} // ✅ make sure it's an array
            render={({ field }) => {
              const selectedValue = Array.isArray(field.value) ? field.value : []; // ✅ ensures array

              return (
                <Select
                  {...field}
                  labelId="reportees-label"
                  label="Reportees"
                  multiple
                  value={selectedValue} // ✅ always an array
                  onChange={(event) => {
                    const value = event.target.value;
                    field.onChange(typeof value === 'string' ? value.split(',') : value);
                  }}
                  renderValue={(selected) =>
                    reporteesOptions
                      ?.filter((option) => selected.includes(option._id))
                      .map((option) => option.name)
                      .join(', ') || 'Select reportees'
                  }
                >
                  {reporteesOptions?.map((option) => (
                    <MenuItem key={option._id} value={option._id}>
                      <Checkbox checked={selectedValue.includes(option._id)} />
                      <ListItemText primary={option.name} />
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
          />
        </FormControl> */}
        <Controller
  name="reportees"
  control={control}
  defaultValue={[]}
  render={({ field }) => {
    const selectedValue = Array.isArray(field.value) ? field.value : [];

    return (
      <Select
        {...field}
        labelId="reportees-label"
        label="Reportees"
        multiple
        value={selectedValue}
        onChange={(event) => {
          const newValue = typeof event.target.value === 'string'
            ? event.target.value.split(',')
            : event.target.value;

          // 🔍 find removed ones
          const removed = selectedValue.filter((id) => !newValue.includes(id));
          setRemovedReportees(removed); // ✅ update state

          field.onChange(newValue); // update RHF value
        }}
        renderValue={(selected) =>
          reporteesOptions
            ?.filter((option) => selected.includes(option._id))
            .map((option) => option.name)
            .join(', ') || 'Select reportees'
        }
      >
        {reporteesOptions?.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            <Checkbox checked={selectedValue.includes(option._id)} />
            <ListItemText primary={option.name} />
          </MenuItem>
        ))}
      </Select>
    );
  }}
/>

        {/* <Controller
  name="reportees"
  control={control}
  defaultValue={[]} // always an array
  render={({ field }) => {
    console.log('RHF Field:', field); // 👈 Console log here

    return (
      <Select
        {...field}
        labelId="reportees-label"
        label="Reportees"
        multiple
        value={[field.value] || []}
        onChange={(event) => {
          const value = event.target.value;
          field.onChange(typeof value === 'string' ? value.split(',') : value);
        }}
        renderValue={(selected) =>
          reporteesOptions
            ?.filter((option) => selected.includes([option._id]))
            .map((option) => option.name)
            .join(', ')
        }
      >
        {reporteesOptions?.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            <Checkbox checked={field.value?.includes(option._id)} />
            <ListItemText primary={option.name} />
          </MenuItem>
        ))}
      </Select>
    );
  }}
/> */}




        <Controller
          name="ivrActive"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="IVR Active"
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default StaticForm;

