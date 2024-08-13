import { StyleSheet, Text, View } from "react-native";
import { Category, Transaction } from "../types";
import Card from "./ui/Card";

interface TransactionListItemProps {
    transaction: Transaction;
    categoryInfo: Category | undefined;
}

export default function TransactionListItem({
    transaction,
    categoryInfo,
}: TransactionListItemProps) {
    return (
        <Card>
            <Text>
            {categoryInfo?.name} amount: {transaction.amount}
        </Text>
        </Card>
        
    )
}