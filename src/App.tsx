import { DynamicForm } from './components/organisms/DynamicForm/DynamicForm'
import styles from './App.module.css'

function App() {
  return (
    <main className={styles.app}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <h1>Request a guided consultation</h1>
          <p>
            Share a few details and we’ll help tailor the best next step for your business.
          </p>
        </header>

        <section className={styles.content}>
          <DynamicForm />
        </section>
      </div>
    </main>
  )
}

export default App
