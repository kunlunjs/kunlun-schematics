import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  UserIcon,
  FolderIcon,
  HomeIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon
} from '@heroicons/react/outline'
import clsx from 'clsx'
import type { Dispatch, ReactNode, SetStateAction, SVGProps } from 'react'
import { Fragment, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { useAuth } from '../../lib/auth'
import { useAuthorization, ROLES } from '../../lib/authorization'

type SideNavigationItem = {
  name: string
  to: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

const SideNavigation = () => {
  const { checkAccess } = useAuthorization()
  const navigation = [
    { name: 'Dashboard', to: '.', icon: HomeIcon },
    { name: 'Discussions', to: './discussions', icon: FolderIcon },
    checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
      name: 'Users',
      to: './users',
      icon: UsersIcon
    }
  ].filter(Boolean) as SideNavigationItem[]

  return (
    <>
      {navigation.map((item, index) => (
        <NavLink
          end={index === 0}
          key={item.name}
          to={item.to}
          className={clsx(
            'text-gray-300 hover:bg-gray-700 hover:text-white',
            'group flex items-center rounded-md px-2 py-2 text-base font-medium'
          )}
          // @ts-ignore
          activeClassName="bg-gray-900 text-white"
        >
          <item.icon
            className={clsx(
              'text-gray-400 group-hover:text-gray-300',
              'mr-4 h-6 w-6 flex-shrink-0'
            )}
            aria-hidden="true"
          />
          {item.name}
        </NavLink>
      ))}
    </>
  )
}

type UserNavigationItem = {
  name: string
  to: string
  onClick?: () => void
}

const UserNavigation = () => {
  const { logout } = useAuth()

  const userNavigation = [
    { name: 'Your Profile', to: './profile' },
    {
      name: 'Sign out',
      to: '',
      onClick: () => {
        logout()
      }
    }
  ].filter(Boolean) as UserNavigationItem[]

  return (
    <Menu as="div" className="relative ml-3">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="flex  max-w-xs items-center rounded-full bg-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="sr-only">Open user menu</span>
              <UserIcon className="h-8 w-8 rounded-full" />
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {userNavigation.map(item => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      onClick={item.onClick}
                      to={item.to}
                      className={clsx(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

type MobileSidebarProps = {
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

const MobileSidebar = ({ sidebarOpen, setSidebarOpen }: MobileSidebarProps) => {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 z-40 flex md:hidden"
        open={sidebarOpen}
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex flex-shrink-0 items-center px-4">
              <Logo />
            </div>
            <div className="mt-5 h-0 flex-1 overflow-y-auto">
              <nav className="space-y-1 px-2">
                <SideNavigation />
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className="w-14 flex-shrink-0" aria-hidden="true"></div>
      </Dialog>
    </Transition.Root>
  )
}

const Sidebar = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex w-64 flex-col">
        <div className="flex h-0 flex-1 flex-col">
          <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
            <Logo />
          </div>
          <div className="flex flex-1 flex-col overflow-y-auto">
            <nav className="flex-1 space-y-1 bg-gray-800 px-2 py-4">
              <SideNavigation />
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

const Logo = () => {
  return (
    <Link className="flex items-center text-white" to=".">
      <img className="h-8 w-auto" src={logo} alt="Workflow" />
      <span className="text-xl font-semibold text-white">
        Bulletproof React
      </span>
    </Link>
  )
}

type MainLayoutProps = {
  children: ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Sidebar />
      <div className="flex w-0 flex-1 flex-col overflow-hidden">
        <div className="relative z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-end px-4">
            <div className="ml-4 flex items-center md:ml-6">
              <UserNavigation />
            </div>
          </div>
        </div>
        <main className="relative flex-1 overflow-y-auto focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  )
}
