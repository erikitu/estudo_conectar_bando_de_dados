import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import promptSync from 'prompt-sync';
const prompt = promptSync();

async function openDb() {
    return open({
        filename: './banco.db',
        driver: sqlite3.Database
    });
}

// Funções CRUD para a tabela Categorias
async function createCategoria(nome) {
    const db = await openDb();
    await db.run('INSERT INTO Categorias (Nome) VALUES (?)', [nome]);
    await db.close();
}

async function readCategorias() {
    const db = await openDb();
    const categorias = await db.all('SELECT * FROM Categorias');
    await db.close();
    return categorias;
}

async function updateCategoria(id, nome) {
    const db = await openDb();
    await db.run('UPDATE Categorias SET Nome = ? WHERE ID = ?', [nome, id]);
    await db.close();
}

async function deleteCategoria(id) {
    const db = await openDb();
    await db.run('DELETE FROM Categorias WHERE ID = ?', [id]);
    await db.close();
}

// Funções CRUD para a tabela Fornecedores
async function createFornecedor(nome, telefone) {
    const db = await openDb();
    await db.run('INSERT INTO Fornecedores (Nome, Telefone) VALUES (?, ?)', [nome, telefone]);
    await db.close();
}

async function readFornecedores() {
    const db = await openDb();
    const fornecedores = await db.all('SELECT * FROM Fornecedores');
    await db.close();
    return fornecedores;
}

async function updateFornecedor(id, nome, telefone) {
    const db = await openDb();
    await db.run('UPDATE Fornecedores SET Nome = ?, Telefone = ? WHERE ID = ?', [nome, telefone, id]);
    await db.close();
}

async function deleteFornecedor(id) {
    const db = await openDb();
    await db.run('DELETE FROM Fornecedores WHERE ID = ?', [id]);
    await db.close();
}

// Funções CRUD para a tabela Produtos
async function createProduto(nome, preco, idCategoria, idFornecedor) {
    const db = await openDb();
    await db.run('INSERT INTO Produtos (Nome, Preço, ID_Categoria, ID_Fornecedor) VALUES (?, ?, ?, ?)', [nome, preco, idCategoria, idFornecedor]);
    await db.close();
}

async function readProdutos() {
    const db = await openDb();
    const produtos = await db.all('SELECT * FROM Produtos');
    await db.close();
    return produtos;
}

async function updateProduto(id, nome, preco, idCategoria, idFornecedor) {
    const db = await openDb();
    await db.run('UPDATE Produtos SET Nome = ?, Preço = ?, ID_Categoria = ?, ID_Fornecedor = ? WHERE ID = ?', [nome, preco, idCategoria, idFornecedor, id]);
    await db.close();
}

async function deleteProduto(id) {
    const db = await openDb();
    await db.run('DELETE FROM Produtos WHERE ID = ?', [id]);
    await db.close();
}

// Funções CRUD para a tabela Clientes
async function createCliente(nome, email) {
    const db = await openDb();
    await db.run('INSERT INTO Clientes (Nome, Email) VALUES (?, ?)', [nome, email]);
    await db.close();
}

async function readClientes() {
    const db = await openDb();
    const clientes = await db.all('SELECT * FROM Clientes');
    await db.close();
    return clientes;
}

async function updateCliente(id, nome, email) {
    const db = await openDb();
    await db.run('UPDATE Clientes SET Nome = ?, Email = ? WHERE ID = ?', [nome, email, id]);
    await db.close();
}

async function deleteCliente(id) {
    const db = await openDb();
    await db.run('DELETE FROM Clientes WHERE ID = ?', [id]);
    await db.close();
}

// Funções CRUD para a tabela Vendas
async function createVenda(idProduto, idCliente, dataVenda, quantidade, valorTotal) {
    const db = await openDb();
    await db.run('INSERT INTO Vendas (ID_Produto, ID_Cliente, Data_Venda, Quantidade, Valor_Total) VALUES (?, ?, ?, ?, ?)', [idProduto, idCliente, dataVenda, quantidade, valorTotal]);
    await db.close();
}

async function readVendas() {
    const db = await openDb();
    const vendas = await db.all('SELECT * FROM Vendas');
    await db.close();
    return vendas;
}

async function updateVenda(id, idProduto, idCliente, dataVenda, quantidade, valorTotal) {
    const db = await openDb();
    await db.run('UPDATE Vendas SET ID_Produto = ?, ID_Cliente = ?, Data_Venda = ?, Quantidade = ?, Valor_Total = ? WHERE ID = ?', [idProduto, idCliente, dataVenda, quantidade, valorTotal, id]);
    await db.close();
}

