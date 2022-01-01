import { PropType, ref, watch } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SelectionWidget',
  props: {
    value: {},
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    },
    options: {
      type: Array as PropType<{ key: string; value: any }[]>,
      required: true
    }
  },
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
