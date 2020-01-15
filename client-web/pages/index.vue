<template>
  <div>
    <image-list v-if="images.length > 0" :images="images" />
    <div v-else class="container">
      <div v-if="isUserConnected">
        <h2>Bağlantı kuruldu. Artık resim paylaşabilirsiniz ✌🏼</h2>
      </div>
      <div v-else>
        <h2>
          Hoşgeldiniz 👋🏼
          <br />Bağlantı kurmak için aşağıdaki QR kodu okutabilirsiniz 😎
        </h2>
        <br />
        <qrcode-vue :value="data.channelId" :size="300" level="H" />
        <br />
        <a :href="`/channel/${data.channelId}`" target="_blank">
          <a-tag color="blue" style="font-size: 16px">{{ data.channelId }}</a-tag>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import uuid from 'uuid/v4'
import QrcodeVue from 'qrcode.vue'
import ImageList from '../components/ImageList'

export default {
  components: {
    QrcodeVue,
    ImageList
  },
  data() {
    return {
      socket: io('https://makeimagebigger.herokuapp.com'),
      data: {
        user: 'username',
        channelId: uuid()
      },
      imageData: null,
      images: [],
      isUserConnected: false
    }
  },
  created() {
    this.createChannel()
  },
  methods: {
    createChannel() {
      this.socket.emit('CREATE_CHANNEL', this.data)
      this.socket.on('SEND_IMAGE', (data) => {
        this.images.push(data)
      })
      this.socket.on('LEAVE_CHANNEL', (data) => {
        if (data) return window.location.reload(false)
      })
      this.socket.on('CONNECTION', (data) => {
        this.isUserConnected = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h2 {
  display: block;
}
</style>
