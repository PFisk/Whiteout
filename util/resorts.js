import fs from 'fs';
import path from 'path';

function getData() {
  const dataDirectory = path.join(process.cwd(), 'data', 'resorts.json');
  const data = JSON.parse(fs.readFileSync(dataDirectory, 'utf8'));
  return data;
}

export function getResorts() {
  const data = getData();
  return Object.values(data).flatMap(country => country.resorts);
}

export function getAllResortHandles() {
  const data = getData();
  return Object.values(data).flatMap(country => 
    country.resorts.map(resort => ({
      params: { id: resort.handle }
    }))
  );
}

export function getResortData(handle) {
  const resorts = getResorts();
  const resortData = resorts.find(r => r.handle === handle);
  return resortData ? { handle, ...resortData } : null;
}
