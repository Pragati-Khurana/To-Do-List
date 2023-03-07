import './App.css';
import React, {useEffect, useState} from 'react';
import Display from './Components/Display';
import { FaSpinner } from "react-icons/fa";

function App() {

  let [title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [items, setItems] = useState(fetchData);
  let [id, setId] = useState(fetchId);
  let [updateItem, setUpdateItem] = useState(0);
  let [searchField, setSearchField] = useState('');
  let [filteredItems, setFilteredItems] = useState([]);
  let [sortedItems, setSortedItems] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  let [isAlert, setIsAlert] = useState(false);
  let [checkButton, setCheckButton] = useState('');

  function fetchId() {
    const data = JSON.parse(localStorage.getItem('items'));

    if(items.length === 0) {
      return 1;
    }
    else
    {
      return data[data.length-1].id + 1;
    }
  }

  function fetchData() {
    const data = localStorage.getItem('items');

    if(data)
      return JSON.parse(data);
    else
      return [];
  }

  function deleteItem(paraId) {
    const newItems = items.filter((item) => paraId !== item.id);
    setItems(newItems);
    
    setCheckButton('3');
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    },3000);
  }

  function saveEditedRecord(e) {
      e.preventDefault();
      const newItems = items.map((item) => {
        if(updateItem !== item.id)
          return item;
        else {
          return {
            ...item,
            title, description
          };
        }
      })

      setItems(newItems);
      setTitle('');
      setDescription('');
      setUpdateItem(0);

      setCheckButton('2');
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      },3000);
  }

  function editItem(paraId) {
    const [editItem] = items.filter((item) => paraId === item.id);
    // console.log(editItem);
    setTitle(editItem.title);
    setDescription(editItem.description);
    setUpdateItem(paraId);
  }

  useEffect(() => {
    localStorage.setItem('items',JSON.stringify(items));
    setFilteredItems(items);
    setIsLoading(false);
    document.querySelector('#add_btn').disabled = false;
  },[items])

  useEffect(() => {
    let filteredItems;

    if(searchField === '')
      filteredItems = items;
    else
      filteredItems = items.filter((item) => item.title.toLocaleLowerCase().includes(searchField));
      setFilteredItems(filteredItems);
  },[searchField, items])

  function searchItem(value) {
    let search=0;
    value===null?search=0:search=1;

    if(search===1) {
      setSearchField(value.toLocaleLowerCase());
    }
    else {
      setSearchField('');
    }
  }

  useEffect(() => {
    let newArray = [...items];


    if(sortedItems === 'asc')
      newArray = newArray.sort((a,b) => a.title.localeCompare(b.title));
    else if(sortedItems === 'des')
      newArray = newArray.sort((a,b) => b.title.localeCompare(a.title));

    setFilteredItems(newArray);
  },[sortedItems, items])

  function sortItem(value) {
      
      if(value === "asc")
        setSortedItems('asc');
      else if(value === "des")
        setSortedItems('des');
      else 
        setSortedItems('');
  }

  useEffect(() => {
    if(isAlert)
    {
      if(checkButton === '1')
        document.querySelector('#alert-div').innerHTML = "Record Added";
      else if(checkButton === '2')
        document.querySelector('#alert-div').innerHTML = "Record Updated";
      else if(checkButton === '3')
        document.querySelector('#alert-div').innerHTML = "Record Deleted";
    }
    
  },[isAlert]);

  const submitForm = function(e) {
      e.preventDefault();
      document.querySelector('#add_btn').disabled = true;
      setIsLoading(true);

      setCheckButton('1');
      setIsAlert(true);
      
      setTimeout(() => {
        setIsAlert(false);
      },3000);

      let newItem = {
        id:id, title, description
      }
      
      setItems([...items, newItem]);
      
      setId(id+1);
      setTitle('');
      setDescription('');
  }



  return (
    <div className="App">
      <div className="main">
        <div className="title">TO-DO LIST APP</div>
        <div className="input-container">
          <form className="form-container" onSubmit={updateItem===0?submitForm:saveEditedRecord}>
            <label className="form-label">Title</label>
            <input type="text" className="form-control form-control-lg" onChange={(e) => setTitle(e.target.value)} value={title} required />

            <br />
            <label className="form-label">Description</label>
            <textarea className="form-control form-control-lg" rows="4" onChange={(e) => setDescription(e.target.value)} value={description}></textarea>

            <br />
            {updateItem===0?
            <button type="submit" className="btn btn-primary btn-lg" id="add_btn">{isLoading?<FaSpinner /> :<></>} Add Item</button>:
            <button type="submit" className="btn btn-primary btn-lg">Update Item</button>}
            
          </form>

        </div>
        <div className="display-container">
          {items.length===0 && <div className="no-value-container">No item in the list</div>}

          {
              isAlert?<div className="alert alert-danger" role="alert" id="alert-div-delete"></div>:<></> 
          }
          {items.length>0 && <div>
            {/*Search Box*/ }
            <div className="row">
              <div className="col-6">
                <input type="search" className="form-control w-25" onChange={(e) => searchItem(e.target.value)} placeholder="Search Title" />
              </div>
              <div className="col-6">
              <select className="form-select" onChange={(e) => sortItem(e.target.value)}>
                <option defaultValue>Sort</option>
                <option value="uns">Un-sort</option>
                <option value="asc">Ascending</option>
                <option value="des">Descending</option>
              </select>
              </div>
            </div> 

            <table className="table content-container">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                <Display items={filteredItems} deleteItem={deleteItem} editItem={editItem}/>
              </tbody>
            </table>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => setItems([])}>Clear All</button>
          </div>
          }
          
        </div>
      </div>

    </div>
  );
}

export default App;
