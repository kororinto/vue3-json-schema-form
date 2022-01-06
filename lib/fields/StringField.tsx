import { defineComponent, PropType } from 'vue'
import { Schema, CommonWidgetNames, FieldPropsDefine } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (v: string): void => {
      props.onChange(v)
    }
    // return () => {
    //   const value: any = props.value
    //   return <input type="text" value={value} onInput={handleChange} />
    // }
    const TextWidgetRef = getWidget(CommonWidgetNames.TextWidget)
    return () => {
      const { schema, rootSchema, onChange, ...rest } = props
      const TextWidget = TextWidgetRef.value
      // 重名函数会自动执行mergeProps合并成数组 应在babel里关掉改配置
      return <TextWidget {...rest} onChange={handleChange} />
    }
  }
})
