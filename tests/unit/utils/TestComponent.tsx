import { defineComponent, PropType } from 'vue'
import JsonSchemaForm, { Schema, ThemeProvider } from '../../../lib'
import defaultTheme from '../../../lib/theme-default'

// vjsf-theme-default 中 import { ThemeProvider } from 'vue3-jsonschema-form'
// vue3-jsonschema-form

export const themeDefaultProvider = defineComponent({
  name: 'themeDefaultProvider',
  setup(props, { slots }) {
    return () => (
      <ThemeProvider theme={defaultTheme as any}>
        {slots.default && slots.default()}
      </ThemeProvider>
    )
  }
})

export default defineComponent({
  name: 'TestComponent',
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
    return () => (
      <themeDefaultProvider>
        <JsonSchemaForm {...props} />
      </themeDefaultProvider>
    )
  }
})
