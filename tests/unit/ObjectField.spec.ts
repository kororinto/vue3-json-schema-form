import { mount } from '@vue/test-utils'
import JsonSchemaForm, { NumberField, StringField } from '../../lib'

describe('ObjectField', () => {
  let schema: any
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        }
      }
    }
  })
  it('should render properties to correct field', async () => {
    let value: any = {}
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    const numberField = wrapper.findComponent(NumberField)
    const stringField = wrapper.findComponent(StringField)
    await stringField.props('onChange')('1')
    expect(value.name).toBe('1')
    await numberField.props('onChange')(1)
    expect(value.age).toBe(1)
    // expect(numberField.exists()).toBeTruthy()
    // expect(stringField.exists()).toBeTruthy()
  })
  it('should not render field when value is undefined', async () => {
    let value: any = {}
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema,
        value,
        onChange: (v: any) => {
          value = v
        }
      }
    })
    // const numberField = wrapper.findComponent(NumberField)
    const stringField = wrapper.findComponent(StringField)
    await stringField.props('onChange')(undefined)
    expect(value.name).toBeUndefined()
    // await numberField.props('onChange')(1)
    // expect(value.age).toBe(1)
    // expect(numberField.exists()).toBeTruthy()
    // expect(stringField.exists()).toBeTruthy()
  })
})
