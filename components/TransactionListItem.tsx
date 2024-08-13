import { StyleSheet, Text, View } from "react-native";
import { Category, Transaction } from "../types";

interface TransactionListItemProps {
    transaction: Transaction;
    categoryInfo: Category | undefined;
}

export default function TransactionListItem({
    transaction,
    categoryInfo,
}: TransactionListItemProps) {
    return (
        <Text>
            {categoryInfo?.name} amount: {transaction.amount}
        </Text>
    )
}