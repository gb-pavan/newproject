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


// 'use client';
// import React, { useEffect, useMemo, useState } from "react";
// import { useForm, Controller, useWatch } from "react-hook-form";
// import {
//   TextField, Button, MenuItem, Select, InputLabel,
//   FormControl, Box, Container, Switch, FormControlLabel,
//   ListItemText, Checkbox, Grid,
// } from "@mui/material";
// import { IEmployee } from "@/interfaces";
// import { handleError } from "@/utils/helpers";
// import { AxiosError } from "axios";
// import { TeamInstance } from "@/services/team.service";
// import { RegionOption } from "@/interfaces/form.interface";
// import { FormInstance } from "@/services/form.service";
// import toast from "react-hot-toast";

// interface Reports {
//   _id: string;
//   name: string;
//   role: 'manager' | string;
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
//       reportees: [],
//       ivrActive: false,
//       region: ""
//     },
//   });

//   const [reportingOptions, setReportingOptions] = useState<Reports[]>([]);
//   const [reporteesOptions, setReporteesOptions] = useState<Reports[]>([]);
//   const [removedReportees, setRemovedReportees] = useState<string[]>([]);
//   const [userRole, setUserRole] = useState<string | null>(null);
//   const [regionOptions, setRegionOptions] = useState<RegionOption[]>([]);

//   // Example mapping of departments to roles
//   const departmentRoles = {
//     Sales: ['manager', 'executive'],
//     Marketing: ['executive', 'admin'],
//     Support: ['admin', 'caller'],
//   };

//   const roleLabels = {
//     admin: 'Admin',
//     caller: 'Caller',
//     manager: 'Manager',
//     executive: 'Executive',
//   };

//   const selectedDepartment = useWatch({ control, name: 'department' });

//   // Compute available roles based on the department
//   const roleOptions = useMemo(() => {
//     return departmentRoles[selectedDepartment] || [];
//   }, [selectedDepartment]);

//   // const selectedDepartment = watch("department");

//   const fetchRegions = async () => {
//     try {
//       const response: RegionOption[] = await FormInstance.getRegions();
//       setRegionOptions(response);
//     } catch (error) {
//       handleError(error as AxiosError, true);
//     }
//   };

//   useEffect(() => {
//     const storedData = localStorage.getItem("authData");
//     if (storedData) {
//       try {
//         const parsed = JSON.parse(storedData);
//         setUserRole(parsed?.role ?? null);
//       } catch (error) {
//         console.error("Error parsing auth data:", error);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (!selectedDepartment) return;

//     const fetchDropdowns = async () => {
//       try {
//         const reportingRes = await TeamInstance.getReportingByDepartment(selectedDepartment);
//         const reporteesRes = await TeamInstance.getReporteesByDepartment(selectedDepartment);

//         setReportingOptions(reportingRes?.users);
//         setReporteesOptions(reporteesRes?.users);

//         reset((prevValues) => ({
//           ...prevValues,
//           reporting: reportingRes?.users?.[0]?._id ?? "",
//           reportees: reporteesRes?.users?.[0]?._id ?? "",
//         }));
//       } catch (error) {
//         handleError(error as AxiosError, false);
//       }
//     };

//     fetchDropdowns();
//   }, [selectedDepartment, reset]);

//   const onSubmit = async (data: IEmployee) => {
//     const { reportees, ...rest } = data;

//     const teamDetails = {
//       ...rest,
//       permission: "full",
//       reporteeChanges: {
//         remove: [...removedReportees],
//         add: reportees || [],
//       },
//     };

//     try {
//       await toast.promise(
//         new Promise(async (resolve, reject) => {
//           try {
//             onFormSubmit(teamDetails); // your callback
//             resolve("success");
//           } catch (err) {
//             reject(err);
//           }
//         }),
//         {
//           loading: "Submitting...",
//           success: "Submitted successfully!",
//           error: "Submission failed!",
//         }
//       );

//       reset(); // ✅ clear form after success
//       setRemovedReportees([]); // optional: reset removed
//     } catch (error) {
//       handleError(error as AxiosError, true);
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ height: '100vh', overflowY: 'auto', py: 2 }}>
//       <Box
//         component="form"
//         onSubmit={handleSubmit(onSubmit)}
//         sx={{ mt: 4, minHeight: '100%', pb: 4 }}
//       >
//         <Grid container spacing={2}>
//           {/* Name */}
//           <Grid item xs={12} md={6}>
//             <Controller name="name" control={control} render={({ field }) => (
//               <TextField {...field} label="Name" fullWidth />
//             )} />
//           </Grid>

