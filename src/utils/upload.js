import { FILE_KEY } from "../keys";

/**
 * @param {File} imageFile
 * 
 * @return {String} publicFileURL
 */
const uploadFile = async (imageFile) => {
  // Check if there is an image file
  // Future implementation will check if imageFile is an actual image
  if (imageFile) {

    // Upload image file to JigsawStack
    const key = imageFile.name;
    const endpoint = `https://api.jigsawstack.com/v1/store/file?key=${key}&overwrite=true`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "image/png",
        "x-api-key": FILE_KEY,
      },
      body: imageFile,
    };
    const result = await fetch(endpoint, options);
    const data = await result.json();

    // where the uploaded image is stored on JigsawStack's servers
    const publicFileURL = `${data.url}?x-api-key=${FILE_KEY}`;
    console.log("public url:", publicFileURL);

    return publicFileURL;
  }
};

export { uploadFile };