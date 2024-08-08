import React from 'react';
import { useParams } from 'react-router-dom';
import TitleBar from '../components/TitleBar';
import { Link } from 'react-router-dom';
import { useStore } from '../stores/store';


const CategoryView = () => {
    const { id } = useParams();

    const store = useStore();
    const receipt = store.receiptList[id];
    //console.log(receipt)
  
    const allCategories = ["Groceries", "Dining and Restaurants", "Electronics", "Clothing and Accessories", "Health and Beauty", "Household Supplies", "Furniture and Home Decor", "Utilities", "Transportation", "Entertainment", "Travel", "Education", "Healthcare", "Fitness", "Pets", "Gifts and Donations", "Office Supplies", "Subscriptions and Memberships", "Automotive", "Home Improvement", "Personal Services", "Financial Services", "Hobbies and Crafts", "Childcare", "Miscellaneous"]
  
    /**
     * @description This extends store's setCategoryTotals to make it easier to update single categories and trigger reactivity
     */
    const updateSingleCategory = (category, amount) => {
      const oldCategoryTotals = store.categoryTotals
      oldCategoryTotals[category] = amount
  
      store.setCategoryTotals(oldCategoryTotals)
    }
  
    const updateAllCategoryTotals = () => {
  
      const categoryTotals = {}
  
      // get all receipts
      const receipts = store.receiptList
  
      // from all receipts, get all items
      const items = receipts.flatMap(receipt => receipt.items)
  
      items.forEach(item => {
        categoryTotals[item.category] = categoryTotals[item.category] ? categoryTotals[item.category] + item.price : item.price
      })
  
      return categoryTotals
    }
  
    const test = updateAllCategoryTotals()
    window.test = test
  
    return (
      <div className="flex flex-col items-center p-4 gap-2">
        <TitleBar
          left={<Link
            to="/"
            className="p-2 bg-blue-500 text-white rounded text-center hover:bg-blue-600"
          >
            Home
          </Link>}
          right={<Link
            to="/upload"
            className="p-2 bg-blue-500 text-white rounded text-center hover:bg-blue-600"
          >
            Add Receipt
          </Link>}
        />
  
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <h1 className="text-xl font-bold mb-4">Category Totals</h1>
          <div className="flex flex-col gap-2">
            {Object.entries(test).map(([category, total], index) => (
              <div key={index} className="flex justify-between">
                <span className="font-semibold">{category}</span>
                <span>${total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
   
   
   export default CategoryView;