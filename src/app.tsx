import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NoteCard } from './components/NoteCard'
import { NoteNewCard } from './components/NoteNewCard'

interface note {
  id: string
  date: Date
  content: string
}
export function App() {
  const [search, setSearch] = useState('')

  const [notes, setNotes] = useState<note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }
    return []
  })

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  const handleSearchNotes = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setSearch(query)
  }

  const onRemoveNote = (id: string) => {
    const notesArray = notes.filter((note) => note.id !== id)
    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  const filteredNotes =
    search !== ''
      ? notes.filter((value) =>
          value.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 lg:px-0 md:px-5 px-5">
      <img src={logo} alt="nlw expert" />

      <form className="w-full">
        <input
          onChange={handleSearchNotes}
          className="outline-none w-full bg-transparent text-2xl md:text-3xl lg:text-3xl font-semibold tracking-tighter placeholder:text-slate-500" //propiedade tracking-thiger perfeita para ajustar font
          type="text"
          placeholder="Busque em suas notas..."
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-cols-1 auto-rows-[250px] ">
        <NoteNewCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map((value) => (
          <NoteCard
            key={value.id}
            note={{
              id: value.id,
              content: value.content,
              date: value.date,
            }}
            onRemoveNote={onRemoveNote}
          />
        ))}
      </div>
    </div>
  )
}
