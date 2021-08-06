/* 全局通信总线 */
import Vue from 'vue'

export default new Vue()

// a => b

// b 注册通信事件
// import globalBus from '...'
// globalBus.$on('自定义事件名称',(data) => {
//  // 处理函数
// })

// a 发布通信事件
// import globalBus from '...'
// globalBus.$emit('自定义事件名称',可选的数据)
