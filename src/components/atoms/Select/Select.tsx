import styles from './Select.module.css'

type SelectOption = {
  label: string
  value: string
}

type SelectProps = {
  id: string
  name: string
  label?: string
  value: string
  options: SelectOption[]
  placeholder?: string
  onChange: (value: string) => void
  onBlur?: () => void
  error?: string
}

export function Select({
  id,
  name,
  label,
  value,
  options,
  placeholder,
  onChange,
  onBlur,
  error,
}: SelectProps) {
  return (
    <div className={styles.fieldWrapper}>
      <div className={styles.selectShell}>
        <select
          id={id}
          name={name}
          value={value}
          aria-label={label}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          className={[styles.select, error ? styles.selectError : ''].filter(Boolean).join(' ')}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <svg
          className={styles.arrow}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5.5 7.5L10 12L14.5 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
