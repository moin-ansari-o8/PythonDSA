import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";

export function Breadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  if (pathSegments.length === 0) return null;

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const label = segment.replace(/-/g, " ");
    const isLast = index === pathSegments.length - 1;

    return {
      label,
      path,
      isLast,
    };
  });

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/" className="breadcrumb-item">
        home
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <span key={index} className="breadcrumb-segment">
          <span className="breadcrumb-separator">/</span>
          {crumb.isLast ? (
            <span className="breadcrumb-item current">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="breadcrumb-item">
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
