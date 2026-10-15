import styles from './Checkbox.module.css'

type CheckboxProps = {
  id: string
  name: string
  checked: boolean
  label?: string
  onChange: (value: boolean) => void
  onBlur?: () => void
  error?: string
}

export function Checkbox({ id, name, checked, label, onChange, onBlur, error }: CheckboxProps) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.container}>
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(event.target.checked)}
          onBlur={onBlur}
          className={styles.input}
        />
        <span className={styles.checkmark} aria-hidden="true" />
        {label && <span>{label}</span>}
      </label>
    </div>
  )
}
