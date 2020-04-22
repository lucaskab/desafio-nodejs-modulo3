import Transaction from '../models/Transaction';
import CreateTransactionService from '../services/CreateTransactionService';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public VerifyTransactionOutcomeValue(value: number, type: string): boolean {
    if (type === 'income') {
      return true;
    }
    if (type === 'outcome') {
      if (value > this.balance.total) {
        return false;
      }
      return true;
    }
    return true;
  }

  public getBalance(): Balance {
    const valorIncome = 0;
    const valorOutcome = 0;

    const somaIncome = this.transactions.reduce(function (
      acumulador,
      valorAtual,
    ) {
      if (valorAtual.type === 'income') {
        return acumulador + valorAtual.value;
      }
      return acumulador;
    },
    valorIncome);

    const somaOutcome = this.transactions.reduce(function (
      acumulador,
      valorAtual,
    ) {
      if (valorAtual.type === 'outcome') {
        return acumulador + valorAtual.value;
      }
      return acumulador;
    },
    valorOutcome);

    this.balance.income = somaIncome;
    this.balance.outcome = somaOutcome;
    this.balance.total = somaIncome - somaOutcome;

    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
