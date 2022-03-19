import type {
  Menu,
  Checkbox,
  Form,
  Input,
  Select,
  Table,
  InputNumber,
  Badge,
  Progress,
  Button,
  Typography,
  Divider,
  Slider,
  Layout,
  Space,
  Affix,
  Breadcrumb,
  Dropdown,
  PageHeader,
  Pagination,
  Steps,
  AutoComplete,
  Cascader,
  DatePicker,
  Radio,
  Rate,
  Switch,
  TimePicker,
  Transfer,
  Upload,
  Avatar,
  Calendar,
  Carousel,
  Collapse,
  Descriptions,
  Mentions,
  TreeSelect,
  Comment,
  Empty,
  Image,
  Popover,
  Statistic,
  Tabs,
  Timeline,
  Alert,
  Drawer,
  Modal,
  Popconfirm,
  Result,
  Skeleton,
  Spin,
  Tree,
  List,
  Tag,
  Tooltip,
  Card
} from 'antd'
import type { ComponentProps } from 'react'

/* ---------------- 通用 ---------------- */
export type ButtonProps = ComponentProps<typeof Button>
export type TypographyProps = ComponentProps<typeof Typography>
/* ---------------- 布局 ---------------- */
export type DividerProps = ComponentProps<typeof Divider>
// export type GridProps = ComponentProps<typeof Grid>
export type LayoutProps = ComponentProps<typeof Layout>
export type SpaceProps = ComponentProps<typeof Space>
/* ---------------- 导航 ---------------- */
export type AffixProps = ComponentProps<typeof Affix>
export type BreadcrumbProps = ComponentProps<typeof Breadcrumb>
export type DropdownProps = ComponentProps<typeof Dropdown>
export type MenuProps = ComponentProps<typeof Menu>
export type PageHeaderProps = ComponentProps<typeof PageHeader>
export type PaginationProps = ComponentProps<typeof Pagination>
export type StepsProps = ComponentProps<typeof Steps>
/* ---------------- 数据录入 ---------------- */
export type AutoCompleteProps = ComponentProps<typeof AutoComplete>
export type CascaderProps = ComponentProps<typeof Cascader>
export type CheckboxProps = ComponentProps<typeof Checkbox>
export type CheckboxOptionsProps = ComponentProps<
  typeof Checkbox.Group
>['options']
export type DatePickerProps = ComponentProps<typeof DatePicker>
export type FormProps = ComponentProps<typeof Form>
export type FormListProps = ComponentProps<typeof Form.List>
export type FormItemProps = ComponentProps<typeof Form.Item>
export type InputProps = ComponentProps<typeof Input>
export type InputTextAreaProps = ComponentProps<typeof Input.TextArea>
export type PasswordProps = ComponentProps<typeof Input.Password>
export type InputSearchProps = ComponentProps<typeof Input.Search>
export type InputNumberProps = ComponentProps<typeof InputNumber>
export type MentionsProps = ComponentProps<typeof Mentions>
export type RadioProps = ComponentProps<typeof Radio>
export type RadioGroupProps = ComponentProps<typeof Radio.Group>
export type RadioButtonProps = ComponentProps<typeof Radio.Button>
export type RateProps = ComponentProps<typeof Rate>
export type SelectProps = ComponentProps<typeof Select>
export type SelectOptionProps = ComponentProps<typeof Select.Option>
export type SliderProps = ComponentProps<typeof Slider>
export type SwitchProps = ComponentProps<typeof Switch>
export type TimePickerProps = ComponentProps<typeof TimePicker>
export type TransferProps = ComponentProps<typeof Transfer>
export type TreeSelectProps = ComponentProps<typeof TreeSelect>
export type UploadProps = ComponentProps<typeof Upload>
/* ---------------- 数据展示 ---------------- */
export type AvatarProps = ComponentProps<typeof Avatar>
export type BadgeProps = ComponentProps<typeof Badge>
export type CalendarProps = ComponentProps<typeof Calendar>
export type CardProps = ComponentProps<typeof Card>
export type CarouselProps = ComponentProps<typeof Carousel>
export type CollapseProps = ComponentProps<typeof Collapse>
export type CommentProps = ComponentProps<typeof Comment>
export type DescriptionsProps = ComponentProps<typeof Descriptions>
export type EmptyProps = ComponentProps<typeof Empty>
export type ImageProps = ComponentProps<typeof Image>
export type ListProps = ComponentProps<typeof List>
export type PopoverProps = ComponentProps<typeof Popover>
export type StatisticProps = ComponentProps<typeof Statistic>
export type TableProps = ComponentProps<typeof Table>
export type TabsProps = ComponentProps<typeof Tabs>
export type TagProps = ComponentProps<typeof Tag>
export type TimelineProps = ComponentProps<typeof Timeline>
export type TooltipProps = ComponentProps<typeof Tooltip>
export type TreeProps = ComponentProps<typeof Tree>
/* ---------------- 反馈 ---------------- */
export type AlertProps = ComponentProps<typeof Alert>
export type DrawerProps = ComponentProps<typeof Drawer>
export type ModalProps = ComponentProps<typeof Modal>
export type PopconfirmProps = ComponentProps<typeof Popconfirm>
export type ProgressProps = ComponentProps<typeof Progress>
export type ResultProps = ComponentProps<typeof Result>
export type SkeletonProps = ComponentProps<typeof Skeleton>
export type SpinProps = ComponentProps<typeof Spin>

export const klComponents = [
  'Button',
  'Typography',
  'Divider',
  'Layout',
  'Space',
  'Affix',
  'Breadcrumb',
  'Dropdown',
  'Menu',
  'PageHeader',
  'Pagination',
  'Steps',
  'AutoComplete',
  'Cascader',
  'Checkbox',
  'DatePicker',
  'Form',
  'Input',
  'InputNumber',
  'Mentions',
  'Radio',
  'Rate',
  'Select',
  'Slider',
  'Switch',
  'TimePicker',
  'Transfer',
  'Upload',
  'Avatar',
  'Badge',
  'Calendar',
  'Card',
  'Carousel',
  'Collapse',
  'Comment',
  'Descriptions',
  'Empty',
  'Image',
  'List',
  'Popover',
  'Statistic',
  'Table',
  'Tabs',
  'Tag',
  'Timeline',
  'Tooltip',
  'Tree',
  'Alert',
  'Drawer',
  'Modal',
  'Popconfirm',
  'Progress',
  'Result',
  'Skeleton',
  'Spin',
  'Anchor',
  'BackTop',
  'PictureSelect',
  'BGSetting',
  'LinkSelect',
  'TextSetting'
  // TODO 扩充我们自己的组件类型
] as const

export type KLComponentType = typeof klComponents[number]

// antd Table columns 属性类型
// export type TableColumnProps = Required<TKLComponentProps<'Table'>['columns']>
