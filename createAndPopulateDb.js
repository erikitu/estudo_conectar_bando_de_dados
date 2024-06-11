import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function insertData() {
    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database
    });

    // criando as tabelas
    const queries = [
        `CREATE TABLE IF NOT EXISTS Categorias (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Nome TEXT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS Fornecedores (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Nome TEXT NOT NULL,
            Telefone TEXT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS Produtos (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Nome TEXT NOT NULL,
            Preço DECIMAL(10, 2) NOT NULL,
            ID_Categoria INTEGER,
            ID_Fornecedor INTEGER,
            FOREIGN KEY (ID_Categoria) REFERENCES Categorias(ID),
            FOREIGN KEY (ID_Fornecedor) REFERENCES Fornecedores(ID)
        )`,
        `CREATE TABLE IF NOT EXISTS Clientes (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Nome TEXT NOT NULL,
            Email TEXT NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS Vendas (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            ID_Produto INTEGER,
            ID_Cliente INTEGER,
            Data_Venda DATE,
            Quantidade INTEGER,
            Valor_Total DECIMAL(10, 2),
            FOREIGN KEY (ID_Produto) REFERENCES Produtos(ID),
            FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID)
        )`
    ];

    for (const query of queries) {
        await db.run(query);
    }

    console.log('Tabelas criadas ou já existentes.');

    // Dados para inserção na tabela Categorias
    const categoriasData = [
        'Motor', 'Freios', 'Suspensão', 'Elétrica', 'Transmissão',
        'Exaustão', 'Interior', 'Exterior', 'Acessórios', 'Filtros'
    ];

    // Dados para inserção na tabela Fornecedores
    const fornecedoresData = [
        ['Fornecedor 1', '123456789'], ['Fornecedor 2', '987654321'],
        ['Fornecedor 3', '456789123'], ['Fornecedor 4', '321654987'],
        ['Fornecedor 5', '654987321'], ['Fornecedor 6', '789123456'],
        ['Fornecedor 7', '159753456'], ['Fornecedor 8', '357951852'],
        ['Fornecedor 9', '753951456'], ['Fornecedor 10', '951357258']
    ];

    // Dados para inserção na tabela Produtos
    const produtosData = [
        ['Pneu Aro 15', 200.00, 8, 1], ['Filtro de Óleo', 30.00, 10, 2],
        ['Bateria 60Ah', 300.00, 4, 3], ['Amortecedor Dianteiro', 150.00, 3, 4],
        ['Pastilha de Freio', 80.00, 2, 5], ['Correia Dentada', 100.00, 5, 6],
        ['Velas de Ignição', 40.00, 1, 7], ['Escapamento', 250.00, 6, 8],
        ['Volante Esportivo', 180.00, 7, 9], ['Farol de Milha', 220.00, 9, 10]
    ];

    // Dados para inserção na tabela Clientes
    const clientesData = [
        ['Joao', 'joao@example.com'], ['Maria', 'maria@example.com'],
        ['Joaquim', 'joaquim@example.com'], ['Francisco', 'francisco@example.com'],
        ['Vitor', 'vitor@example.com'], ['Antonio', 'antonio@example.com'],
        ['Cicero', 'cicero@example.com'], ['Lara', 'lara@example.com'],
        ['Lauro', 'lauro@example.com'], ['Jose', 'jose@example.com']
    ];

    // Dados para inserção na tabela Vendas
    const vendasData = [
        [1, 1, '2023-01-01', 2, 400.00], [2, 2, '2023-02-01', 3, 90.00],
        [3, 3, '2023-03-01', 1, 300.00], [4, 4, '2023-04-01', 4, 600.00],
        [5, 5, '2023-05-01', 2, 160.00], [6, 6, '2023-06-01', 1, 100.00],
        [7, 7, '2023-07-01', 5, 200.00], [8, 8, '2023-08-01', 3, 750.00],
        [9, 9, '2023-09-01', 2, 360.00], [10, 10, '2023-10-01', 1, 220.00]
    ];

    await db.run('BEGIN TRANSACTION;');

    // Inserção na tabela Categorias
    for (const nome of categoriasData) {
        await db.run('INSERT INTO categorias (Nome) VALUES (?)', nome);
    }

    // Inserção na tabela Fornecedores
    for (const [nome, telefone] of fornecedoresData) {
        await db.run('INSERT INTO Fornecedores (Nome, Telefone) VALUES (?, ?)', nome, telefone);
    }

    // Inserção na tabela Produtos
    for (const [nome, preco, idCategoria, idFornecedor] of produtosData) {
        await db.run('INSERT INTO Produtos (Nome, Preço, ID_Categoria, ID_Fornecedor) VALUES (?, ?, ?, ?)', nome, preco, idCategoria, idFornecedor);
    }

    // Inserção na tabela Clientes
    for (const [nome, email] of clientesData) {
        await db.run('INSERT INTO Clientes (Nome, Email) VALUES (?, ?)', nome, email);
    }

    // Inserção na tabela Vendas
    for (const venda of vendasData) {
        await db.run('INSERT INTO Vendas (ID_Produto, ID_Cliente, Data_Venda, Quantidade, Valor_Total) VALUES (?, ?, ?, ?, ?)', ...venda);
    }

    await db.run('COMMIT;');
    console.log('Dados inseridos com sucesso.');

}

insertData().catch(err => console.error(err));
