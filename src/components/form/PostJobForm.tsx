'use client'

import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import Select, { ActionMeta, SingleValue } from 'react-select';
import z from 'zod';
import { useSession } from "next-auth/react";
import { CustomUser } from "@/lib/types";  
import Modal from '../modal';

const invalid_type_error = 'Invalid type provided for this field';
const required_error = 'This field cannot be blank';
const customStyles = {
  control: (provided: any, state: { isFocused: any; }) => ({
    ...provided,
    width: '100%',
    borderRadius: '0.375rem',
    border: state.isFocused ? '1px solid #ed8d23 !important' : '1px solid #e0e0e0 !important',
    backgroundColor: 'white !important',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: state.isFocused ? '#6B7280' : '#6B7280',
    outline: 'none',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(237, 141, 35, 0.2)' : 'none',
  }),
  option: (provided: any, state: { isFocused: any; }) => ({
    ...provided,
    backgroundColor: state.isFocused ? '#ed8d23 !important' : 'white !important',
    color: state.isFocused ? 'white !important' : '#6B7280 !important',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: '#6B7280 !important',
  }),
  // Add more styles as needed
};

interface PostJobFormProps {
  post_job: (values: z.infer<typeof PostJobSchema>) => Promise<void>;
}

type FormErrors = {
  title?: string;
  salary?: string;
  company?: string;
  description?: string;
  job_type?: string;
  experience?: string;
  job_area?: string;
};

export const PostJobSchema = z.object({
  title: z.string({ invalid_type_error, required_error }).min(1, 'Value is required'),
  salary: z.string({ invalid_type_error, required_error }).min(1, 'Value is required'),
  company: z.string({ invalid_type_error, required_error }).min(1, 'Value is required'),
  description: z.string({ invalid_type_error, required_error }).min(1, 'Value is required'),
  experience: z.string({ invalid_type_error, required_error }).min(1, 'Value is required'),
  job_type: z.string({ invalid_type_error, required_error }).min(1, 'Value is required'),
  job_area: z.string({ invalid_type_error, required_error }).min(1, 'Value is required'),
});

const PostJobForm: React.FC<PostJobFormProps> = ({ post_job }) => {
  
  const [formData, setFormData] = useState({
    title: "",
    salary: "",
    company: "",
    description: "",
    job_type: "",
    experience: "",
    job_area: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [selectedValue, setSelectedValue] = useState<OptionType | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  type OptionType = {
    value: string;
    label: string;
  };

  const options: OptionType[] = [
    { value: 'fulltime', label: 'Full Time' },
    { value: 'parttime', label: 'Part Time' },
    { value: 'internship', label: 'Internship' },
    { value: 'contract', label: 'Contract' },
  ];
  const handleSelectChange = (selectedOption: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
    setSelectedValue(selectedOption);
    if (selectedOption) {
      setFormData({ ...formData, job_type: selectedOption.value });
    } else {
      // Handle the case when nothing is selected (e.g., set job_type to an appropriate default)
    }
  
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validatedData = PostJobSchema.parse(formData);
      setFormErrors({});
      await post_job(validatedData);      
      console.log('Form submitted successfully');

    } catch (error) {
      console.error('Form submission error:', error);
      if (error instanceof z.ZodError) {
        const errors: Partial<FormErrors> = {};
        error.errors.forEach((err) => {
          const fieldName = err.path[0] as keyof FormErrors;  
          errors[fieldName] = err.message;
        });
        setFormErrors(errors as FormErrors);
      }
    }   
    
  };

  
  const { data: session } = useSession();
  const user: CustomUser | undefined = session?.user;
  const [showModal, setShowModal] = useState(false);
  
  return (

    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="company" className="mb-3 block text-base font-medium text-[#07074D]">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              id="title"
              placeholder="Enter job title eg: Fullstack Developer"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-btn-orange focus:shadow-md"
            />
            {formErrors.title && <div className="text-red-500">{formErrors.title}</div>}

          </div>
          <div className="mb-5">
            <label htmlFor="company" className="mb-3 block text-base font-medium text-[#07074D]">
              Company
            </label>
            <input
              value={formData.company}
              onChange={handleChange}
              type="text"
              name="company"
              id="company"
              placeholder="Enter company name eg: Microsoft"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-btn-orange focus:shadow-md"
            />
            {formErrors.company && <div className="text-red-500">{formErrors.company}</div>}

          </div>
          <div className="mb-5">
            <label htmlFor="company" className="mb-3 block text-base font-medium text-[#07074D]">
              Location
            </label>
            <input
              value={formData.job_area}
              onChange={handleChange}
              type="text"
              name="job_area"
              id="ljob_area"
              placeholder="Enter job location eg: Lagos, Nigeria"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-btn-orange focus:shadow-md"
            />
            {formErrors.job_area && <div className="text-red-500">{formErrors.job_area}</div>}

          </div>
          
          <div className="mb-5">
            <label htmlFor="description" className="mb-3 block text-base font-medium text-[#07074D]">
              Description
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={handleChange}
              name="description"
              id="description"
              placeholder="Enter job description"
              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-btn-orange focus:shadow-md"
            ></textarea>
            {formErrors.description && <div className="text-red-500">{formErrors.description}</div>}

          </div>
          <div className="mb-5">
            <label htmlFor="salary" className="mb-3 block text-base font-medium text-[#07074D]">
              Salary
            </label>
            <input
              value={formData.salary}
              onChange={handleChange}
              type="text"
              name="salary"
              id="salary"
              placeholder="Enter job salary eg: 400,000 per month"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-btn-orange focus:shadow-md"
            />   
            {formErrors.salary && <div className="text-red-500">{formErrors.salary}</div>}

          </div>
          <div className="mb-5">
            <label htmlFor="experience" className="mb-3 block text-base font-medium text-[#07074D]">
              Experience
            </label>
            <input
              value={formData.experience}
              onChange={handleChange}
              type="text"
              name="experience"
              id="experience"
              placeholder="Enter years of experience required"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-btn-orange focus:shadow-md"
            />
            {formErrors.experience && <div className="text-red-500">{formErrors.experience}</div>}


          </div>
          <div className="mb-5">
            <label htmlFor="job_type" className="mb-3 block text-base font-medium text-[#07074D]">
              Job Type
            </label>
            <Select styles={customStyles} value={selectedValue} onChange={handleSelectChange} placeholder="Please Select Job type" options={options} />
            <div className='w-full mb-4  flex flex-col items-start justify-center'>
           </div>
           {formErrors.job_type && <div className="text-red-500">{formErrors.job_type}</div>}

          </div>
          {user?.role === 'admin' && (
          <div>
            <button
              type="submit" className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
              Submit
            </button>
          </div>
          )}
          {user?.role !== 'admin' && (
          <div>
            <button
              type="submit" onClick={() => setShowModal(true)}
              className="hover:bg rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
              Post Job
            </button>
            <Modal showModal={showModal} setShowModal={setShowModal} />
          </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJobForm;
