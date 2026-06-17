<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        // Only show tasks belonging to the logged-in user
        return response()->json(
            Task::where('user_id', auth('api')->id())->latest()->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:todo,in_progress,done',
            'priority' => 'in:low,medium,high',
        ]);

        $task = Task::create([
            ...$validated,
            'user_id' => auth('api')->id(),
        ]);

        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        $this->authorizeTask($task);
        return response()->json($task);
    }

    public function update(Request $request, Task $task)
    {
        $this->authorizeTask($task);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:todo,in_progress,done',
            'priority' => 'in:low,medium,high',
        ]);

        $task->update($validated);
        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        $this->authorizeTask($task);
        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }

    private function authorizeTask(Task $task)
    {
        if ($task->user_id !== auth('api')->id()) {
            abort(403, 'Unauthorized');
        }
    }
}