import { Schema } from '../types'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'NumberField',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    }
  },
  setup(props) {
    const handleChange = (e: any): void => {
      const value = e.target.value
      const num = Number(value)
      if (isNaN(num)) {
        props.onChange(undefined)
      } else {
        props.onChange(num)
      }
    }
    return () => {
      const value: any = props.value
      return <input type="number" value={value} onInput={handleChange} />
    }
  }
})
