import styles from './TextArea.module.css'

type TextAreaProps = {
  id: string
  name: string
  label?: string
  value: string
  placeholder?: string
  rows?: number
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
}

export function TextArea({
  id,
  name,
  label,
  value,
  placeholder,
  rows = 5,
  onChange,
  onBlur,
  error,
}: TextAreaProps) {
  return (
    <div className={styles.fieldWrapper}>
      <textarea
        id={id}
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        aria-label={label}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        className={[styles.textarea, error ? styles.textareaError : ''].filter(Boolean).join(' ')}
      />
    </div>
  )
}
