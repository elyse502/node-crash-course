# Simple REST API

Implement these endpoints: The main route will be /todo

```
POST →/todo to create a task,
GET → /todo to get all tasks
```

- Use a search parameter to filter tasks by status,
- Use route parameters to a task by id,

A task will be have this shape:

```typescript
type task = {
  id: number;
  task: string;
  status: "todo" | "doing" | "done";
};
```
