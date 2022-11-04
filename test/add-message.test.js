describe('encode message in image', () => {
  it('should add the encoding message in the image', () => {
    const baseImage = [
      [
        [0, 0, 0], [0, 0, 0]
      ],
      [
        [0, 0, 0], [0, 0, 0]
      ]
    ]
    const message = '01000001'

    const imageWithMessage = addMessageToImage(baseImage, message)
    console.table(imageWithMessage);
    console.table(baseImage);
    expect(imageWithMessage).toEqual([
      [
        [0, 1, 0], [0, 0, 0]
      ],
      [
        [0, 1, 0], [0, 0, 0]
      ]
    ])
  })
})

function addMessageToImage (baseImage, message) {
  const bitArray = message.split('').map(v=>+v);
  let bitArrayIndex = -1

  for (let i = 0; i < baseImage.length; i += 1) {
    for (let j = 0; j < baseImage[i].length; j += 1) {
      if (++bitArrayIndex < bitArray.length) {
        baseImage[i][j][0] = bitArray[bitArrayIndex]
      }
      if (++bitArrayIndex < bitArray.length) {
        baseImage[i][j][1] = bitArray[bitArrayIndex]
      }
      if (++bitArrayIndex < bitArray.length) {
        baseImage[i][j][2] = bitArray[bitArrayIndex]
      }
    }
  }

  return baseImage;
}


