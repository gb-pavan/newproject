// 'use client';
// import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import {
//   TextField, Button, MenuItem, Select, InputLabel,
//   FormControl, Box, Container, Switch, FormControlLabel, ListItemText, Checkbox,
// } from "@mui/material";
// import { IEmployee } from "@/interfaces";
// import { handleError } from "@/utils/helpers";
// import { AxiosError } from "axios";
// import { TeamInstance } from "@/services/team.service";
// import { RegionOption } from "@/interfaces/form.interface";
// import { FormInstance } from "@/services/form.service";

// interface Reports {
//   _id: string;
//   name: string;
//   role: 'manager' | string; // You can make this more specific with a union type
//   isDeleted: boolean;
//   department: string;
//   email: string;
//   depth: number;
// }


// interface StaticFormProps {
//   onFormSubmit: (data: IEmployee) => void;
// }

// const StaticForm: React.FC<StaticFormProps> = ({ onFormSubmit }) => {
//   const { control, handleSubmit, watch, reset } = useForm<IEmployee>({
//     defaultValues: {
//       name: "",
//       initial: "",
//       email: "",
//       password: "",
//       role: "",
//       phone: "",
//       department: "",
//       reporting: "",
//       reportees: [], // if used
//       ivrActive: false,
//       region:''
//     },
//   });


//   const [reportingOptions, setReportingOptions] = useState<Reports[]>([]);
//   const [reporteesOptions, setReporteesOptions] = useState<Reports[]>([]);
//   const [removedReportees, setRemovedReportees] = useState<string[]>([]); // ← store unchecked
//   const [userRole, setUserRole] = useState<string | null>(null);
//   const [regionOptions, setRegionOptions] = useState<RegionOption[]>([]);


//   const selectedDepartment = watch("department");

//   const fetchRegions = async () => {
//     try {
//       const response: RegionOption[] = await FormInstance.getRegions();
//       setRegionOptions(response);
//     } catch (error) {
//       handleError(error as AxiosError,true);
//     }
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedData = localStorage.getItem("authData");
//       if (storedData) {
//         try {
//           const parsed = JSON.parse(storedData);
//           setUserRole(parsed?.role ?? null);
//         } catch (error) {
//           console.error("Error parsing auth data:", error);
//         }
//       }
//     }
//   }, []);
  
//   useEffect(() => {
//   if (!selectedDepartment) return;

//   const fetchDropdowns = async () => {
//     try {
//       const reportingRes = await TeamInstance.getReportingByDepartment(selectedDepartment);
//       const reporteesRes = await TeamInstance.getReporteesByDepartment(selectedDepartment);
      
//       setReportingOptions(reportingRes?.users);
//       setReporteesOptions(reporteesRes?.users);

//       reset((prevValues) => ({
//         ...prevValues,
//         reporting: reportingRes?.users?.[0]?._id ?? "",
//         reportees: reporteesRes?.users?.[0]?._id ?? "",
//       }));
//     } catch (error) {
//       handleError(error as AxiosError, false);
//     }
//   };

//   fetchDropdowns();
// }, [selectedDepartment, reset]);


//   const onSubmit = (data: IEmployee) => {
 
//     const { reportees, ...rest } = data;

//     const teamDetails = {
//       ...rest,
//       permission: "full",
//       reporteeChanges: {
//         remove: [...removedReportees],
//         add: reportees || [],
//       },
//     };



//     onFormSubmit(teamDetails);
//   };

//   return (
//     <Container maxWidth="sm">
//       <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
//         <Controller name="name" control={control} render={({ field }) => <TextField {...field} label="Name" fullWidth />} />
//         <Controller name="initial" control={control} render={({ field }) => <TextField {...field} label="Initial" fullWidth />} />
//         <Controller name="email" control={control} render={({ field }) => <TextField {...field} label="Email" type="email" fullWidth />} />
//         <Controller name="password" control={control} render={({ field }) => <TextField {...field} label="Password" type="password" fullWidth />} />

//         <FormControl fullWidth>
//           <InputLabel>Role</InputLabel>
//           <Controller
//             name="role"
//             control={control}
//             render={({ field }) => (
//               <Select {...field}>
//                 <MenuItem value="admin">Admin</MenuItem>
//                 <MenuItem value="caller">Caller</MenuItem>
//                 <MenuItem value="manager">Manager</MenuItem>
//                 <MenuItem value="executive">Executive</MenuItem>
//               </Select>
//             )}
//           />
//         </FormControl>

