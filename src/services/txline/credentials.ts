// Server-side credential storage for TxLINE MVP.
// Keeps secrets off the browser.
// In production, replace with persistent storage (DB/Redis).

type TxlineCredentials = {
  jwt?: string;
  apiToken?: string;
  updatedAt?: number;
};

let creds: TxlineCredentials = {};

export function getTxlineCredentials(): TxlineCredentials {
  return creds;
}

export function setTxlineCredentials(next: TxlineCredentials) {
  creds = {
    ...creds,
    ...next,
    updatedAt: Date.now(),
  };
}

export function clearTxlineCredentials() {
  creds = {};
}

