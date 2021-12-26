import { defineComponent, h, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const img = require('./assets/logo.png') // eslint-disable-line
export default defineComponent({
  setup() {
    const numRef = ref(1)
    const num2Ref = ref(1)
    setInterval(() => {
      numRef.value++
    }, 500)
    setInterval(() => {
      num2Ref.value++
    }, 500)
    return () => {
      return h(
        <div id="test">
          <img alt="Vue logo" src={img} />
          <p>{numRef.value + '' + num2Ref.value}</p>
          <HelloWorld txt={'dx'}></HelloWorld>
        </div>
      )
    }
  }
})
