import { PropType } from 'vue'
import { defineComponent } from 'vue'
import NumberField from './fields/NumberField'
import StringField from './fields/StringField'
import { Schema, SchemaTypes, FieldPropsDefine } from './types'

export default defineComponent({
  name: 'SchamaItem',
  props: FieldPropsDefine,
  setup(props) {
    return () => {
      const { schema } = props
      // TODO: 如果type没有指定，需要猜测type
      const type = schema.type
      let Component: any
      switch (type) {
        case SchemaTypes.STRING:
          Component = StringField
          break
        case SchemaTypes.NUMBER:
          Component = NumberField
          break
        default:
          console.warn(`${type} is not supported`)
          break
      }
      return <Component {...props} />
    }
  }
})