//           {/* Initial */}
//           <Grid item xs={12} md={6}>
//             <Controller name="initial" control={control} render={({ field }) => (
//               <TextField {...field} label="Initial" fullWidth />
//             )} />
//           </Grid>

//           {/* Email */}
//           <Grid item xs={12} md={6}>
//             <Controller name="email" control={control} render={({ field }) => (
//               <TextField {...field} label="Email" type="email" fullWidth />
//             )} />
//           </Grid>

//           {/* Password */}
//           <Grid item xs={12} md={6}>
//             <Controller name="password" control={control} render={({ field }) => (
//               <TextField {...field} label="Password" type="password" fullWidth />
//             )} />
//           </Grid>

//           {/* <Grid item xs={12} md={6}>
//             <FormControl fullWidth>
//               <InputLabel>Department</InputLabel>
//               <Controller
//                 name="department"
//                 control={control}
//                 render={({ field }) => (
//                   <Select {...field} label="Department">
//                     <MenuItem value="Sales">Sales</MenuItem>
//                     <MenuItem value="Marketing">Marketing</MenuItem>
//                     <MenuItem value="Support">Support</MenuItem>
//                   </Select>
//                 )}
//               />
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth>
//               <InputLabel>Role</InputLabel>
//               <Controller
//                 name="role"
//                 control={control}
//                 render={({ field }) => (
//                   <Select {...field} label="Role">
//                     <MenuItem value="admin">Admin</MenuItem>
//                     <MenuItem value="caller">Caller</MenuItem>
//                     <MenuItem value="manager">Manager</MenuItem>
//                     <MenuItem value="executive">Executive</MenuItem>
//                   </Select>
//                 )}
//               />
//             </FormControl>
//           </Grid> */}

//           {/* Department */}
//       <Grid item xs={12} md={6}>
//         <FormControl fullWidth>
//           <InputLabel>Department</InputLabel>
//           <Controller
//             name="department"
//             control={control}
//             render={({ field }) => (
//               <Select {...field} label="Department">
//                 <MenuItem value="Sales">Sales</MenuItem>
//                 <MenuItem value="Marketing">Marketing</MenuItem>
//                 <MenuItem value="Support">Support</MenuItem>
//               </Select>
//             )}
//           />
//         </FormControl>
//       </Grid>

//       {/* Role */}
//       <Grid item xs={12} md={6}>
//         <FormControl fullWidth>
//           <InputLabel>Role</InputLabel>
//           <Controller
//             name="role"
//             control={control}
//             render={({ field }) => (
//               <Select {...field} label="Role" disabled={!selectedDepartment}>
//                 {roleOptions.map((role) => (
//                   <MenuItem key={role} value={role}>
//                     {roleLabels[role]}
//                   </MenuItem>
//                 ))}
//               </Select>
//             )}
//           />
//         </FormControl>
//       </Grid>

//           {/* Phone */}
//           <Grid item xs={12} md={6}>
//             <Controller name="phone" control={control} render={({ field }) => (
//               <TextField {...field} label="Phone" fullWidth />
//             )} />
//           </Grid>

          

//           {/* Reporting (if not admin) */}
//           {userRole !== "admin" && (
//             <Grid item xs={12} md={6}>
//               <FormControl fullWidth>
//                 <InputLabel>Reporting</InputLabel>
//                 <Controller
//                   name="reporting"
//                   control={control}
//                   render={({ field }) => (
//                     <Select {...field} label="Reporting">
//                       {reportingOptions.map((option) => (
//                         <MenuItem key={option._id} value={option._id}>
//                           {option.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//           )}

//           {/* Region */}
//           <Grid item xs={12} md={6}>
//             <FormControl fullWidth>
//               <InputLabel>Region</InputLabel>
//               <Controller
//                 name="region"
//                 control={control}
//                 render={({ field }) => (
//                   <Select
//                     {...field}
//                     label="Region"
//                     onOpen={fetchRegions}
//                   >
//                     {regionOptions.map((option) => (
//                       <MenuItem key={option._id} value={option._id}>
//                         {option.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 )}
//               />
//             </FormControl>
//           </Grid>

