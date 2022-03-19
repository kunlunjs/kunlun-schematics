import type { FC } from 'react'
import KLTableFactory from '@/components/KLRenderFactory/KLTableFactory'
import type { FieldsProps } from './components/Fields'
import { Fields } from './components/Fields'

interface TablesProps {}

const Tables: FC<TablesProps> = () => {
  return (
    <div>
      <KLTableFactory
        model="TableModel"
        rowSelectionType="radio"
        footer={(props: FieldsProps) => {
          return props.selectedRow ? <Fields {...props} /> : null
        }}
      />
    </div>
  )
}

export default Tables
