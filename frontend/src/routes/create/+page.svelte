<script>
  import { createTask } from '$lib/api.js';

  let name = '';
  let description = '';
  let message = '';
  let error = '';
  let submitting = false;

  async function handleSubmit(event) {
    event.preventDefault();
    message = '';
    error = '';

    if (!name.trim()) {
      error = 'Task name is required.';
      return;
    }

    submitting = true;

    try {
      const task = await createTask({ name: name.trim(), description: description.trim() });
      message = `Created task: ${task.name} (${task.status})`;
      name = '';
      description = '';
    } catch (err) {
      error = err.message;
    } finally {
      submitting = false;
    }
  }
</script>

<style>
  form {
    display: grid;
    gap: 1rem;
    max-width: 640px;
  }

  label {
    display: grid;
    gap: 0.5rem;
    font-weight: 600;
  }

  input,
  textarea,
  button {
    font: inherit;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.9rem;
    border-radius: 10px;
    border: 1px solid #b8b8c3;
    background: #ffffff;
  }

  button {
    width: fit-content;
    padding: 0.9rem 1.5rem;
    border: none;
    border-radius: 10px;
    background: #0f4c81;
    color: white;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .status {
    margin-top: 1rem;
  }

  .success {
    color: #14532d;
  }

  .failure {
    color: #991b1b;
  }
</style>

<h1>Create a New Task</h1>
<p>Use this form to create a task and add it directly to the board.</p>

<form on:submit={handleSubmit}>
  <label>
    Task name
    <input bind:value={name} type="text" placeholder="Write a name for the task" />
  </label>

  <label>
    Description
    <textarea bind:value={description} rows="5" placeholder="Describe the task details"></textarea>
  </label>

  <button type="submit" disabled={submitting}>
    {submitting ? 'Creating...' : 'Create Task'}
  </button>
</form>

<div class="status">
  {#if message}
    <p class="success">{message}</p>
  {/if}
  {#if error}
    <p class="failure">{error}</p>
  {/if}
</div>
