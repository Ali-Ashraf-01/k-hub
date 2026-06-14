import { Link } from 'react-router-dom';

export default function AdminDeniedPage() {
  return (
    <div className="page section">
      <div className="empty-state admin-denied-card">
        <span className="admin-lock-icon">🔒</span>
        <p className="eyebrow">Admin Only</p>
        <h1>الصفحة دي للـ Admin فقط</h1>
        <p>حسابك الحالي مستخدم عادي، لذلك لا يمكنك فتح صفحات الإدارة.</p>
        <div className="hero-actions center-actions">
          <Link className="btn btn-primary" to="/">رجوع للرئيسية</Link>
          <Link className="btn btn-light" to="/courts">تصفح الملاعب</Link>
        </div>
      </div>
    </div>
  );
}
