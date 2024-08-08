import {VOCR_KEY} from '../keys';

/**
 * @description Perform OCR on the uploaded image file.
 * @param {string} fileUrl - The URL of the uploaded image file.
 * 
 * @returns {Object} receiptObject
 */
const performVOCR = async (imageFileURL) => {

  const endpoint = "https://api.jigsawstack.com/v1/vocr";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": VOCR_KEY,
    },
    body: JSON.stringify({
      url: imageFileURL,
      prompt: [
        "return items purchased as {name:string, price:number, quantity:number, category:Category} where Purchase categories are Groceries, Dining and Restaurants, Electronics, Clothing and Accessories, Health and Beauty, Household Supplies, Furniture and Home Decor, Utilities, Transportation, Entertainment, Travel, Education, Healthcare, Fitness, Pets, Gifts and Donations, Office Supplies, Subscriptions and Memberships, Automotive, Home Improvement, Personal Services, Financial Services, Hobbies and Crafts, Childcare, Miscellaneous.",
        "return the price subtotal",
        "return the price total",
        "return the purchase date",
        "return the short name of the store", 
        "return the taxes amount",
        "tell a shopping story about the purchase in iambic pentameter"
      ]
    }),
  };
  const result = await fetch(endpoint, options);
  const data = await result.json();

  console.log("JigsawStack API response:", data);


  // Access the 'context' property
  const context = data.context;

  // // Get the first key dynamically
  const dataKeys = {
    "storeName": Object.keys(context)[4],
    "purchaseDate": Object.keys(context)[3],
    "total": Object.keys(context)[2],
    "taxes": Object.keys(context)[5],
    "subtotal": Object.keys(context)[1],
    "items": Object.keys(context)[0],
    "zstory": Object.keys(context)[6],
  }

  // // Get values and populate a cleaner data object model

  const newReceiptObject = {
    receiptImageURL: imageFileURL,
    storeName: context[dataKeys.storeName][0],
    purchaseDate: context[dataKeys.purchaseDate][0],
    items: context[dataKeys.items].map(item => JSON.parse(item)),
    priceSubtotal: parseFloat(context[dataKeys.subtotal][0]),
    taxes: parseFloat(context[dataKeys.taxes][0]),
    priceTotal: parseFloat(context[dataKeys.total][0]),
    zstory: context[dataKeys.zstory],
  }

  return newReceiptObject;

};

export { performVOCR };