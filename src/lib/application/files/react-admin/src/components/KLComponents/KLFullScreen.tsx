import classnames from 'classnames'
import type { FC } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import Icon from '../Icon'

interface KLFullScreenProps {
  content: string
}

export const KLFullScreen: FC<KLFullScreenProps> = ({ content }) => {
  const handle = useFullScreenHandle()

  return content ? (
    <FullScreen
      handle={handle}
      className={classnames('bg-white', handle.active ? 'p-8' : 'p-3')}
    >
      <div className="relative">
        <div
          className={classnames(
            'overflow-auto',
            handle.active ? 'max-h-[95vh]' : 'max-h-30'
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <Icon
          onClick={handle.active ? handle.exit : handle.enter}
          name={handle.active ? 'FullscreenExitOutlined' : 'FullscreenOutlined'}
          className="cursor-pointer -top-2 -right-2 absolute"
        />
      </div>
    </FullScreen>
  ) : null
}
