import { DefineComponent, defineComponent, inject } from 'vue'
import { FieldPropsDefine, CommonFieldType } from '../types'
import SchemaItem from '../SchemaItem'
import { SchemaFormContextKey, useVJSFContext } from '../context'
import { isObject } from '../utils'

// const schema = {
//   type: 'object',
//   properties: {
//     name: {
//       type: 'string'
//     },
//     age: {
//       type: 'number'
//     }
//   }
// }

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext()
    const handleObjectFieldChange = (k: string, v: any) => {
      const value: any = isObject(props.value) ? props.value : {}
      if (v === undefined) {
        delete value[k]
      } else {
        value[k] = v
      }
      props.onChange(value)
    }
    return () => {
      const { schema, rootSchema, value } = props
      const properties = schema.properties || {}
      const { SchemaItem } = context
      const currentValue: any = isObject(value) ? value : {}
      return Object.keys(properties).map((k: string, i: number) => {
        return (
          <SchemaItem
            schema={properties[k]}
            rootSchema={rootSchema}
            value={currentValue[k]}
            key={i}
            onChange={(v: any) => handleObjectFieldChange(k, v)}
          />
        )
      })
    }
  }
})
