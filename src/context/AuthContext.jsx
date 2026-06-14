import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const SESSION_STORAGE_KEY = 'khub-user';
const USERS_STORAGE_KEY = 'khub-users';

const DEFAULT_USERS = [
  {
    id: 'admin-basel',
    name: 'Basel Alaa',
    email: 'baselalaa@khub.com',
    phone: '01000000001',
    password: 'Basel@123',
    role: 'Admin',
  },
  {
    id: 'admin-main',
    name: 'K-HUB Admin',
    email: 'admin@khub.com',
    phone: '01000000002',
    password: 'Admin@123',
    role: 'Admin',
  },
  {
    id: 'owner-main',
    name: 'K-HUB Owner',
    email: 'owner@khub.com',
    phone: '01000000003',
    password: 'Owner@123',
    role: 'Admin',
  },
];

const ADMIN_EMAILS = DEFAULT_USERS
  .filter((user) => user.role === 'Admin')
  .map((user) => user.email);

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function toSessionUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: normalizeEmail(user.email),
    phone: user.phone,
    role: user.role || 'User',
  };
}

function readSavedUser() {
  try {
    const savedUser = localStorage.getItem(SESSION_STORAGE_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

function readSavedUsers() {
  try {
    const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    const parsedUsers = savedUsers ? JSON.parse(savedUsers) : [];

    const normalizedSavedUsers = parsedUsers.map((user) => ({
      ...user,
      email: normalizeEmail(user.email),
    }));

    const missingDefaultUsers = DEFAULT_USERS.filter(
      (defaultUser) =>
        !normalizedSavedUsers.some((user) => normalizeEmail(user.email) === defaultUser.email)
    );

    return [...missingDefaultUsers, ...normalizedSavedUsers];
  } catch {
    return DEFAULT_USERS;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSavedUser);
  const [users, setUsers] = useState(readSavedUsers);

  function saveUsers(nextUsers) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers));
    setUsers(nextUsers);
  }

  function register(userData) {
    const name = String(userData.name || '').trim();
    const email = normalizeEmail(userData.email);
    const phone = String(userData.phone || '').trim();
    const password = String(userData.password || '').trim();

    if (!name || !email || !phone || !password) {
      throw new Error('كمّل الاسم والإيميل ورقم الموبايل والباسورد.');
    }

    if (password.length < 6) {
      throw new Error('الباسورد لازم يكون 6 حروف أو أرقام على الأقل.');
    }

    const alreadyExists = users.some((savedUser) => normalizeEmail(savedUser.email) === email);

    if (alreadyExists) {
      throw new Error('الإيميل ده مسجل قبل كده. جرّب تسجيل الدخول.');
    }

    const nextUser = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      password,
      role: ADMIN_EMAILS.includes(email) ? 'Admin' : 'User',
    };

    const nextUsers = [...users, nextUser];

    saveUsers(nextUsers);

    const sessionUser = toSessionUser(nextUser);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return sessionUser;
  }

  function login(credentials) {
    const email = normalizeEmail(credentials.email);
    const password = String(credentials.password || '').trim();

    if (!email || !password) {
      throw new Error('اكتب الإيميل والباسورد.');
    }

    const savedUser = users.find((item) => normalizeEmail(item.email) === email);

    if (!savedUser) {
      throw new Error('الإيميل غير مسجل. اعمل حساب جديد الأول.');
    }

    if (savedUser.password !== password) {
      throw new Error('الباسورد غير صحيح.');
    }

    const sessionUser = toSessionUser(savedUser);

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return sessionUser;
  }

  function logout() {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setUser(null);
  }

  const isAdmin = user?.role === 'Admin';

  const value = useMemo(
    () => ({
      user,
      users,
      register,
      login,
      logout,
      isAdmin,
    }),
    [user, users, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
