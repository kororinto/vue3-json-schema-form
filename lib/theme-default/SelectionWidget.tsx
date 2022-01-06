import { defineComponent, ref, watch } from 'vue'
import { SelectionWidgetPropsDefine } from '../types'

const Selection = defineComponent({
  name: 'SelectionWidget',
  props: SelectionWidgetPropsDefine,
  setup(props) {
    const currentValueRef = ref(props.value)
    watch(currentValueRef, (newVal) => {
      if (newVal !== props.value) props.onChange(newVal)
    })
    watch(
      () => props.value,
      (val) => {
        if (val !== currentValueRef.value) {
          currentValueRef.value = val
        }
      }
    )
    return () => {
      const { options } = props
      return (
        <select multiple v-model={currentValueRef.value}>
          {options.map((item) => (
            <option value={item.value}>{item.key}</option>
          ))}
        </select>
      )
    }
  }
})
export default Selection
