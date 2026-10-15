import styles from './TextInput.module.css'

type TextInputProps = {
  id: string
  name: string
  label?: string
  type?: 'text' | 'email' | 'tel'
  value: string
  placeholder?: string
  numericOnly?: boolean
  lettersOnly?: boolean
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
}

export function TextInput({
  id,
  name,
  label,
  type = 'text',
  value,
  placeholder,
  numericOnly = false,
  lettersOnly = false,
  onChange,
  onBlur,
  error,
}: TextInputProps) {
  return (
    <div className={styles.fieldWrapper}>
      <input
        id={id}
        name={name}
        type={numericOnly ? 'tel' : type}
        value={value}
        placeholder={placeholder}
        aria-label={label}
        aria-invalid={Boolean(error)}
        inputMode={numericOnly ? 'tel' : lettersOnly ? 'text' : undefined}
        pattern={numericOnly ? '[+0-9]*' : lettersOnly ? '[A-Za-z .\'-]*' : undefined}
        maxLength={numericOnly ? 16 : undefined}
        onChange={(event) => {
          if (numericOnly) {
            const cleaned = event.target.value.replace(/[^\d+]/g, '')
            const sanitized = cleaned.startsWith('+')
              ? `+${cleaned.slice(1).replace(/\+/g, '')}`
              : cleaned.replace(/\+/g, '')

            onChange(sanitized)
            return
          }

          if (lettersOnly) {
            const cleaned = event.target.value.replace(/[^A-Za-z\s.'-]/g, '')
            onChange(cleaned)
            return
          }

          onChange(event.target.value)
        }}
        onBlur={onBlur}
        className={[styles.input, error ? styles.inputError : ''].filter(Boolean).join(' ')}
      />
    </div>
  )
}
