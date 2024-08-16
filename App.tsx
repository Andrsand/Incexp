import * as React from 'react';
import { SQLiteProvider} from 'expo-sqlite/next';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system'; // импорт из файловой системы
import { Asset } from 'expo-asset'; // импорт из актива Expo
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./screens/Home";
import Payment from "./screens/Payment";

const Stack = createNativeStackNavigator(); // стековая навигация

const loadDatabase = async () => {
  const dbName = "mySQLiteDB.db";
  const dbAsset = require("./assets/mySQLiteDB.db");
  const dbUri = Asset.fromModule(dbAsset).uri; // TODO разобраться с этим 
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {                      // если файла не существует...
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
}

export default function App() {
  const [dbLoaded, setDbLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, []);

  if (!dbLoaded) return (
    <View style={{ flex: 1 }}>
      <ActivityIndicator size={"large"} />
      <Text>Loading Database...</Text>
    </View>
  );
  return (
    <NavigationContainer>
      <React.Suspense
        fallback={
          <View style={{ flex: 1}}>
            <ActivityIndicator size={"large"} />
            <Text>Loading Database...</Text>
          </View>
        }
      >
        <SQLiteProvider databaseName="mySQLiteDB.db" useSuspense>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: "Incexp",
                headerLargeTitle: true,
              }}
            />
            <Stack.Screen
              name="Payment"
              component={Payment}
              options={{
                headerTitle: "Incexp",
                headerLargeTitle: true,
              }}
            />
          </Stack.Navigator>
        </SQLiteProvider>
      </React.Suspense>
    </NavigationContainer>
  );
}


