import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import Check from './check.png';
import Delete from './delete.png';

const primaryColor = '#7E39FB';
const styles = StyleSheet.create({
  header: {
    backgroundColor: primaryColor,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingVertical: 20,
    flex: 1,
  },
  inputTodoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputTodo: {
    borderWidth: 1,
    borderColor: primaryColor,
    height: 50,
    flex: 1,
    marginRight: 10,
  },
  buttonAddText: {
    fontSize: 18,
    color: primaryColor,
  },
  itemRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  check: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#000',
  },
  itemTitle: {
    fontSize: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

const baseUrl = 'http://localhost:3000';

const createToDo = async (toDo, sucessCb) => {
  const response = await fetch(`${baseUrl}/todos`, {
    method: 'post',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toDo),
  });
  const obj = await response.json();
  sucessCb(obj);
  // .then((response) => response.json())
  // .then((response) => sucessCb(response))
  // .catch((error) => {
  //   console.log('errooou');
  // });
};
const deleteTodo = (todo, cbSucess) => {
  fetch(`${baseUrl}/todos/${todo.id}`, {
    method: 'delete',
  }).then((response) => {
    if (response.status === 200) {
      cbSucess();
    }
  });
};

const Home = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState();

  const addTodo = () => {
    const newTodo = {
      text: input,
      date: new Date().getTime(),
    };
    createToDo(newTodo, (newTodoRequest) => {
      setToDos((prevTodos) => [...prevTodos, newTodoRequest]);
      setInput('');
    });
  };

  const removeTodo = (itemTodoDeleted) => {
    deleteTodo(itemTodoDeleted, () => {
      setToDos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== itemTodoDeleted.id),
      );
    });
  };

  const renderItens = ({item}) => (
    <View style={styles.itemRow}>
      <TouchableOpacity>
        <View style={styles.check}>
          <Image source={Check} />
        </View>
      </TouchableOpacity>
      <Text>{item.text}</Text>
      <TouchableOpacity onPress={() => removeTodo(item)}>
        <Image source={Delete} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={{color: '#fff'}}>Todo App</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.inputTodoContainer}>
          <TextInput
            style={styles.inputTodo}
            onChangeText={setInput}
            autoCorrect={false}
            value={input}
          />
          <TouchableOpacity onPress={addTodo}>
            <Text style={styles.buttonAddText}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={toDos}
          keyExtractor={(item) => item.id}
          renderItem={renderItens}
        />
      </View>
    </View>
  );
};

export default Home;

/*
try {

} catch (error) {

}
*/