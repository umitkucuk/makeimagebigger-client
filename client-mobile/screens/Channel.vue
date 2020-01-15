<template>
  <view>
    <shown-image :image="images[selectedImage]" />
    <view :style="{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }">
      <touchable-opacity
        v-for="(image, index) in images"
        :key="index"
        @press="handleSelectImage(index)"
      >
        <image
          :style="{
          height: 80,
            padding: 1,
            alignSelf: 'flex-start',
            resizeMode: 'cover',
            top: 0,
            width: width / 3}"
          :source="{ uri: image }"
        />
      </touchable-opacity>
    </view>
  </view>
</template>

<script>
import { Dimensions } from 'react-native'
import io from 'socket.io-client'
import ShownImage from '../components/ShownImage.vue'
import toDataURL from '../lib/base64'

const WIDTH = Dimensions.get('window').width

export default {
  props: {
    navigation: { type: Object },
  },
  components: {
    ShownImage,
  },
  created() {
    this.joinChannel()
  },
  data() {
    return {
      socket: io('https://makeimagebigger.herokuapp.com'),
      channelId: this.navigation.getParam('channelId'),
      width: WIDTH,
      selectedImage: 0,
      images: [
        'https://images.unsplash.com/photo-1579017328977-d86ef34d8e73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        'https://images.unsplash.com/photo-1579101429389-4634b4a20873?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1011&q=80',
        'https://picsum.photos/id/239/200/300',
        'https://picsum.photos/id/240/200/300',
        'https://picsum.photos/id/241/200/300',
      ],
    }
  },
  methods: {
    joinChannel() {
      this.socket.emit('JOIN_CHANNEL', this.channelId)
      this.socket.on('SEND_IMAGE', data => {})
    },
    handleSelectImage(index) {
      this.selectedImage = index
      toDataURL(this.images[index], dataUrl => {
        this.sendImage(dataUrl)
      })
    },
    sendImage(dataUrl) {
      this.socket.emit('SEND_IMAGE', {
        channel_id: this.channelId,
        image: dataUrl,
      })
    },
  },
}
</script>
