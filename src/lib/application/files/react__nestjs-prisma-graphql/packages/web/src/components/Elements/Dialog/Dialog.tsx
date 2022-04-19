import { Dialog as UIDialog, Transition } from '@headlessui/react'
import 'intersection-observer'
import type { MutableRefObject, ReactNode } from 'react'
import { Fragment } from 'react'

type DialogProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  initialFocus?: MutableRefObject<null>
}

export const DialogTitle = UIDialog.Title

export const DialogDescription = UIDialog.Description

export const Dialog = ({
  isOpen,
  onClose,
  children,
  initialFocus
}: DialogProps) => {
  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <UIDialog
          as="div"
          static
          className="fixed inset-0 z-10 overflow-y-auto"
          open={isOpen}
          onClose={onClose}
          initialFocus={initialFocus}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <UIDialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              {children}
            </Transition.Child>
          </div>
        </UIDialog>
      </Transition.Root>
    </>
  )
}
