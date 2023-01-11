module.exports = {
  admin: 'admin',
  user: 'user'
}

class Role {
  constructor(role) {
    this.role = role;
  }

  isAdmin() {
    return this.role === 'admin';
  }

  isUser() {
    return this.role === 'user';
  }
}

module.exports = Role;