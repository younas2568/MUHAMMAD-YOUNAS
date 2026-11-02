// Offline storage manager for downloading Quran text, audio, and app data

const DB_NAME = 'NoorUlQuranDB';
const DB_VERSION = 1;
const STORE_SURAHS = 'downloaded_surahs';
const STORE_AUDIO = 'downloaded_audio';

export interface DownloadedSurahMeta {
  surahNumber: number;
  name: string;
  transliteration: string;
  totalVerses: number;
  downloadDate: number;
  hasAudio: boolean;
  sizeKb: number;
}

class OfflineStorageManager {
  private db: IDBDatabase | null = null;

  private async openDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.indexedDB) {
        reject(new Error('IndexedDB not supported'));
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_SURAHS)) {
          db.createObjectStore(STORE_SURAHS, { keyPath: 'surahNumber' });
        }
        if (!db.objectStoreNames.contains(STORE_AUDIO)) {
          db.createObjectStore(STORE_AUDIO, { keyPath: 'id' });
        }
      };

      request.onsuccess = (e) => {
        this.db = (e.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onerror = (e) => {
        reject((e.target as IDBOpenDBRequest).error);
      };
    });
  }

  // Save full Surah text and translations offline
  public async saveSurahOffline(surahData: any, hasAudio: boolean = false): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_SURAHS, 'readwrite');
      const store = tx.objectStore(STORE_SURAHS);

      const record: DownloadedSurahMeta = {
        surahNumber: surahData.number,
        name: surahData.name,
        transliteration: surahData.transliteration,
        totalVerses: surahData.totalVerses,
        downloadDate: Date.now(),
        hasAudio,
        sizeKb: Math.round(JSON.stringify(surahData).length / 1024)
      };

      store.put({ ...surahData, meta: record });

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  // Get all downloaded Surahs metadata
  public async getDownloadedSurahs(): Promise<DownloadedSurahMeta[]> {
    try {
      const db = await this.openDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_SURAHS, 'readonly');
        const store = tx.objectStore(STORE_SURAHS);
        const request = store.getAll();

        request.onsuccess = () => {
          const list = (request.result || []).map((item: any) => item.meta || {
            surahNumber: item.number,
            name: item.name,
            transliteration: item.transliteration,
            totalVerses: item.totalVerses,
            downloadDate: Date.now(),
            hasAudio: true,
            sizeKb: 50
          });
          resolve(list);
        };

        request.onerror = () => resolve([]);
      });
    } catch {
      return [];
    }
  }

  // Check if a specific Surah is downloaded
  public async isSurahDownloaded(surahNumber: number): Promise<boolean> {
    try {
      const db = await this.openDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_SURAHS, 'readonly');
        const store = tx.objectStore(STORE_SURAHS);
        const request = store.get(surahNumber);
        request.onsuccess = () => resolve(!!request.result);
        request.onerror = () => resolve(false);
      });
    } catch {
      return false;
    }
  }

  // Delete a downloaded Surah to free up phone storage
  public async deleteDownloadedSurah(surahNumber: number): Promise<void> {
    const db = await this.openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction([STORE_SURAHS, STORE_AUDIO], 'readwrite');
      tx.objectStore(STORE_SURAHS).delete(surahNumber);

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  // Download audio blob and cache into Cache Storage or IndexedDB
  public async cacheAudioFile(audioUrl: string, id: string): Promise<void> {
    try {
      if ('caches' in window) {
        const cache = await caches.open('noor-quran-audio-cache');
        await cache.add(audioUrl);
      }
    } catch (err) {
      console.warn('Audio caching fallback:', err);
    }
  }
}

export const offlineStorage = new OfflineStorageManager();
