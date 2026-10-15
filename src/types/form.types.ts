export type FieldName =
  | 'fullName'
  | 'email'
  | 'leadType'
  | 'companyName'
  | 'phone'
  | 'notes'
  | 'consent'

export type FieldType = 'text' | 'email' | 'select' | 'textarea' | 'checkbox'

export type FormValue = string | boolean

export type FormValues = Record<FieldName, FormValue>

export type FormErrors = Partial<Record<FieldName, string>>

export type TouchedFields = Partial<Record<FieldName, boolean>>

export interface SelectOption {
  label: string
  value: string
}

export interface ValidationRule {
  required?: boolean
  email?: boolean
  pattern?: RegExp
  minLength?: number
  maxLength?: number
  message?: string
}

export interface VisibilityCondition {
  field: FieldName
  equals: FormValue
}

export interface FormFieldConfig {
  name: FieldName
  type: FieldType
  label: string
  placeholder?: string
  hint?: string
  options?: SelectOption[]
  validations?: ValidationRule[]
  visibleWhen?: VisibilityCondition
  fullWidth?: boolean
}
