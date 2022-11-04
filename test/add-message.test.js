describe('encode message in image', () => {
  it('should add the encoding message in the image', () => {
    const baseImage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    const message = '01000001'

    const imageWithMessage = addMessageToImage(baseImage, message)

    expect(imageWithMessage).toEqual([0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0])
  });

  it('should throw an error if there is not engouhb byte to add the message', () => {
    const baseImage = [0, 0, 0, 0, 0, 0]
    const message = '01000001'

    const callToAddMessageToImage = () => addMessageToImage(baseImage, message);

    expect(callToAddMessageToImage).toThrowError("Image is too small");
  })
})


describe('decode message in image', () => {
  it('should retrieve the message in the image', ()=> {
    const expectedMessage = '01000001';
    const baseImage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const encodedImage = [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0];

    const messageRetrieved = retrieveMessageInImage(baseImage, encodedImage );

    expect(messageRetrieved).toEqual(expectedMessage);
  });

  it('should retrieve the message in the image', ()=> {
    const expectedMessage = '01000001';
    const baseImage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const encodedImage = [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const messageRetrieved = retrieveMessageInImage(baseImage, encodedImage );

    expect(messageRetrieved).toEqual(expectedMessage);
  });

  it('should throw when the image have not the same length', ()=> {
    const baseImage = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const encodedImage = [0, 1, 0, 0, 0, 0, 0, 1, 0 ];

    const callToRetrieveMLessageInImage = ()=>retrieveMessageInImage(baseImage, encodedImage);

    expect(callToRetrieveMLessageInImage).toThrowError("Image have not the same length");
  })
});

function addMessageToImage (baseImage, message) {
  if(baseImage.length < message.length){
    throw new Error('Image is too small');
  }
  const imageToModified = [...baseImage];
  const bitArray = message.split('').map(v => +v).forEach((v, index)=>{
    imageToModified[index] += v;
  })
  return imageToModified;
}

function retrieveMessageInImage(baseImage, encodedImage) {
  if(baseImage.length !== encodedImage.length){
    throw new Error("Image have not the same length");
  }

  const result = baseImage.map((value, index)=>{
    return encodedImage[index] - value;
  }).join('').match(/(\d{8})/g);

  return result.filter(value=>value !== '00000000').join('');
}
