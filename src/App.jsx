
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem('taskflow-tasks')

  if (savedTasks) {
    try {
      return JSON.parse(savedTasks)
    } catch {
      return []
    }
  }

  return [
    { id: 1, title: 'TaskFlow projesini oluştur', completed: true, priority: 'Yüksek' },
    { id: 2, title: 'Dashboard tasarımını tamamla', completed: false, priority: 'Orta' },
    { id: 3, title: 'Görev ekleme özelliğini geliştir', completed: false, priority: 'Yüksek' },
  ]
})
const [newTask, setNewTask] = useState('')
const [filter, setFilter] = useState('all')
  useEffect(() => {
  localStorage.setItem('taskflow-tasks', JSON.stringify(tasks))
}, [tasks])

  function addTask(e) {
    e.preventDefault()
    if (!newTask.trim()) return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTask.trim(),
        completed: false,
        priority: 'Orta',
      },
    ])
    setNewTask('')
  }

function editTask(id) {
  const task = tasks.find(task => task.id === id)
  if (!task) return

  const updatedTitle = window.prompt('Görev başlığını düzenle:', task.title)

  if (updatedTitle === null || !updatedTitle.trim()) return

  setTasks(tasks.map(task =>
    task.id === id
      ? { ...task, title: updatedTitle.trim() }
      : task
  ))
}

  function toggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const completedCount = tasks.filter(task => task.completed).length
const filteredTasks = tasks.filter(task => {
  if (filter === 'completed') return task.completed
  if (filter === 'active') return !task.completed
  return true
})
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><span className="brand-icon">T</span> TaskFlow</div>

        <p className="menu-label">MENÜ</p>
        
<button
  className={`nav-item ${filter === 'all' ? 'active' : ''}`}
  onClick={() => setFilter('all')}
>
  ▦ <span>Görevlerim</span>
</button>

<button
  className={`nav-item ${filter === 'active' ? 'active' : ''}`}
  onClick={() => setFilter('active')}
>
  ◷ <span>Devam Edenler</span>
</button>

<button
  className={`nav-item ${filter === 'completed' ? 'active' : ''}`}
  onClick={() => setFilter('completed')}
>
  ✓ <span>Tamamlananlar</span>
</button>


        <div className="sidebar-bottom">
          <div className="avatar">D</div>
          <div><strong>Benim çalışma alanım</strong><small>Kişisel alan</small></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span>Çalışma alanım / Görevler</span>
          <span className="date-label">{new Date().toLocaleDateString('tr-TR')}</span>
        </header>

        <section className="welcome">
          <p className="eyebrow">GÖREV PANELİ</p>
          <h1>Merhaba! 👋</h1>
          <p className="subtitle">Küçük adımlar, büyük sonuçlar. Bugün neler yapacaksın?</p>
        </section>

        <section className="stats">
          <article className="stat-card">
            <span className="stat-icon purple">▦</span>
            <p>Toplam görev</p>
            <h2>{tasks.length}</h2>
          </article>
          <article className="stat-card">
            <span className="stat-icon green">✓</span>
            <p>Tamamlanan</p>
            <h2>{completedCount}</h2>
          </article>
          <article className="stat-card">
            <span className="stat-icon orange">◷</span>
            <p>Devam eden</p>
            <h2>{tasks.length - completedCount}</h2>
          </article>
        </section>

        <section className="tasks-section">
          <div className="section-heading">
            <div>
              <h2>Görevlerim</h2>
              <p>Yapılacak işlerini burada düzenle.</p>
            </div>
            <span className="task-count">{tasks.length} görev</span>
          </div>

          <form className="add-task-form" onSubmit={addTask}>
            <input
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              placeholder="Yeni bir görev yaz..."
              aria-label="Yeni görev"
            />
            <button type="submit" className="add-button">+ Görev ekle</button>
          </form>

          <div className="task-list">
            {filteredTasks.map(task => (
              <article className="task-row" key={task.id}>
                <input
                  className="task-checkbox"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  aria-label={`${task.title} tamamlandı`}
                />
                <div className="task-info">
                  <span className={task.completed ? 'task-title completed' : 'task-title'}>
                    {task.title}
                  </span>
                  <small>{task.completed ? 'Tamamlandı' : 'Devam ediyor'}</small>
                </div>
                <span className={`priority ${task.priority === 'Yüksek' ? 'high' : 'medium'}`}>
                  {task.priority}
                </span>
                

<button
  className="edit-button"
  onClick={() => editTask(task.id)}
  aria-label="Görevi düzenle"
>
  Düzenle
</button>

<button
  className="delete-button"
  onClick={() => deleteTask(task.id)}
  aria-label="Görevi sil"
>
  Sil
</button>

              </article>
            ))}
            {tasks.length === 0 && <p className="empty-state">Henüz görevin yok. İlk görevini ekle!</p>}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
