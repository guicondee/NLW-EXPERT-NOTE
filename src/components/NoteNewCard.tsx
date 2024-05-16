import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

export type NewNoteCardProps = {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NoteNewCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState<boolean>(false)

  const handleStartEditor = () => {
    setShouldShowOnboarding((prev) => !prev)
  }

  const handleContentChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value)
    if (event.target.value === '') {
      setShouldShowOnboarding(true)
    }
  }

  const handleSubmitNote = (event: FormEvent) => {
    event.preventDefault()

    if (content === '') {
      return toast.error('A note deve ter no minimo 10 caracteres!')
    }

    onNoteCreated(content)
    setContent('')
    setShouldShowOnboarding(true)
    toast.success('Nota criada com sucesso!')
  }

  const handleStartRecord = () => {
    const isSpeechRecognitionApiAvailable =
      'speechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionApiAvailable) {
      alert('Infelizmente seu navegador não suporta a API de gravação.')
      return
    }

    setIsRecording(true)
    setShouldShowOnboarding(false)

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }

    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    speechRecognition.start()
  }

  const handleStopRecording = () => {
    setIsRecording(false)

    if (speechRecognition !== null) {
      speechRecognition?.stop()
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="outline-none  focus-visible:ring-2 focus-visible:ring-lime-400 hover:ring-2 hover:ring-slate-600 flex flex-col rounded-md bg-slate-700 p-5 gap-3 text-left">
        <span className="text-sm font-medium text-slate-200">
          Adicionar Nota
        </span>

        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />

        <Dialog.Content className="overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:max-w-[640px] max-w-[380px] w-full h-[40vh] lg:h-[60vh] bg-slate-700 outline-none rounded-md flex flex-col">
          <Dialog.DialogClose className="absolute right-0 top-0 bg-slate-800 p-[6px] text-slate-400">
            <X className="size-5 hover:text-slate-100" />
          </Dialog.DialogClose>

          <form action="" className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className=" text-sm text-slate-300">Adicionar nota</span>

              {shouldShowOnboarding ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{' '}
                  <button
                    type="button"
                    onClick={handleStartRecord}
                    className="hover:underline font-medium text-lime-400"
                  >
                    gravando uma nota
                  </button>{' '}
                  em áudio ou se preferir{' '}
                  <button
                    type="button"
                    onClick={handleStartEditor}
                    className="hover:underline font-medium text-lime-400"
                  >
                    utilize apenas texto.
                  </button>
                </p>
              ) : (
                <textarea
                  value={content}
                  onChange={(event) => {
                    handleContentChanged(event)
                  }}
                  autoFocus
                  className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                />
              )}
            </div>

            {isRecording ? (
              <button
                onClick={handleStopRecording}
                type="button"
                className="w-full flex items-center justify-center gap-2  bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-semibold hover:text-slate-100"
              >
                <div className="size-2 rounded-full bg-red-500 animate-pulse" />
                Gravando! (clique p/ interromper)
              </button>
            ) : (
              <button
                onClick={handleSubmitNote}
                type="button"
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-semibold hover:bg-lime-500"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
