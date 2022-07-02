import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { ItemWrapper } from "./ItemWrapper";

import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'
import { Task } from './TasksList';


interface TaskItemProps {
  data: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (data: {taskId:number, newTaskTitle: string}) => void;
  index: number;
}

export function TaskItem ({ data:task, editTask, removeTask, toggleTaskDone, index }:TaskItemProps) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitleValue, setEditedTitleValue] = useState(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  };

  function handleCancelEditing() {
    setEditedTitleValue(task.title);
    setIsEditing(false);
  };

  function handleSubmitEditing() {
    editTask({newTaskTitle:editedTitleValue, taskId: task.id});
    setIsEditing(false);
  };

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])


  return (
  <ItemWrapper index={index}>
    <View>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        style={styles.taskButton}
        onPress={() => toggleTaskDone(task.id)}
      >
        <View 
          testID={`marker-${index}`}
          //TODO - use style prop 
          style={task.done ? styles.taskMarkerDone : styles.taskMarker}
        >
          { task.done && (
            <Icon 
              name="check"
              size={12}
              color="#FFF"
            />
          )}
        </View>
        <TextInput 
          ref={textInputRef}
          style={ task.done ? styles.taskTextDone : styles.taskText}
          value={editedTitleValue}
          editable={isEditing}
          onChangeText={setEditedTitleValue}
          onSubmitEditing={handleSubmitEditing}
        />
      </TouchableOpacity>
    </View>

    <View style={ styles.iconsContainer } >
      { isEditing ? (
        <TouchableOpacity
          onPress={handleCancelEditing}
        >
          <Icon name="x" size={24} color="#b2b2b2" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleStartEditing}
        >
          <Image source={editIcon} />
        </TouchableOpacity>
      ) }
      
      <View 
        style={ styles.iconsDivider }
      />

      <TouchableOpacity
        testID={`trash-${index}`}
        disabled={isEditing}
        onPress={() => removeTask(task.id)}
      >
        <Image source={trashIcon} style={{ opacity: isEditing ? 0.2: 1 }}/>
      </TouchableOpacity>
    </View>
  </ItemWrapper>
  );
};

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsDivider: {
    width: 2,
    height: 24,
    marginHorizontal: 10,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  }, 
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 24,
  }
})