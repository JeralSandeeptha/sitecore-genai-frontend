const useLocalStorage = () => {
  const setLocalStorageItem = (itemName: string, itemData: unknown) => {
    try {
      const dataToStore = typeof itemData === 'string' ? itemData : JSON.stringify(itemData);
      localStorage.setItem(itemName, dataToStore);
    } catch (error) {
      console.log(error);
    }
  };

  const getLocalStorageItem = (itemName: string) => {
    try {
      const data = localStorage.getItem(itemName);
      if (!data) return null;
      try {
        return JSON.parse(data);
      } catch {
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearLocalStorageItem = (itemName: string) => {
    try {
      localStorage.removeItem(itemName);
    } catch (error) {
      console.log(error);
    }
  };

  return { clearLocalStorageItem, getLocalStorageItem, setLocalStorageItem };
};

export default useLocalStorage;