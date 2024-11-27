// src/utils/authRoles.js
import Cookies from 'js-cookie';

const STORAGEKEY = {
  roles: 'roles',
  userId: 'userId',
};

export const getUserRole = () => Cookies.get(STORAGEKEY.roles);
export const getUserId = () => Cookies.get(STORAGEKEY.userId);

export const isSuperAdmin = () => getUserRole() === 'superAdmin';
export const isAdmin = () => getUserRole() === 'admin';
export const isUser = () => getUserRole() === 'user';
