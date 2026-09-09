const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || 'https://backend.acei.com.sg').replace(/\/$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${BACKEND_URL}/${path.replace(/^\//, '')}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Backend request failed with status ${response.status}`);
  }

  return response.json();
}

async function getPublicHelpers(search = {}) {
  return request('public/helperinfo/search/', {
    method: 'POST',
    body: JSON.stringify(search),
  });
}

async function getPublicHelper(id) {
  return request(`public/helperinfo/${encodeURIComponent(id)}/`);
}

async function getPublicOrganizations() {
  return request('public/organization/');
}

async function getPublicOrganization(id) {
  return request(`public/organization/${encodeURIComponent(id)}/`);
}

export {
  getPublicHelpers,
  getPublicHelper,
  getPublicOrganizations,
  getPublicOrganization,
};
