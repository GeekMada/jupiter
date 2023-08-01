const { parse, stringify } = require('flatted');
const { default: api } = require('requests/api');

const getUserInfo = async () => {
  const UserData = parse(sessionStorage.getItem('user'));
  if (!UserData) {
    console.error('User data not found in sessionStorage');
    return;
  }

  try {
    const response = await api.get(`user/${UserData.id}`);
    console.log(response.data);
    sessionStorage.setItem('user', stringify(response.data));
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export default getUserInfo;
