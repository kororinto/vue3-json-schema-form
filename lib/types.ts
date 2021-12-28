import { PropType } from 'vue'

export enum SchemaTypes {
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean'
}
type SchemaRef = { $ref: string }

// Schame type
export interface Schema {
  name?: string
  type: SchemaTypes | string
  const?: any
  format?: any
  properties?: {
    [key: string]: Schema | { $ref: string }
  }
  item?: Schema | Schema[] | SchemaRef
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]
  // vjsf?: VueJsonSchemaConfig
  required?: string[]
}

export const FieldPropsDefine = {
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
} as const
