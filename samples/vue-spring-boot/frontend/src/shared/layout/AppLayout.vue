<template>
  <div class="app-shell">
    <header class="app-header border-bottom">
      <div class="container-fluid py-3 d-flex flex-wrap align-items-center gap-3">
        <div class="me-auto">
          <div class="fw-semibold">WUT1 IT Application Template</div>
          <div class="text-secondary small">AI Write · Human Review · Machine Verify</div>
        </div>

        <nav class="nav nav-pills gap-1" aria-label="主要功能">
          <RouterLink class="nav-link" to="/master-detail">
            Master / Detail
          </RouterLink>
          <RouterLink class="nav-link" to="/dashboard">
            Dashboard
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="container-fluid py-4 app-content">
      <RouterView />
    </main>
  </div>
</template>
