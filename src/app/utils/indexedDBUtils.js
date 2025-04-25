const DB_NAME = "StaffFormDB";
const STORE_NAME = "files";

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
};

export const saveFileToDB = async (key, file) => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).put(file, key);
  await tx.complete;
  db.close();
};

export const getAllFilesFromDB = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const files = {};

    store.openCursor().onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        files[cursor.key] = cursor.value;
        cursor.continue();
      } else {
        db.close();
        resolve(files);
      }
    };

    store.openCursor().onerror = reject;
  });
};

export const deleteFileFromDB = async (key) => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).delete(key);
  await tx.complete;
  db.close();
};

export const clearAllFilesFromDB = async () => {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  tx.objectStore(STORE_NAME).clear();
  await tx.complete;
  db.close();
};