//         <Controller name="phone" control={control} render={({ field }) => <TextField {...field} label="Phone" fullWidth />} />

//         <FormControl fullWidth>
//           <InputLabel>Department</InputLabel>
//           <Controller
//             name="department"
//             control={control}
//             render={({ field }) => (
//               <Select {...field}>
//                 <MenuItem value="Sales">Sales</MenuItem>
//                 <MenuItem value="Marketing">Marketing</MenuItem>
//                 <MenuItem value="Support">Support</MenuItem>
//               </Select>
//             )}
//           />
//         </FormControl>
//         {userRole !== "admin" && (        
//         <FormControl fullWidth>
//           <InputLabel>Reporting</InputLabel>
//           <Controller
//             name="reporting"
//             control={control}
//             render={({ field }) => (
//               <Select {...field} label="Reporting">
//                 {reportingOptions?.map((option: Reports) => (
//                   <MenuItem key={option._id} value={option._id}>
//                     {option.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             )}
//           />
//         </FormControl>)}

//         <FormControl fullWidth>
//           <InputLabel>Region</InputLabel>
//           <Controller
//             name="region"
//             control={control}
//             render={({ field }) => (
//               <Select
//                 {...field}
//                 label="Region"
//                 onOpen={fetchRegions} // <- fetch data when dropdown opens
//               >
//                 {regionOptions?.map((option) => (
//                   <MenuItem key={option._id} value={option._id}>
//                     {option.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             )}
//           />
//         </FormControl>


//         {userRole !== "caller" && (
//           <FormControl fullWidth>
//           <InputLabel>Reportees</InputLabel>
//         <Controller
//           name="reportees"
//           control={control}
//           defaultValue={[]}
//           render={({ field }) => {
//             const selectedValue = Array.isArray(field.value) ? field.value : [];

//             return (
//               <Select
//                 {...field}
//                 labelId="reportees-label"
//                 label="Reportees"
//                 multiple
//                 value={selectedValue}
//                 onChange={(event) => {
//                   const newValue = typeof event.target.value === 'string'
//                     ? event.target.value.split(',')
//                     : event.target.value;

//                   // 🔍 find removed ones
//                   const removed = selectedValue.filter((id) => !newValue.includes(id));
//                   setRemovedReportees(removed); // ✅ update state

//                   field.onChange(newValue); // update RHF value
//                 }}
//                 renderValue={(selected) =>
//                   reporteesOptions
//                     ?.filter((option) => selected.includes(option._id))
//                     .map((option) => option.name)
//                     .join(', ') || 'Select reportees'
//                 }
//               >
//                 {reporteesOptions?.map((option) => (
//                   <MenuItem key={option._id} value={option._id}>
//                     <Checkbox checked={selectedValue.includes(option._id)} />
//                     <ListItemText primary={option.name} />
//                   </MenuItem>
//                 ))}
//               </Select>
//             );
//           }}
//         /></FormControl>)}

//         <Controller
//           name="ivrActive"
//           control={control}
//           render={({ field }) => (
//             <FormControlLabel
//               control={
//                 <Switch
//                   checked={field.value}
//                   onChange={(e) => field.onChange(e.target.checked)}
//                 />
//               }
//               label="IVR Active"
//             />
//           )}
//         />

//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           Submit
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default StaticForm;


'use client';
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField, Button, MenuItem, Select, InputLabel,
  FormControl, Box, Container, Switch, FormControlLabel,
  ListItemText, Checkbox, Grid,
} from "@mui/material";
import { IEmployee } from "@/interfaces";
import { handleError } from "@/utils/helpers";
import { AxiosError } from "axios";
import { TeamInstance } from "@/services/team.service";
import { RegionOption } from "@/interfaces/form.interface";
import { FormInstance } from "@/services/form.service";
import toast from "react-hot-toast";

