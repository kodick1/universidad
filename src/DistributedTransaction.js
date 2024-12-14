import React, { useState } from 'react'; 
import { Alert, AlertDescription, AlertTitle, AlertDialog, AlertDialogAction } from '@shadcn/ui';

// Simulando tres sistemas independientes
const BankAccount = () => {
  const [balance, setBalance] = useState(1000);

  const withdraw = (amount) => {
    setBalance(balance - amount);
    console.log(`Retirando ${amount} del banco. Saldo actual: ${balance}`);
  };

  const deposit = (amount) => {
    setBalance(balance + amount);
    console.log(`Depositando ${amount} en el banco. Saldo actual: ${balance}`);
  };

  return { balance, withdraw, deposit };
};

const PaymentGateway = () => {
  const [transactions, setTransactions] = useState([]);

  const processPayment = (amount) => {
    console.log(`Procesando pago de ${amount}`);
    setTransactions([...transactions, amount]);
  };

  return { transactions, processPayment };
};

const InventorySystem = () => {
  const [stock, setStock] = useState(50);

  const reserveItem = (quantity) => {
    setStock(stock - quantity);
    console.log(`Reservando ${quantity} artículos. Stock actual: ${stock}`);
  };

  const unreserveItem = (quantity) => {
    setStock(stock + quantity);
    console.log(`Deshaciendo reserva de ${quantity} artículos. Stock actual: ${stock}`);
  };

  return { stock, reserveItem, unreserveItem };
};

// Componente que maneja la transacción distribuida
const DistributedTransaction = () => {
  const bankAccount = BankAccount();
  const paymentGateway = PaymentGateway();
  const inventorySystem = InventorySystem();
  const [error, setError] = useState(null);

  const processOrder = (amount, quantity) => {
    try {
      bankAccount.withdraw(amount);
      paymentGateway.processPayment(amount);
      inventorySystem.reserveItem(quantity);
      console.log('Transacción confirmada');
    } catch (e) {
      console.log('Transacción fallida repitaaa. Deshaciendo cambios...');
      bankAccount.deposit(amount);
      inventorySystem.unreserveItem(quantity);
      paymentGateway.transactions.pop();
      setError(e.message);
    }
  };

  return (
    <div>
      <h2>Transacción Distribuida</h2>
      <button onClick={() => processOrder(100, 5)}>Procesar Orden</button>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error en la Transacción</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DistributedTransaction;