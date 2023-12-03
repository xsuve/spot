export const chromeStorage = {
  get: <T>(key: string) => {
    return new Promise((resolve: (value: T | null) => void, _) => {
      chrome.storage.local.get([key], (result) => {
        if (result && result[key]) {
          resolve(result[key]);
        }

        resolve(null);
      });
    });
  },
  set: (key: string, value: any) => {
    return new Promise((resolve: (result: boolean) => void, _) => {
      chrome.storage.local.set({ [key]: value }, () => {
        resolve(true);
      });
    });
  },
  remove: (key: string) => {
    return new Promise((resolve: (result: boolean) => void, _) => {
      chrome.storage.local.remove(key, () => {
        resolve(true);
      });
    });
  },
};
