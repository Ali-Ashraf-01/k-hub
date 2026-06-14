import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    try {
      login(form);
      navigate(location.state?.from || '/courts');
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="auth-page">
      <section className="auth-card auth-card-v2">
        <div className="auth-intro">
          <img className="auth-logo-img" src="/k-hub-logo.png" alt="K-HUB logo" />
          <p className="eyebrow">تسجيل الدخول</p>
          <h1>ادخل على حسابك في K-HUB</h1>
          <p>
            استخدم الإيميل والباسورد الخاصين بحسابك للوصول إلى حجوزاتك ومتابعة حالة الدفع والحجز.
          </p>

          <div className="auth-benefits">
            <span>✓ دخول آمن بإيميل وباسورد</span>
            <span>✓ متابعة الحجوزات وحالة الدفع</span>
            <span>✓ لوحة إدارة خاصة للمسؤولين فقط</span>
          </div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-title">
            <h2>تسجيل الدخول</h2>
            <p>اكتب بيانات حسابك المسجلة.</p>
          </div>

          <label>
            الإيميل
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              autoComplete="email"
            />
          </label>

          <label>
            الباسورد
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="اكتب الباسورد"
              autoComplete="current-password"
            />
          </label>

          {error && <p className="error-text">⚠ {error}</p>}

          <button className="btn btn-primary full-width" type="submit">
            دخول
          </button>

          <div className="auth-switch-row">
            <span>لسه معندكش حساب؟</span>
            <Link className="link-btn" to="/register">
              سجل مستخدم جديد
            </Link>
          </div>

          <Link className="muted-link" to="/">
            رجوع للرئيسية
          </Link>
        </form>
      </section>
    </div>
  );
}
