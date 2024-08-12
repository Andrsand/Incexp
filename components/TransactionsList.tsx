import { TouchableOpacity, View } from "react-native";
import { Category, Transaction } from "../types";

export default function TransactionList({
    transactions,
    categories,
    deleteTransaction,

}: {
    categories: Category[];
    transactions: Transaction[];
    deleteTransaction: (id: number) => Promise<void>;
    }) {
    return (
        <View>
            {transactions.map((transaction) => {
                return (
                    <TouchableOpacity
                        key={transaction.id}
                        activeOpacity={.7}
                        onLongPress={() => deleteTransaction(transaction.id)}
                    >
                        <Text>
                            {transaction.description} amount: {transaction.amount}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}
    