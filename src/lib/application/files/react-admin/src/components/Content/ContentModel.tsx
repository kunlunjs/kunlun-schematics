import type { FC } from 'react'
import { useCallback, useState } from 'react'
import ContentAdd from '../components/ContentAdd'
import Content from './index'

interface ContentModelProps {}

const ContentModel: FC<ContentModelProps> = () => {
  const list = [
    {
      title: '魅力高新1',
      origin: '',
      color: '',
      linkOpen: true,
      link: ''
    },
    {
      title: '魅力高新2',
      origin: '',
      color: '',
      linkOpen: true
    },
    {
      title: '魅力高新3',
      origin: '',
      color: '',
      linkOpen: true
    }
  ]
  const [displayList, setDisplayList] = useState(list)
  const [contentAdd, setContentAdd] = useState(false)
  const deleteFun = useCallback(
    (value: number) => {
      const arr = [...displayList]
      arr.splice(value, 1)
      setDisplayList(arr)
    },
    [displayList]
  )
  const addList = useCallback(
    (value: any) => {
      const arr = [...displayList]
      arr.push(value)
      setDisplayList(arr)
    },
    [displayList]
  )
  const changeContentAdd = useCallback(() => {
    setContentAdd(true)
  }, [contentAdd])
  const setIsModalVisible = () => {
    setContentAdd(false)
  }
  return (
    <div className="relative">
      {displayList.map((item: any, index: number) => (
        <div className="mb-6" key={index}>
          <Content item={item} index={index} ondelete={deleteFun} />
        </div>
      ))}
      <div
        onClick={changeContentAdd}
        className="cursor-pointer bg-hex-B3B3B3 rounded-[4px] text-center w-full"
      >
        新增
      </div>
      <ContentAdd
        visible={contentAdd}
        addList={addList}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  )
}

export default ContentModel
