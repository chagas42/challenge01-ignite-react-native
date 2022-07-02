import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';


export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const condition = tasks.some(task => task.title === newTaskTitle);

    if(condition) {
      Alert.alert(
        'Task já cadastrada', 
        'Você não pode cadastrar uma task com o mesmo nome'
      );
      return;
    }

    setTasks(oldState => ([...oldState, {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }]));
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({...task}));
    
    const newTasks = updatedTasks.map(task => task.id === id ? {
      ...task,
      done: !task.done
    } : task);

    setTasks(oldState => newTasks);
    
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Confirmação',
      'Desejar realmente remover esta tarefa?',
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel"
        },
        { text: "Remove", onPress: () => {
          setTasks(tasks.filter(task => task.id !== id));
        } }
    ])

  }

  function handleEditTask(data:{taskId: number, newTaskTitle: string}) {
    const updatedTasks = tasks.map(task => ({...task}));
    
    const newTasks = updatedTasks.map(task => task.id === data.taskId ? {
      ...task,
      title: data.newTaskTitle,
    } : task);

    setTasks(oldState => newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})