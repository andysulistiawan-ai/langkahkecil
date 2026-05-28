interface AppScriptResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
  timestamp?: string;
}

export class AppScriptService {
  private baseUrl: string;

  constructor(url: string) {
    this.baseUrl = url;
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(this.baseUrl, { method: 'GET', mode: 'no-cors' });
      return true;
    } catch {
      return false;
    }
  }

  async post(body: any): Promise<AppScriptResponse> {
    await fetch(this.baseUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(body),
    });
    return { success: true };
  }

  async init() {
    return this.post({ action: 'init' });
  }

  async fetchCollection(collection: string) {
    return this.post({ action: 'fetch', collection });
  }

  async create(collection: string, data: any) {
    return this.post({ action: 'create', collection, data });
  }

  async update(collection: string, id: string, data: any) {
    return this.post({ action: 'update', collection, id, data });
  }

  async delete(collection: string, id: string) {
    return this.post({ action: 'delete', collection, id });
  }

  async sync(records: any[]) {
    return this.post({ action: 'sync', data: records });
  }
}
