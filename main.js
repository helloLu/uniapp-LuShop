import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'
import AV from 'leancloud-storage'
Vue.prototype.$av = AV
Vue.prototype.$user =  AV.User

AV.init({
  appId: "MD9wcc6i82gMmuxKSf0CSEHE-gzGzoHsz",
  appKey: "wiqYfGiKgp9X2WfoA97tFthU",
  serverURL: "https://md9wcc6i.lc-cn-n1-shared.com"
});

const app = new Vue({
    ...App
})

app.$mount()
