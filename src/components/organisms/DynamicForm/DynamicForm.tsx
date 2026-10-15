import { useMemo, useState } from 'react'
import { initialFormValues, leadFormConfig } from '../../../config/leadFormConfig'
import { shouldShowField, validateForm } from '../../../utils/validation'
import type { FieldName, FormErrors, FormValues } from '../../../types/form.types'
import { Button } from '../../atoms/Button/Button'
import { FormField } from '../../molecules/FormField/FormField'
import styles from './DynamicForm.module.css'

export function DynamicForm() {
  const [values, setValues] = useState<FormValues>(initialFormValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(null)

  const visibleFields = useMemo(
    () => leadFormConfig.filter((field) => shouldShowField(field, values)),
    [values],
  )

  const isSubmitDisabled = useMemo(() => {
    const nextErrors = validateForm(leadFormConfig, values)
    const hasVisibleErrors = Object.keys(nextErrors).length > 0
    const hasConsent = values.consent === true

    return hasVisibleErrors || !hasConsent
  }, [values])

  const setInlineErrors = (nextValues: FormValues) => {
    setErrors(validateForm(leadFormConfig, nextValues))
  }

  const handleChange = (name: FieldName, value: string | boolean) => {
    const nextValues = { ...values, [name]: value }
    setValues(nextValues)

    if (touched[name]) {
      setInlineErrors(nextValues)
    }
  }

  const handleBlur = (name: FieldName) => {
    const nextTouched = { ...touched, [name]: true }
    setTouched(nextTouched)
    setErrors(validateForm(leadFormConfig, values))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextTouched = visibleFields.reduce<Record<string, boolean>>((accumulator, field) => {
      accumulator[field.name] = true
      return accumulator
    }, {})

    setTouched(nextTouched)

    const nextErrors = validateForm(leadFormConfig, values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0 || values.consent !== true) {
      return
    }

    setSubmittedValues(values)
    console.log('Submitted values:', values)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        {visibleFields.map((field) => (
          <div
            key={field.name}
            className={[styles.fieldWrap, field.fullWidth ? styles.fullWidth : styles.normal].join(' ')}
          >
            <FormField
              field={field}
              value={values[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors[field.name]}
            />
          </div>
        ))}
      </div>

      <div className={styles.submitRow}>
        <Button type="submit" disabled={isSubmitDisabled} aria-disabled={isSubmitDisabled}>
          Submit enquiry
        </Button>
      </div>

      {submittedValues && (
        <div className={styles.summary}>
          <h2>Submitted values</h2>
          <pre>{JSON.stringify(submittedValues, null, 2)}</pre>
        </div>
      )}
    </form>
  )
}
