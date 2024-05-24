import { useState } from 'react';

const useRegisterValidation = initialState => {
   const [form, setForm] = useState(initialState);
   const [errors, setErrors] = useState({});

   const validate = () => {
      let newErrors = {};

      // Validate fullName
      if (!form?.fullName?.trim()) {
         newErrors.fullName = 'Full name is required';
      } else if (form?.fullName?.length > 10) {
         newErrors.fullName = 'Full name must be less than 10 characters';
      }

      // Validate email
      if (!form?.email?.trim()) {
         newErrors.email = 'Email is required';
      } else if (
         !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email)
      ) {
         newErrors.email = 'Invalid email address';
      }

      // Validate password
      if (!form?.password?.trim()) {
         newErrors.password = 'Password is required';
      } else if (form?.password?.length < 6) {
         newErrors.password = 'Password must be at least 6 characters long';
      }
      // Validate birthDate
      if (!form?.birthDate?.trim()) {
         newErrors.birthDate = 'birthDate is required';
      }
      // Validate birthDate
      if (!form?.gender?.trim()) {
         newErrors.birthDate = 'gender is required';
      }
      // Validate avatar url
      if (!form?.avatar?.name) {
         newErrors.avatar = 'Avatar is required';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleOnChange = e => {
      const { value, name, files } = e.target;
      setForm(form => ({
         ...form,
         [name]: value,
      }));

      if (name === 'avatar')
         setForm(form => ({
            ...form,
            [name]: files[0],
         }));
   };

   return [form, setForm, handleOnChange, errors, validate];
};

export default useRegisterValidation;