async function deleteVenda(id) {
    const db = await openDb();
    await db.run('DELETE FROM Vendas WHERE ID = ?', [id]);
    await db.close();
}

// Menu de navegação
async function mainMenu() {
    while (true) {
        console.log('\nMenu:');
        console.log('1. Gerenciar Categorias');
        console.log('2. Gerenciar Fornecedores');
        console.log('3. Gerenciar Produtos');
        console.log('4. Gerenciar Clientes');
        console.log('5. Gerenciar Vendas');
        console.log('6. Sair');
        const choice = prompt('Escolha uma opção: ');

        switch (choice) {
            case '1':
                await categoriasMenu();
                break;
            case '2':
                await fornecedoresMenu();
                break;
            case '3':
                await produtosMenu();
                break;
            case '4':
                await clientesMenu();
                break;
            case '5':
                await vendasMenu();
                break;
            case '6':
                console.log('Saindo...');
                process.exit(0);
                break;
            default:
                console.log('Opção inválida, tente novamente.');
        }
    }
}

// Submenu para Categorias
async function categoriasMenu() {
    console.log('\nGerenciar Categorias:');
    console.log('1. Criar Categoria');
    console.log('2. Listar Categorias');
    console.log('3. Atualizar Categoria');
    console.log('4. Deletar Categoria');
    console.log('5. Voltar ao Menu Principal');
    const choice = prompt('Escolha uma opção: ');

    switch (choice) {
        case '1':
            const nome = prompt('Nome da Categoria: ');
            await createCategoria(nome);
            console.log('Categoria criada com sucesso.');
            break;
        case '2':
            const categorias = await readCategorias();
            console.log('Categorias:');
            console.table(categorias);
            break;
        case '3':
            const idToUpdate = prompt('ID da Categoria a ser atualizada: ');
            const novoNome = prompt('Novo Nome da Categoria: ');
            await updateCategoria(idToUpdate, novoNome);
            console.log('Categoria atualizada com sucesso.');
            break;
        case '4':
            const idToDelete = prompt('ID da Categoria a ser deletada: ');
            await deleteCategoria(idToDelete);
            console.log('Categoria deletada com sucesso.');
            break;
        case '5':
            return;
        default:
            console.log('Opção inválida, tente novamente.');
    }
}

// Submenu para Fornecedores
async function fornecedoresMenu() {
    console.log('\nGerenciar Fornecedores:');
    console.log('1. Criar Fornecedor');
    console.log('2. Listar Fornecedores');
    console.log('3. Atualizar Fornecedor');
    console.log('4. Deletar Fornecedor');
    console.log('5. Voltar ao Menu Principal');
    const choice = prompt('Escolha uma opção: ');

    switch (choice) {
        case '1':
            const nome = prompt('Nome do Fornecedor: ');
            const telefone = prompt('Telefone do Fornecedor: ');
            await createFornecedor(nome, telefone);
            console.log('Fornecedor criado com sucesso.');
            break;
        case '2':
            const fornecedores = await readFornecedores();
            console.log('Fornecedores:');
            console.table(fornecedores);
            break;
        case '3':
            const idToUpdate = prompt('ID do Fornecedor a ser atualizado: ');
            const novoNome = prompt('Novo Nome do Fornecedor: ');
            const novoTelefone = prompt('Novo Telefone do Fornecedor: ');
            await updateFornecedor(idToUpdate, novoNome, novoTelefone);
            console.log('Fornecedor atualizado com sucesso.');
            break;
        case '4':
            const idToDelete = prompt('ID do Fornecedor a ser deletado: ');
            await deleteFornecedor(idToDelete);
            console.log('Fornecedor deletado com sucesso.');
            break;
        case '5':
            return;
        default:
            console.log('Opção inválida, tente novamente.');
    }
}

