export default (event) => {
  let input = event.target

  if (input.files && input.files[0]) {
    let reader = new FileReader()

    reader.onload = (e) => {
      this.imageData = e.target.result()
    }

    reader.readAsDataURL(input.files[0])
  }
}
