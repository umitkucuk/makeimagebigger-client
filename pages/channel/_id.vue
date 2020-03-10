<template>
  <div class="container">
    <div v-if="!imageData">
      <h2>Göndermek istediğiniz resmi seçin</h2>
      <input @change="uploadImage" type="file" accept="image/*" />
    </div>

    <div v-else>
      <h2>Göndermek için seçtiğiniz resim</h2>
      <img :src="imageData" />
      <button @click="imageData = null">Vazgeç</button>
      <button @click="sendImage">Gönder</button>
    </div>

    <div v-if="images.length > 0" class="sent-images">
      <h2>Gönderilen resimleriniz:</h2>
      <img v-for="(image, index) in images" :src="image" :key="index" />
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  components: {},
  data() {
    return {
      socket: io('https://makeimagebigger.herokuapp.com'),
      channelId: this.$route.params.id,
      imageData: null,
      images: []
    }
  },
  created() {
    this.joinChannel()
  },
  beforeDestroy() {
    this.socket.emit('LEAVE_CHANNEL', this.channelId)
  },
  methods: {
    joinChannel() {
      this.socket.emit('JOIN_CHANNEL', this.channelId)
      this.socket.on('SEND_IMAGE', (data) => {
        this.images.push(data)
      })
    },
    sendImage() {
      this.socket.emit('SEND_IMAGE', {
        channel_id: this.channelId,
        image: this.imageData
      })
      this.imageData = null
    },
    uploadImage(event) {
      const input = event.target

      if (input.files && input.files[0]) {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.imageData = e.target.result
        }

        reader.readAsDataURL(input.files[0])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sent-images {
  h2 {
    display: block;
  }

  img {
    height: 120px;
    margin: 10px;
  }
}
</style>
