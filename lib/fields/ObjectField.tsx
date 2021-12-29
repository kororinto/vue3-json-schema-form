import { defineComponent } from 'vue'
import { FieldPropsDefine } from '../types'
import SchemaItem from '../SchemaItem'

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
  setup() {
    return () => {
      return <div>Object Field</div>
    }
  }
})
