"use client";
import DynamicForm from '@/containers/dynamicForm';
import { FormField } from '@/interfaces/form.interface';
import { TableInstance } from '@/services/table.service';
import { handleError } from '@/utils/helpers';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

const FormPage = () => {

  const [fields, setFields] = useState<FormField[]>([]);

  useEffect(() => {
    const fetchFields = async () => {
        try {
          const response = await TableInstance.getFormFields();
          setFields(response);
        } catch (error) {
          handleError(error as AxiosError, false);
        }
    };

    fetchFields();
  }, []);


  const handleFormSubmit = (data: Record<string, string>) => {
    console.log("Form Data:", data);
  };

  return (
    <div >      
      <DynamicForm fields={fields} onSubmit={handleFormSubmit} />
    </div>
  )
}

export default FormPage;