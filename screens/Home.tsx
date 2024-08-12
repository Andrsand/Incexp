import * as React from 'react';
import { Text, View } from "react-native";
import { Category } from '../types';

export default function Home() {
    const [categories, setCategories] = React.useState<Category[]>([]);
    return (
        <View>
            <Text>Home screen</Text>
        </View>
    );
}