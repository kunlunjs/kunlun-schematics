import type { FC } from 'react'
import { KLForm } from '../KLComponents'

interface KLFormFactoryProps {}

const KLFormFactory: FC<KLFormFactoryProps> = () => {
  return <KLForm itemValues={[]} />
}

export default KLFormFactory
