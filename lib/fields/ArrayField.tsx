import { defineComponent } from 'vue'
import { useVJSFContext } from '../context'
import { FieldPropsDefine } from '../types'

// ------------type1：
// {
//   items: { type: 'string' }
// }
// ------------type2:
// {
//   items: [
//     {
//       type: 'string'
//     },
//     {
//       type: 'number'
//     }
//   ]
// }
// ------------type3:
// {
//   items: {
//     type: 'string',
//     enum: ['1', '2']
//   }
// }

export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup() {
    return () => {
      const context = useVJSFContext()
      const SchemaItem = context.SchemaItem
    }
  }
})
