const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:5000';

async function handleJsonResponse(response) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.error || response.statusText || 'API request failed');
  }
  return body;
}

export async function getTasks() {
  const response = await fetch(`${API_BASE}/api/tasks`);
  return handleJsonResponse(response);
}

export async function createTask(task) {
  const response = await fetch(`${API_BASE}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  return handleJsonResponse(response);
}

export async function updateTaskStatus(id, status) {
  const response = await fetch(`${API_BASE}/api/tasks/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  return handleJsonResponse(response);
}
