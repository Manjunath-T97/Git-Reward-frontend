export const IndexDB = (data) => {

// 1
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

if (!indexedDB) {
  console.log("IndexedDB could not be found in this browser.");
}

// 2
const request = indexedDB.open("userDatabase", 1);

request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onupgradeneeded = function () {
    //1
    const db = request.result;
  
    //2
    const store = db.createObjectStore("user", { keyPath: "id" });
  
    //3
    store.createIndex("user_name", ["name"], { unique: false });
  
    // 4
    store.createIndex("git_url", ["url"], {unique: false,}); 

    store.createIndex("avatar_url", ["avatar"]);
  };

  /////////////////////////////////////////////////////////////////

  request.onsuccess = function () {
    console.log("Database opened successfully");
    
    const db = request.result;

    // 1
    const transaction = db.transaction("user", "readwrite");
  
    //2
    const store = transaction.objectStore("user");
    const nameIndex = store.index("user_name");
    const gitIndex = store.index("git_url");
    const avatarIndex = store.index("avatar_url");
  
    //3
    // store.put({ id: 1, colour: "Red", make: "Toyota" });
    // store.put({ id: 2, colour: "Red", make: "Kia" });
    // store.put({ id: 3, colour: "Blue", make: "Honda" });
    // store.put({ id: 4, colour: "Silver", make: "Subaru" });

    store.put({id:1, name:data.login, url:data.url, avatar:data.avatar_url});
   
  
    //4
    const idQuery = store.get(2);
    const nameQuery = nameIndex.get(["Lisa"]);
    // const colourMakeQuery = makeModelIndex.get(["Blue", "Honda"]);
  
    // 5
    idQuery.onsuccess = function () {
      console.log('idQuery', idQuery.result);
    };
    nameQuery.onsuccess = function () {
      console.log('nameQuery', nameQuery.result);
    };
    // colourMakeQuery.onsuccess = function () {
    //   console.log('colourMakeQuery', colourMakeQuery.result);
    // };
  
    // 6
    transaction.oncomplete = function () {
      db.close();
    };
  };

}