// Submenu para Produtos
async function produtosMenu() {
    console.log('\nGerenciar Produtos:');
    console.log('1. Criar Produto');
    console.log('2. Listar Produtos');
    console.log('3. Atualizar Produto');
    console.log('4. Deletar Produto');
    console.log('5. Voltar ao Menu Principal');
    const choice = prompt('Escolha uma opção: ');

    switch (choice) {
        case '1':
            const nome = prompt('Nome do Produto: ');
            const preco = prompt('Preço do Produto: ');
            const idCategoria = prompt('ID da Categoria do Produto: ');
            const idFornecedor = prompt('ID do Fornecedor do Produto: ');
            await createProduto(nome, preco, idCategoria, idFornecedor);
            console.log('Produto criado com sucesso.');
            break;
        case '2':
            const produtos = await readProdutos();
            console.log('Produtos:');
            console.table(produtos);
            break;
        case '3':
            const idToUpdate = prompt('ID do Produto a ser atualizado: ');
            const novoNome = prompt('Novo Nome do Produto: ');
            const novoPreco = prompt('Novo Preço do Produto: ');
            const novoIdCategoria = prompt('Novo ID da Categoria do Produto: ');
            const novoIdFornecedor = prompt('Novo ID do Fornecedor do Produto: ');
            await updateProduto(idToUpdate, novoNome, novoPreco, novoIdCategoria, novoIdFornecedor);
            console.log('Produto atualizado com sucesso.');
            break;
        case '4':
            const idToDelete = prompt('ID do Produto a ser deletado: ');
            await deleteProduto(idToDelete);
            console.log('Produto deletado com sucesso.');
            break;
        case '5':
            return;
        default:
            console.log('Opção inválida, tente novamente.');
    }
}

// Submenu para Clientes
async function clientesMenu() {
    console.log('\nGerenciar Clientes:');
    console.log('1. Criar Cliente');
    console.log('2. Listar Clientes');
    console.log('3. Atualizar Cliente');
    console.log('4. Deletar Cliente');
    console.log('5. Voltar ao Menu Principal');
    const choice = prompt('Escolha uma opção: ');

    switch (choice) {
        case '1':
            const nome = prompt('Nome do Cliente: ');
            const email = prompt('Email do Cliente: ');
            await createCliente(nome, email);
            console.log('Cliente criado com sucesso.');
            break;
        case '2':
            const clientes = await readClientes();
            console.log('Clientes:');
            console.table(clientes);
            break;
        case '3':
            const idToUpdate = prompt('ID do Cliente a ser atualizado: ');
            const novoNome = prompt('Novo Nome do Cliente: ');
            const novoEmail = prompt('Novo Email do Cliente: ');
            await updateCliente(idToUpdate, novoNome, novoEmail);
            console.log('Cliente atualizado com sucesso.');
            break;
        case '4':
            const idToDelete = prompt('ID do Cliente a ser deletado: ');
            await deleteCliente(idToDelete);
            console.log('Cliente deletado com sucesso.');
            break;
        case '5':
            return;
        default:
            console.log('Opção inválida, tente novamente.');
    }
}

// Submenu para Vendas
async function vendasMenu() {
    console.log('\nGerenciar Vendas:');
    console.log('1. Criar Venda');
    console.log('2. Listar Vendas');
    console.log('3. Atualizar Venda');
    console.log('4. Deletar Venda');
    console.log('5. Voltar ao Menu Principal');
    const choice = prompt('Escolha uma opção: ');

    switch (choice) {
        case '1':
            const idProduto = prompt('ID do Produto: ');
            const idCliente = prompt('ID do Cliente: ');
            const dataVenda = prompt('Data da Venda (YYYY-MM-DD): ');
            const quantidade = prompt('Quantidade: ');
            const valorTotal = prompt('Valor Total: ');
            await createVenda(idProduto, idCliente, dataVenda, quantidade, valorTotal);
            console.log('Venda criada com sucesso.');
            break;
        case '2':
            const vendas = await readVendas();
            console.log('Vendas:');
            console.table(vendas);
            break;
        case '3':
            const idToUpdate = prompt('ID da Venda a ser atualizada: ');
            const novoIdProduto = prompt('Novo ID do Produto: ');
            const novoIdCliente = prompt('Novo ID do Cliente: ');
            const novaDataVenda = prompt('Nova Data da Venda (YYYY-MM-DD): ');
            const novaQuantidade = prompt('Nova Quantidade: ');
            const novoValorTotal = prompt('Novo Valor Total: ');
            await updateVenda(idToUpdate, novoIdProduto, novoIdCliente, novaDataVenda, novaQuantidade, novoValorTotal);
            console.log('Venda atualizada com sucesso.');
            break;
        case '4':
            const idToDelete = prompt('ID da Venda a ser deletada: ');
            await deleteVenda(idToDelete);
            console.log('Venda deletada com sucesso.');
            break;
        case '5':
            return;
        default:
            console.log('Opção inválida, tente novamente.');
    }
}

// Executar menu principal
mainMenu().catch(console.error);
