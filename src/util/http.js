import axios from "axios";

export async function fetchUserProfile({ its_id, signal }) {
  const {data} = await axios.get(`/api/users/${its_id}`);
  return data.data;
}

export async function updateUserProfile({ id, profileData }) {
  const updateProfile = await axios.post(`/api/users/${id}`, {profileData});
  return updateProfile;
}

export async function fetchCityList({ signal }) {
  const {data} = await axios.get(`/api/users/city`, { signal });
  return data.data;
}

export async function fetchCountryList({ signal }) {
  const {data} = await axios.get(`/api/users/country`, { signal });
  return data.data;
}