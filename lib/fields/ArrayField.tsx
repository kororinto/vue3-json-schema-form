import { defineComponent, PropType } from 'vue'
import { useVJSFContext } from '../context'
import { FieldPropsDefine, CommonFieldType, Schema } from '../types'
import { createUseStyles } from 'vue-jss'
import SelectionWidget from '../widgets/Selection'

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

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee'
  },
  actions: {
    background: '#eee',
    padding: 10,
    textAlign: 'right',
    '&>button': {
      marginLeft: 10
    }
  },
  content: {
    padding: 10
  }
})
const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props, { slots }) {
    const classesRef = useStyles()
    const handleAdd = () => props.onAdd(props.index)
    const handleDelete = () => props.onDelete(props.index)
    const handleUp = () => props.onUp(props.index)
    const handleDown = () => props.onDown(props.index)
    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button onClick={handleAdd}>新增</button>
            <button onClick={handleDelete}>删除</button>
            <button onClick={handleUp}>上移</button>
            <button onClick={handleDown}>下移</button>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
        </div>
      )
    }
  }
})

export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props) {
    const context = useVJSFContext()
    const handleArrayFieldChange = (v: string, i: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[i] = v
      props.onChange(arr)
    }
    const handleAdd = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index + 1, 0, undefined)
      props.onChange(arr)
    }
    const handleDelete = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index, 1)
      props.onChange(arr)
    }
    const handleUp = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      const item = arr.splice(index, 1)
      arr.splice(index - 1, 0, item[0])
      props.onChange(arr)
    }
    const handleDown = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      const item = arr.splice(index, 1)
      arr.splice(index + 1, 0, item[0])
      props.onChange(arr)
    }
    return () => {
      const SchemaItem: CommonFieldType = context.SchemaItem
      const { schema, rootSchema, value } = props
      const isMutiType = Array.isArray(schema.items)
      const isSelect = schema.items && (schema.items as any).enum
      if (isMutiType) {
        const items: Schema[] = schema.items as any
        const arr = Array.isArray(value) ? value : []
        return items.map((k: Schema, i: number) => (
          <SchemaItem
            key={i}
            schema={k}
            rootSchema={rootSchema}
            value={arr[i]}
            onChange={(v: any) => handleArrayFieldChange(v, i)}
          />
        ))
      } else if (!isSelect) {
        const arr = Array.isArray(value) ? value : []
        return arr.map((k: Schema, i: number) => (
          <ArrayItemWrapper
            index={i}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onUp={handleUp}
            onDown={handleDown}
          >
            <SchemaItem
              key={i}
              schema={schema.items as Schema}
              rootSchema={rootSchema}
              value={k}
              onChange={(v: any) => handleArrayFieldChange(v, i)}
            />
          </ArrayItemWrapper>
        ))
      } else {
        const enumOptions = (schema as any).items.enum
        const options = enumOptions.map((e: any) => {
          return { key: e, value: e }
        })
        return (
          <SelectionWidget
            onChange={props.onChange}
            value={props.value}
            options={options}
          />
        )
      }
    }
  }
})
