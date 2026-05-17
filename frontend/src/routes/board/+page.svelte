<script>
  import { onMount } from 'svelte';
  import { getTasks, updateTaskStatus } from '$lib/api.js';

  let tasks = [];
  let error = '';
  let loading = true;
  let updating = null;

  const STATUS_COLUMNS = [
    { key: 'To-Do', title: 'To-Do' },
    { key: 'In Progress', title: 'In Progress' },
    { key: 'Done', title: 'Done' }
  ];

  function groupTasks() {
    return STATUS_COLUMNS.map((column) => ({
      ...column,
      items: tasks.filter((task) => task.status === column.key)
    }));
  }

  async function loadTasks() {
    try {
      error = '';
      tasks = await getTasks();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  async function changeStatus(task, nextStatus) {
    if (!nextStatus || task.status === nextStatus) return;
    updating = task.id;

    try {
      const updated = await updateTaskStatus(task.id, nextStatus);
      tasks = tasks.map((item) => (item.id === updated.id ? updated : item));
    } catch (err) {
      error = err.message;
    } finally {
      updating = null;
    }
  }

  onMount(loadTasks);
</script>

<style>
  .board {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .column {
    background: #f6f8ff;
    padding: 1rem;
    border-radius: 16px;
    border: 1px solid #d8ddee;
    min-height: 320px;
  }

  .column h2 {
    margin-top: 0;
    font-size: 1.1rem;
  }

  .task {
    display: grid;
    gap: 0.75rem;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 14px;
    background: white;
    border: 1px solid #d9d9e2;
  }

  .task h3 {
    margin: 0;
    font-size: 1rem;
  }

  .task p {
    margin: 0;
    color: #4b5563;
    line-height: 1.4;
  }

  .task footer {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .task button {
    padding: 0.5rem 0.9rem;
    border: none;
    border-radius: 999px;
    background: #0f4c81;
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .task button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .empty {
    color: #6b7280;
    padding: 1rem 0;
  }

  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
</style>

<h1>Task Board</h1>
<p>View tasks grouped into workflow columns and update their status inline.</p>

{#if loading}
  <p>Loading tasks…</p>
{:else}
  {#if error}
    <p style="color: #b91c1c">{error}</p>
  {/if}

  <div class="board">
    {#each groupTasks() as column}
      <section class="column">
        <div class="status-bar">
          <h2>{column.title}</h2>
          <span>{column.items.length}</span>
        </div>

        {#if column.items.length === 0}
          <p class="empty">No tasks in this column yet.</p>
        {/if}

        {#each column.items as task}
          <article class="task">
            <h3>{task.name}</h3>
            <p>{task.description || 'No description provided.'}</p>
            <footer>
              {#each STATUS_COLUMNS as statusOption}
                {#if statusOption.key !== task.status}
                  <button
                    on:click={() => changeStatus(task, statusOption.key)}
                    disabled={updating === task.id}
                  >
                    Move to {statusOption.title}
                  </button>
                {/if}
              {/each}
            </footer>
          </article>
        {/each}
      </section>
    {/each}
  </div>
{/if}