//           {/* Reportees (if not caller) */}
//           {userRole !== "caller" && (
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel>Reportees</InputLabel>
//                 <Controller
//                   name="reportees"
//                   control={control}
//                   render={({ field }) => {
//                     const selectedValue = Array.isArray(field.value) ? field.value : [];
//                     return (
//                       <Select
//                         {...field}
//                         label="Reportees"
//                         multiple
//                         value={selectedValue}
//                         onChange={(event) => {
//                           const newValue = typeof event.target.value === 'string'
//                             ? event.target.value.split(',')
//                             : event.target.value;

//                           const removed = selectedValue.filter((id) => !newValue.includes(id));
//                           setRemovedReportees(removed);

//                           field.onChange(newValue);
//                         }}
//                         renderValue={(selected) =>
//                           reporteesOptions
//                             .filter((opt) => selected.includes(opt._id))
//                             .map((opt) => opt.name)
//                             .join(', ') || 'Select reportees'
//                         }
//                       >
//                         {reporteesOptions.map((option) => (
//                           <MenuItem key={option._id} value={option._id}>
//                             <Checkbox checked={selectedValue.includes(option._id)} />
//                             <ListItemText primary={option.name} />
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     );
//                   }}
//                 />
//               </FormControl>
//             </Grid>
//           )}

//           {/* IVR */}
//           <Grid item xs={12}>
//             <Controller
//               name="ivrActive"
//               control={control}
//               render={({ field }) => (
//                 <FormControlLabel
//                   control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
//                   label="IVR Active"
//                 />
//               )}
//             />
//           </Grid>

//           {/* Submit */}
//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               Submit
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Container>
//   );
// };

// export default StaticForm;



