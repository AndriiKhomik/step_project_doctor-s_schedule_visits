const _apiBase = 'https://ajax.test-danit.com/api/v2';
const _token = 'e8f8357e-bd0c-40b1-8074-b37d5a74b6f6';

export const getData = async (id = '') => {
  const res = await fetch(`${_apiBase}/cards/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${_token}`
    }
  });
  if (!res.ok) {
    throw new Error(`Could not fetch ${_apiBase}`)
  }
  return await res.json()
};

export const addVisit = async (obj) => {
  const res = await fetch(`${_apiBase}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${_token}`
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    throw new Error(`Could not fetch ${_apiBase}`)
  }
  return await res.json();
};

export const deleteVisitById = async (id) => {
  const res = await fetch(`${_apiBase}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${_token}`
    }
  });
  if (!res.ok) {
    throw new Error(`Could not fetch ${_apiBase}`)
  }
};

export const updateVisit = async (obj, id) => {
  const res = await fetch(`${_apiBase}/cards/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${_token}`
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    throw new Error(`Could not fetch ${_apiBase}`)
  }
  return await res.json();
};