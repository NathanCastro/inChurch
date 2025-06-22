import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return true and store token on correct login', () => {
    const result = service.login('admin@admin.com.br', '13579');
    expect(result).toBeTrue();
    expect(localStorage.getItem('userToken')).toBe('fake0987');
  });

  it('should return false on incorrect login', () => {
    const result = service.login('user@test.com', 'wrongpassword');
    expect(result).toBeFalse();
    expect(localStorage.getItem('userToken')).toBeNull();
  });

  it('should return true if user is authenticated (token exists)', () => {
    localStorage.setItem('userToken', 'someToken');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false if user is not authenticated (no token)', () => {
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should remove token on logout', () => {
    localStorage.setItem('userToken', 'someToken');
    service.logout();
    expect(localStorage.getItem('userToken')).toBeNull();
  });
});
