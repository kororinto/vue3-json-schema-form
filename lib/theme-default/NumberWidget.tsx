import { CommonWidgetPropsDefine } from '../types'
import { defineComponent } from 'vue'

const NumberWidget = defineComponent({
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any): void => {
      const value = e.target.value
      e.target.value = props.value
      props.onChange(value)
    }
    return () => {
      const value: any = props.value
      return <input type="number" value={value} onInput={handleChange} />
    }
  }
})
export default NumberWidget
