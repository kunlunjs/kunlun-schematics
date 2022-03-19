import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons'

interface PanelHeaderProps {
  name: string
  onCreate: () => void
  onRemove: (index: number) => void
}

const PanelHeader = ({ name, onCreate, onRemove }: PanelHeaderProps) => {
  const arrayMatched = name.match(/\.(\d+)\./)
  const index = arrayMatched ? Number(arrayMatched[1]) : null

  const _onCreate = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCreate()
  }

  const _onRemove = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    onRemove(index)
  }

  return arrayMatched ? (
    <>
      <PlusCircleOutlined onClick={_onCreate} />
      {index !== 0 && (
        <DeleteOutlined
          className="text-red-400"
          onClick={e => _onRemove(e, index!)}
        />
      )}
    </>
  ) : (
    <div />
  )
}

export default PanelHeader
