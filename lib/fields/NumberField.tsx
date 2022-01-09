import { Schema, FieldPropsDefine, CommonWidgetNames } from '../types'
import { defineComponent, PropType } from 'vue'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'NumberField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (v: string): void => {
      // const value = e.target.value
      const num = Number(v)
      if (isNaN(num)) {
        props.onChange(undefined)
      } else {
        props.onChange(num)
      }
    }
    const NumberWidgetRef = getWidget(CommonWidgetNames.NumberWidget)
    return () => {
      // const value: any = props.value
      // return <input type="number" value={value} onInput={handleChange} />
      const NumberWidget = NumberWidgetRef.value
      const { schema, rootSchema, onChange, ...rest } = props
      return <NumberWidget {...rest} onChange={handleChange} />
    }
  }
})
