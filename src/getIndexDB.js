var userData={};

export const getIndexDB =()=>{
    
 const request = indexedDB.open("userDatabase", 1);

request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onsuccess = function () {
    console.log("Database opened successfully");
    
    const db = request.result;

    // 1
    const transaction = db.transaction("user", "readwrite");

    const store = transaction.objectStore("user");

    const idQuery = store.get(1);

    idQuery.onsuccess = function () {
      userData = idQuery.result;
    };

    transaction.oncomplete = function () {
        db.close();
      };
  }
  return userData;
}