interface Reports {
  _id: string;
  name: string;
  role: 'manager' | string;
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
      reportees: [],
      ivrActive: false,
      region: ""
    },
  });

  const [reportingOptions, setReportingOptions] = useState<Reports[]>([]);
  const [reporteesOptions, setReporteesOptions] = useState<Reports[]>([]);
  const [removedReportees, setRemovedReportees] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [regionOptions, setRegionOptions] = useState<RegionOption[]>([]);

  const selectedDepartment = watch("department");

  const fetchRegions = async () => {
    try {
      const response: RegionOption[] = await FormInstance.getRegions();
      setRegionOptions(response);
    } catch (error) {
      handleError(error as AxiosError, true);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("authData");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setUserRole(parsed?.role ?? null);
      } catch (error) {
        console.error("Error parsing auth data:", error);
      }
    }
  }, []);

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

  const onSubmit = async (data: IEmployee) => {
    const { reportees, ...rest } = data;

    const teamDetails = {
      ...rest,
      permission: "full",
      reporteeChanges: {
        remove: [...removedReportees],
        add: reportees || [],
      },
    };

    try {
      await toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            onFormSubmit(teamDetails); // your callback
            resolve("success");
          } catch (err) {
            reject(err);
          }
        }),
        {
          loading: "Submitting...",
          success: "Submitted successfully!",
          error: "Submission failed!",
        }
      );

      reset(); // ✅ clear form after success
      setRemovedReportees([]); // optional: reset removed
    } catch (error) {
      handleError(error as AxiosError, true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ height: '100vh', overflowY: 'auto', py: 2 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 4, minHeight: '100%', pb: 4 }}
      >
        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12} md={6}>
            <Controller name="name" control={control} render={({ field }) => (
              <TextField {...field} label="Name" fullWidth />
            )} />
          </Grid>

          {/* Initial */}
          <Grid item xs={12} md={6}>
            <Controller name="initial" control={control} render={({ field }) => (
              <TextField {...field} label="Initial" fullWidth />
            )} />
          </Grid>

          {/* Email */}
          <Grid item xs={12} md={6}>
            <Controller name="email" control={control} render={({ field }) => (
              <TextField {...field} label="Email" type="email" fullWidth />
            )} />
          </Grid>

          {/* Password */}
          <Grid item xs={12} md={6}>
            <Controller name="password" control={control} render={({ field }) => (
              <TextField {...field} label="Password" type="password" fullWidth />
            )} />
          </Grid>

          {/* Role */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Role">
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="caller">Caller</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="executive">Executive</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          {/* Phone */}
          <Grid item xs={12} md={6}>
            <Controller name="phone" control={control} render={({ field }) => (
              <TextField {...field} label="Phone" fullWidth />
            )} />
          </Grid>

          {/* Department */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Department">
                    <MenuItem value="Sales">Sales</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                    <MenuItem value="Support">Support</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          {/* Reporting (if not admin) */}
          {userRole !== "admin" && (
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Reporting</InputLabel>
                <Controller
                  name="reporting"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Reporting">
                      {reportingOptions.map((option) => (
                        <MenuItem key={option._id} value={option._id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
          )}

          {/* Region */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Region</InputLabel>
              <Controller
                name="region"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Region"
                    onOpen={fetchRegions}
                  >
                    {regionOptions.map((option) => (
                      <MenuItem key={option._id} value={option._id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>

          {/* Reportees (if not caller) */}
          {userRole !== "caller" && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Reportees</InputLabel>
                <Controller
                  name="reportees"
                  control={control}
                  render={({ field }) => {
                    const selectedValue = Array.isArray(field.value) ? field.value : [];
                    return (
                      <Select
                        {...field}
                        label="Reportees"
                        multiple
                        value={selectedValue}
                        onChange={(event) => {
                          const newValue = typeof event.target.value === 'string'
                            ? event.target.value.split(',')
                            : event.target.value;

                          const removed = selectedValue.filter((id) => !newValue.includes(id));
                          setRemovedReportees(removed);

                          field.onChange(newValue);
                        }}
                        renderValue={(selected) =>
                          reporteesOptions
                            .filter((opt) => selected.includes(opt._id))
                            .map((opt) => opt.name)
                            .join(', ') || 'Select reportees'
                        }
                      >
                        {reporteesOptions.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            <Checkbox checked={selectedValue.includes(option._id)} />
                            <ListItemText primary={option.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    );
                  }}
                />
              </FormControl>
            </Grid>
          )}

          {/* IVR */}
          <Grid item xs={12}>
            <Controller
              name="ivrActive"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                  label="IVR Active"
                />
              )}
            />
          </Grid>

          {/* Submit */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default StaticForm;

