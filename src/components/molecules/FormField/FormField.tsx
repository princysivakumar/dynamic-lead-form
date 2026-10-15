import type { FieldName, FormFieldConfig } from '../../../types/form.types'
import { Checkbox } from '../../atoms/Checkbox/Checkbox'
import { Select } from '../../atoms/Select/Select'
import { TextArea } from '../../atoms/TextArea/TextArea'
import { TextInput } from '../../atoms/TextInput/TextInput'
import styles from './FormField.module.css'

type FormFieldProps = {
  field: FormFieldConfig
  value: string | boolean
  onChange: (name: FieldName, value: string | boolean) => void
  onBlur: (name: FieldName) => void
  error?: string
}

export function FormField({ field, value, onChange, onBlur, error }: FormFieldProps) {
  const fieldId = `${field.name}-field`
  const isRequired = field.validations?.some((rule) => rule.required)

  const renderField = () => {
    if (field.type === 'email' || field.type === 'text') {
      return (
        <TextInput
          id={fieldId}
          name={field.name}
          label={field.label}
          value={typeof value === 'string' ? value : ''}
          placeholder={field.placeholder}
          type={field.type === 'email' ? 'email' : 'text'}
          numericOnly={field.name === 'phone'}
          lettersOnly={field.name === 'fullName'}
          onChange={(nextValue) => onChange(field.name, nextValue)}
          onBlur={() => onBlur(field.name)}
          error={error}
        />
      )
    }

    if (field.type === 'textarea') {
      return (
        <TextArea
          id={fieldId}
          name={field.name}
          label={field.label}
          value={typeof value === 'string' ? value : ''}
          placeholder={field.placeholder}
          onChange={(nextValue) => onChange(field.name, nextValue)}
          onBlur={() => onBlur(field.name)}
          error={error}
        />
      )
    }

    if (field.type === 'select') {
      return (
        <Select
          id={fieldId}
          name={field.name}
          label={field.label}
          value={typeof value === 'string' ? value : ''}
          options={field.options ?? []}
          placeholder={field.placeholder}
          onChange={(nextValue) => onChange(field.name, nextValue)}
          onBlur={() => onBlur(field.name)}
          error={error}
        />
      )
    }

    return (
      <Checkbox
        id={fieldId}
        name={field.name}
        label={field.label}
        checked={typeof value === 'boolean' ? value : false}
        onChange={(nextValue) => onChange(field.name, nextValue)}
        onBlur={() => onBlur(field.name)}
        error={error}
      />
    )
  }

  return (
    <div className={styles.field}>
      {field.type !== 'checkbox' && (
        <label className={styles.label} htmlFor={fieldId}>
          {field.label}
          {isRequired && <span className={styles.required}> *</span>}
        </label>
      )}

      {renderField()}

      {field.hint && !error && <small className={styles.helper}>{field.hint}</small>}
      {error && <small className={styles.error}>{error}</small>}
    </div>
  )
}
