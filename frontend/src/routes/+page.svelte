<script>
  const features = [
    { title: 'Create tasks', description: 'Add a task with name and description.' },
    { title: 'Visual task board', description: 'See tasks grouped by status.' },
    { title: 'Status updates', description: 'Move tasks through To-Do, In Progress, and Done.' }
  ];
</script>

<style>
  h1 {
    margin-bottom: 0.5rem;
  }

  .cards {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }

  .card {
    padding: 1.25rem;
    border-radius: 14px;
    background: #f7f8ff;
    border: 1px solid #d6d6ea;
  }

  .card h2 {
    margin-top: 0;
  }
</style>

<h1>QMin Task Board</h1>
<p>Small SvelteKit frontend for creating and tracking tasks with three workflow columns.</p>

<div class="cards">
  {#each features as feature}
    <div class="card">
      <h2>{feature.title}</h2>
      <p>{feature.description}</p>
    </div>
  {/each}
</div>
