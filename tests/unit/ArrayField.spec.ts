import { mount } from '@vue/test-utils'
import JsonSchemaForm, {
  NumberField,
  StringField,
  ArrayField,
  SelectionWidget
} from '../../lib'

describe('ArrayField', () => {
  it('should render multi-type field', () => {
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: [
            {
              type: 'string'
            },
            {
              type: 'number'
            }
          ]
        },
        value: [],
        onChange: () => {
          null
        }
      }
    })
    const arr = wrapper.findComponent(ArrayField)
    const str = arr.findComponent(StringField)
    const num = arr.findComponent(NumberField)
    expect(str.exists()).toBeTruthy()
    expect(num.exists()).toBeTruthy()
  })
  it('should render single type field', () => {
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        value: ['1', '2'],
        onChange: () => {
          null
        }
      }
    })
    const arr = wrapper.findComponent(ArrayField)
    const strs = arr.findAllComponents(StringField)
    expect(strs.length).toBe(wrapper.props('value').length)
    expect(strs[0].props('value')).toBe(wrapper.props('value')[0])
  })
  it('should render enum type field', () => {
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: {
            type: 'string',
            enum: ['1', '2', '3']
          }
        },
        value: [],
        onChange: () => {
          null
        }
      }
    })
    const arr = wrapper.findComponent(ArrayField)
    const select = arr.findComponent(SelectionWidget)
    expect(select.exists()).toBeTruthy()
  })
})
