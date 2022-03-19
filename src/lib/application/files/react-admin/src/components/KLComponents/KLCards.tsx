import { Random } from 'mockjs'
import type { FC } from 'react'

interface KLCardProps {
  // TODO
  // 卡片样式：上图下字、下图上字、左图由字、右图左字
  // 是否纯图
  // 图是否圆形
  // 图上是否有字
  // 配图的字有几行、分别的样式
}

export const KLCard: FC<KLCardProps> = () => {
  return (
    <div className="rounded-sm flex flex-col bg-gray-200 shadow-lg w-full p-2 justify-center items-center">
      <div className="mb-8">
        <img
          className="rounded-full object-center object-cover h-36 w-36"
          src={Random.image('200x200')}
          alt="photo"
        />
      </div>
      <div className="text-center">
        <p className="font-bold text-xl text-white mb-2">Dany Bailey</p>
        <p className="font-normal text-base text-gray-400">Dev Ops</p>
      </div>
    </div>
  )
}

interface KLCardsProps {
  // TODO
  // 每行几个卡片，breakpoint
  // 图右侧、下边间距
}

export const KLCards: FC<KLCardsProps> = () => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(Random.integer(4, 10))].map((i, ix) => (
        <KLCard key={ix} />
      ))}
    </div>
  )
}
