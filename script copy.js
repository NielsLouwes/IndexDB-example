request.onupgradeneeded = () => {
  // 5. Save the IDBDatabase interface
  const db = request.result;

  // 6. Create an objectStore for this database, include a keyPath like ID to be a unique identifiable thing
  // 7. Define indexed searches such as color and make of cars
  const store = db.createObjectStore("cars", { keyPath: "id" }); // id is ussed as unique entry or key to refer to each item in the DB
  store.createIndex("cars_colour", ["colour"], { unique: false }); // easily look up cars by color
  store.createIndex("colour_and_make", ["colour", "make"], { unique: false }); // look up cars by colour and make
};

// 8. On success if responsible for our operations to and from the index DB, we set up our store and create our indexes

request.onsuccess = (event) => {
  db = event.result;
  const transaction = db.transaction("cars", " readwrite"); // bunch operations together to avoid failing
  

  const store = transaction.objectStore("cars"); // create the store from cars objectStore
  const colourIndex = store.index("cars_colour"); // create index 1
  const makeModelIndex = store.index("colour_and_make"); //create index 2

  // 9. Add data to database but adding a method to our store. PUT updates a given record in a database or insert a new record is given item does not already exist
  store.put({ id: 1, colour: "Red", make: "Toyota" });
  store.put({ id: 2, colour: "Red", make: "Kia" });
  store.put({ id: 3, colour: "Blue", make: "Honda" });
  store.put({ id: 4, colour: "Silver", make: "Subaru" });

  console.log(store);

  // 10. retrieving data
  const idQuery = store.get(4); // retrieve car with id 4
  const colorQuery = colourIndex.getAll(["Red"]); // use our colourIndex set up variable to get all cars with color "Red"
  const colourMakeQuery = makeModelIndex.get(["Blue", "Honda"]); // use our makeModelIndex we set up and retrieve first result


  // 11. each query needs and onsuccess function check if it worked and log its result
  // 12. All queries needs to be successful to work
  // 13. You can group them in different transactions 

  idQuery = function () {
    console.log('idQuery', idQuery.result)
  }

  colorQuery = function () {
    console.log('colorQuery', colorQuery.result)
  }

  colourMakeQuery = function () {
    console.log('colourMakeQuery', colourMakeQuery.result)
  }

  // 14. Once transaction is complete, we close the DB
  transaction.oncomplete = function () {
    db.close();
  }
};
