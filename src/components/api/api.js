const _apiBase = 'https://ajax.test-danit.com/api/v2';
const _token = 'e8f8357e-bd0c-40b1-8074-b37d5a74b6f6';

export const getData = async () => {
  const res = await fetch(`${_apiBase}/cards`, {
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

export const updateData = async (id) => {
  const res = await fetch(`${_apiBase}/cards/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${_token}`
    },
    body: JSON.stringify({
      title: this.title, //'Визит к кардиологу',
      description: this.description, //'Плановый визит',
      doctor: this.doctor,  //'Cardiologist',
      bp: this.bp,  //'24',
      age: this.age,  //23,
      weight: this.weight  //70
    })
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
  return await res.json()
};
