import {
  NavLink,
  Outlet
} from 'react-router-dom'

function navClassName({ isActive }: { isActive: boolean }): string {
  return `nav-link${isActive ? ' active' : ''}`
}

export function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header border-bottom">
        <div className="container-fluid py-3 d-flex flex-wrap align-items-center gap-3">
          <div className="me-auto">
            <div className="fw-semibold">WUT1 IT Application Template</div>
            <div className="text-secondary small">
              AI Write · Human Review · Machine Verify
            </div>
          </div>

          <nav className="nav nav-pills gap-1" aria-label="主要功能">
            <NavLink className={navClassName} to="/master-detail">
              Master / Detail
            </NavLink>
            <NavLink className={navClassName} to="/dashboard">
              Dashboard
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container-fluid py-4 app-content">
        <Outlet />
      </main>
    </div>
  )
}
