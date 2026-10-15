import type { FormFieldConfig, FormErrors, FormValues } from '../types/form.types'

export function shouldShowField(field: FormFieldConfig, values: FormValues) {
  if (!field.visibleWhen) {
    return true
  }

  return values[field.visibleWhen.field] === field.visibleWhen.equals
}

export function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function validateField(field: FormFieldConfig, values: FormValues) {
  if (!shouldShowField(field, values)) {
    return ''
  }

  const value = values[field.name]
  const rules = field.validations ?? []

  for (const rule of rules) {
    if (rule.required) {
      const isMissing =
        value === '' ||
        value === undefined ||
        value === null ||
        (field.type === 'checkbox' && value === false)

      if (isMissing) {
        return rule.message ?? `${field.label} is required.`
      }
    }

    if (field.type === 'email' || rule.email) {
      if (typeof value === 'string' && value.trim() && !validateEmail(value.trim())) {
        return rule.message ?? 'Please enter a valid email address.'
      }
    }

    if (rule.pattern && typeof value === 'string' && value.trim() && !rule.pattern.test(value.trim())) {
      return rule.message ?? `${field.label} is invalid.`
    }

    if (typeof rule.minLength === 'number' && typeof value === 'string' && value.length < rule.minLength) {
      return rule.message ?? `${field.label} is too short.`
    }

    if (typeof rule.maxLength === 'number' && typeof value === 'string' && value.length > rule.maxLength) {
      return rule.message ?? `${field.label} exceeds the maximum length.`
    }
  }

  return ''
}

export function validateForm(config: FormFieldConfig[], values: FormValues): FormErrors {
  return config.reduce<FormErrors>((errors, field) => {
    const error = validateField(field, values)

    if (error) {
      errors[field.name] = error
    }

    return errors
  }, {})
}
