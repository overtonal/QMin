<script>
  export let data;
</script>

<style>
  nav {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: #0b1120;
    color: #f7f7ff;
  }

  nav a {
    color: #c6d5ff;
    text-decoration: none;
    font-weight: 600;
  }

  nav a:hover {
    color: #ffffff;
  }

  main {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 0 1rem;
    font-family: system-ui, sans-serif;
  }
</style>

<nav>
  <a href="/">Home</a>
  <a href="/create">Create Task</a>
  <a href="/board">Board</a>
</nav>

<main>
  <slot />
</main>