'use client';
import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import {
  TextField, Button, MenuItem, Select, InputLabel,
  FormControl, Box, Container, Switch, FormControlLabel,
  ListItemText, Checkbox, Grid, Autocomplete,
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

const departmentRoles = {
  Sales: ['manager', 'executive'],
  Marketing: ['executive', 'admin'],
  Support: ['admin', 'caller'],
} as const;

const roleLabels = {
  admin: 'Admin',
  caller: 'Caller',
  manager: 'Manager',
  executive: 'Executive',
} as const;

type DepartmentType = keyof typeof departmentRoles;
type RoleType = keyof typeof roleLabels;

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

  const selectedDepartment = useWatch({ control, name: 'department' }) as DepartmentType | undefined;
  const selectedRole = useWatch({ control, name: 'role' }) as RoleType | undefined;

  const roleOptions = useMemo(() => {
    if (selectedDepartment && departmentRoles[selectedDepartment]) {
      return departmentRoles[selectedDepartment];
    }
    return [];
  }, [selectedDepartment]);

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

  useEffect(() => {
    if (selectedRole === "caller") {
      reset((prev) => ({ ...prev, reportees: [] }));
    }
  }, [selectedRole, reset]);

  const fetchRegions = async () => {
    try {
      const response: RegionOption[] = await FormInstance.getRegions();
      setRegionOptions(response);
    } catch (error) {
      handleError(error as AxiosError, true);
    }
  };

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
    console.log("check form details",teamDetails);

    try {
      await toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            onFormSubmit(teamDetails);
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

      reset();
      setRemovedReportees([]);
    } catch (error) {
      handleError(error as AxiosError, true);
    }
  };
  console.log("reporting",reportingOptions);

  return (
    <Container maxWidth="md" sx={{ height: '100vh', overflowY: 'auto', py: 2 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4, minHeight: '100%', pb: 4 }}>
        <Grid container spacing={2}>
          {/* Basic Inputs */}
          <Grid item xs={12} md={6}>
            <Controller name="name" control={control} render={({ field }) => (
              <TextField {...field} label="Name" fullWidth />
            )} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller name="initial" control={control} render={({ field }) => (
              <TextField {...field} label="Initial" fullWidth />
            )} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller name="email" control={control} render={({ field }) => (
              <TextField {...field} label="Email" type="email" fullWidth />
            )} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller name="password" control={control} render={({ field }) => (
              <TextField {...field} label="Password" type="password" fullWidth />
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

          {/* Role */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select {...field} label="Role" disabled={!selectedDepartment}>
                    {roleOptions.map((role) => (
                      <MenuItem key={role} value={role}>
                        {roleLabels[role as RoleType]}
                      </MenuItem>
                    ))}
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

          {/* Reporting (shown if not admin) */}
          {userRole !== "admin" && (
            // <Grid item xs={12} md={6}>
            //   <FormControl fullWidth>
            //     <InputLabel>Reporting</InputLabel>
            //     <Controller
            //       name="reporting"
            //       control={control}
            //       render={({ field }) => (
            //         <Select {...field} label="Reporting">
            //           {reportingOptions.map((option) => (
            //             <MenuItem key={option._id} value={option._id}>
            //               {option.name}
            //             </MenuItem>
            //           ))}
            //         </Select>
            //       )}
            //     />
            //   </FormControl>
            // </Grid>
            // <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: "auto" }}>
             <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name="reporting"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      options={reportingOptions}
                      getOptionLabel={(option) => option.name}
                      onChange={(_, value) => field.onChange(value?._id ?? "")}
                      renderInput={(params) => <TextField {...params} label="Reporting" />}
                      value={reportingOptions.find((r) => r._id === field.value) || null}
                      isOptionEqualToValue={(option, value) => option._id === value._id}
                      renderOption={(props, option) => (
                        <li {...props} key={option._id}>
                          {option.name}
                        </li>
                      )}
                    />
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

          {/* Reportees (only if not caller) */}
          {selectedRole !== "caller" && (
            // <Grid item xs={12}>
            //   <FormControl fullWidth>
            //     <InputLabel>Reportees</InputLabel>
            //     <Controller
            //       name="reportees"
            //       control={control}
            //       render={({ field }) => {
            //         const selectedValue = Array.isArray(field.value) ? field.value : [];
            //         return (
            //           <Select
            //             {...field}
            //             label="Reportees"
            //             multiple
            //             value={selectedValue}
            //             onChange={(event) => {
            //               const newValue = typeof event.target.value === 'string'
            //                 ? event.target.value.split(',')
            //                 : event.target.value;

            //               const removed = selectedValue.filter((id) => !newValue.includes(id));
            //               setRemovedReportees(removed);
            //               field.onChange(newValue);
            //             }}
            //             renderValue={(selected) =>
            //               reporteesOptions
            //                 .filter((opt) => selected.includes(opt._id))
            //                 .map((opt) => opt.name)
            //                 .join(', ') || 'Select reportees'
            //             }
            //           >
            //             {reporteesOptions.map((option) => (
            //               <MenuItem key={option._id} value={option._id}>
            //                 <Checkbox checked={selectedValue.includes(option._id)} />
            //                 <ListItemText primary={option.name} />
            //               </MenuItem>
            //             ))}
            //           </Select>
            //         );
            //       }}
            //     />
            //   </FormControl>
            // </Grid>
            <Grid item xs={12} md={6}>
  <FormControl fullWidth>
    <Controller
      name="reportees"
      control={control}
      render={({ field }) => {
        const selectedValue = Array.isArray(field.value) ? field.value : [];

        return (
          <Autocomplete
            multiple
            options={reporteesOptions}
            getOptionLabel={(option) => option.name}
            value={reporteesOptions.filter((opt) => selectedValue.includes(opt._id))}
            onChange={(_, selectedOptions) => {
              const newIds = selectedOptions.map((opt) => opt._id);
              const removed = selectedValue.filter((id) => !newIds.includes(id));
              setRemovedReportees(removed);
              field.onChange(newIds);
            }}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            // renderOption={(props, option, { selected }) => (
            //   <li {...props}>
            //     <Checkbox
            //       style={{ marginRight: 8 }}
            //       checked={selected}
            //     />
            //     {option.name}
            //   </li>
            // )}
//             renderOption={(props, option, { selected }) => {
//                 console.log('Autocomplete renderOption props:', props);
//   const { key, ...rest } = props; // separate the key
//   return (
//     <li key={key} {...rest}>
//       <Checkbox style={{ marginRight: 8 }} checked={selected} />
//       {option.name}
//     </li>
//   );
// }}
renderOption={(props, option, { selected }) => {
  const { key: _, ...rest } = props; // discard MUI's internal key
  return (
    <li key={option._id} {...rest}>
      <Checkbox style={{ marginRight: 8 }} checked={selected} />
      {option.name}
    </li>
  );
}}


            renderInput={(params) => <TextField {...params} label="Reportees" placeholder="Select reportees" />}
          />
        );
      }}
    />
  </FormControl>
</Grid>

          )}

          {/* IVR Active */}
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

          {/* Submit Button */}
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



