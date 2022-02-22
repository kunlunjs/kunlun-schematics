import Link from 'next/link'
import type { FC, ReactNode } from 'react'
import { AppConfig } from '@/utils/AppConfig'

type IMainProps = {
  meta: ReactNode
}

export const Main: FC<IMainProps> = ({ meta, children }) => (
  <div className="px-1 w-full antialiased text-gray-700">
    {meta}

    <div className="mx-auto max-w-screen-md">
      <div className="border-b border-gray-300">
        <div className="pt-16 pb-8">
          <div className="text-3xl font-bold text-gray-900">
            {AppConfig.title}
          </div>
          <div className="text-xl">{AppConfig.description}</div>
        </div>
        <div>
          <ul className="flex flex-wrap text-xl">
            <li className="mr-6">
              <Link href="/">
                <a className="text-gray-700 hover:text-gray-900 border-none">
                  Home
                </a>
              </Link>
            </li>
            <li className="mr-6">
              <Link href="/about/">
                <a className="text-gray-700 hover:text-gray-900 border-none">
                  About
                </a>
              </Link>
            </li>
            <li className="mr-6">
              <a
                className="text-gray-700 hover:text-gray-900 border-none"
                href="https://github.com/turing-fe/kunlun-schematics//Users/turing/kunlun-schematics/src/lib/application/files/nextjs/README.md"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="py-5 text-xl content">{children}</div>

      <div className="py-8 text-sm text-center border-t border-gray-300">
        © Copyright {new Date().getFullYear()} {AppConfig.title}. Powered with{' '}
        <span role="img" aria-label="Love">
          ♥
        </span>{' '}
        by <a href="https://creativedesignsguru.com">CreativeDesignsGuru</a>
        {/*
         * PLEASE READ THIS SECTION
         * We'll really appreciate if you could have a link to our website
         * The link doesn't need to appear on every pages, one link on one page is enough.
         * Thank you for your support it'll mean a lot for us.
         */}
      </div>
    </div>
  </div>
)
