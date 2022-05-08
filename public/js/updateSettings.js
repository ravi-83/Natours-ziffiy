import axios from 'axios';
import { showAlert } from './alert';

// TYpe is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const URL = `/api/v1/users/${
      type === 'password' ? 'updateMyPassword' : 'updateMe'
    }`;

    const res = await axios({
      method: 'PATCH',
      url: URL,
      data,
    });

    console.log(res);

    if (res.data.status === 'success') {
      showAlert(
        'success',
        `${type === 'password' ? 'Password' : 'Data'} upldated successfully!`
      );
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
