import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

export type NoteCardProps = {
  note: {
    id: string
    date: Date
    content: string
  }
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger className="flex flex-col text-left p-5 rounded-md bg-slate-800 gap-3 outline-none overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
          <span className=" text-sm text-slate-300">
            {formatDistanceToNow(note.date, {
              locale: ptBR,
              addSuffix: true,
            })}
          </span>

          <p className="text-sm leading-6 text-slate-400">{note.content}</p>

          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="inset-0 fixed bg-black/50" />
          <Dialog.Content className="overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 outline-none rounded-md flex flex-col">
            <Dialog.DialogClose className="absolute right-0 top-0 bg-slate-800 p-[6px] text-slate-400">
              <X className="size-5 hover:text-slate-100" />
            </Dialog.DialogClose>

            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className=" text-sm text-slate-300">
                {formatDistanceToNow(note.date, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </span>

              <p className="text-sm leading-6 text-slate-400">{note.content}</p>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
            >
              Deseja{' '}
              <span className="text-red-400 group-hover:underline">
                apagar essa nota
              </span>
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
