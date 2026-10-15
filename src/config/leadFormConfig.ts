import type { FormFieldConfig, FormValues } from '../types/form.types'

export const initialFormValues: FormValues = {
  fullName: '',
  email: '',
  leadType: '',
  companyName: '',
  phone: '',
  notes: '',
  consent: false,
}

export const leadFormConfig: FormFieldConfig[] = [
  {
    name: 'fullName',
    type: 'text',
    label: 'Full name',
    placeholder: 'Enter your full name',
    validations: [
      { required: true, message: 'Full name is required.' },
      { pattern: /^[A-Za-z][A-Za-z\s.'-]*$/, message: 'Name can contain only letters, spaces, and . \- apostrophes.' },
    ],
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email address',
    placeholder: 'name@example.com',
    validations: [
      { required: true, message: 'Email address is required.' },
      { email: true, message: 'Enter a valid email address.' },
    ],
  },
  {
    name: 'leadType',
    type: 'select',
    label: 'Lead type',
    placeholder: 'Select a lead type',
    options: [
      { label: 'Individual', value: 'individual' },
      { label: 'Company', value: 'company' },
    ],
    validations: [{ required: true, message: 'Lead type is required.' }],
  },
  {
    name: 'companyName',
    type: 'text',
    label: 'Company name',
    placeholder: 'Enter the company name',
    visibleWhen: { field: 'leadType', equals: 'company' },
    validations: [{ required: true, message: 'Company name is required for company leads.' }],
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone number',
    placeholder: 'Enter your phone number with country code',
    hint: 'Use international format, for example +1 9876543210 or +44 20 7946 0958.',
    validations: [
      { required: true, message: 'Phone number is required.' },
      {
        pattern: /^\+?\d{10,15}$/,
        message: 'Phone number must include a valid country code and at least 10 digits.',
      },
    ],
  },
  {
    name: 'notes',
    type: 'textarea',
    label: 'Notes',
    placeholder: 'Tell us how we can help',
    hint: 'Maximum 200 characters.',
    fullWidth: true,
    validations: [{ maxLength: 200, message: 'Notes cannot exceed 200 characters.' }],
  },
  {
    name: 'consent',
    type: 'checkbox',
    label: 'I agree to be contacted about this enquiry.',
    fullWidth: true,
    validations: [{ required: true, message: 'You must provide consent before submitting.' }],
  },
]
