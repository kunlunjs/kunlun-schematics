import * as Icons1 from '@ant-design/icons'

import { Col, message, Row, Tabs } from 'antd'
import Search from 'antd/lib/input/Search'
import type { FC } from 'react'
import { createElement } from 'react'
import { useState } from 'react'
import type { IconKey } from '@/utils'
import obj from '@/utils/icondata'
import './index.less'

interface IconsProps {}
const IconManagement: FC<IconsProps> = () => {
  const [searchtext, setSearchText] = useState()
  const { TabPane } = Tabs
  const [noSearch, setNoSearch] = useState(true)
  const [iconName, setIconName] = useState()
  const [valueobj, setValueObj] = useState()
  const success = (val: any) => {
    message.success('copied!')
    setIconName(val)
    console.log(val)
  }

  // const onsearch = (value: any) => {
  //   console.log(value)

  //   setNoSearch(false)
  //   const res = {}
  //   console.log('icon')
  //   Object.keys(obj).map((key: IconKey, index: number) => {
  //     const arr = obj[key].filter((val: string, index: any) => {
  //       if (searchtext) {
  //         return val.includes(searchtext)
  //       }
  //     })

  //     if (arr.length) {
  //       res[key] = arr
  //     }
  //   })
  //   setValueObj(res)
  // }

  return (
    <div className="container-box">
      <div className="search-box">
        <div className="w-100% modal-search">
          <Search
            placeholder="点此可搜素图标"
            // onSearch={onSearch}
            style={{ width: 904, height: 50 }}
            className="text-left"
            value={searchtext}
            onChange={(event: { target: { value: any } }) => {
              const res = {}
              if (!event.target.value) {
                setNoSearch(true)
              } else {
                // onsearch(event.)
                // debounce(onsearch, 500)
                setNoSearch(false)
                Object.keys(obj).map((key: IconKey, index: number) => {
                  const arr = obj[key].filter((val: string, index: any) => {
                    if (event.target.value) {
                      return val.includes(event.target.value)
                    }
                  })

                  if (arr.length) {
                    res[key] = arr
                  }
                })
                setValueObj(res)
              }

              return setSearchText(event.target.value)
            }}
          />
        </div>
        <Tabs defaultActiveKey="1">
          {noSearch
            ? Object.keys(obj).map((val: any, index: number) => (
                <TabPane tab={val} key={index}>
                  <Row>
                    {obj[val].map((value: string, j: any) => (
                      <Col span={6} key={j} xl={{ span: 3 }}>
                        <span className="flex h-100px z-999 items-center  justify-center change-icon ">
                          <span
                            className="cursor-pointer  text-center pt-10px pr-16px pb-10px
                        pl-10px  change-icon inline-block  width-90px"
                            onClick={() => {
                              success(value)
                            }}
                          >
                            {createElement(Icons1[value], {
                              style: { fontSize: '31px' }
                            })}
                            {value && (
                              <div className="flex text-base justify-center">
                                {value}
                              </div>
                            )}
                          </span>
                        </span>
                      </Col>
                    ))}
                  </Row>
                </TabPane>
              ))
            : Object.keys(valueobj).map((val: any, index: number) => (
                <TabPane tab={val} key={index}>
                  <Row>
                    {searchtext &&
                      valueobj[val].map((item: string, j: any) => (
                        <Col key={j} span={6} xl={{ span: 4 }}>
                          <span
                            key={j}
                            className="flex  items-center  justify-center change-icon"
                          >
                            <span
                              className="cursor-pointer pt-10px pr-16px pb-10px
                           pl-10px change-icon inline-block width-90px"
                              onClick={() => {
                                success
                                console.log(item, 111111)
                              }}
                            >
                              {createElement(Icons1[item], {
                                style: { fontSize: '31px' }
                              })}
                              {item && (
                                <div className="flex text-base justify-center">
                                  {item}
                                </div>
                              )}
                            </span>
                          </span>
                        </Col>
                      ))}
                  </Row>
                </TabPane>
              ))}
        </Tabs>
      </div>
    </div>
  )
}

export default IconManagement
