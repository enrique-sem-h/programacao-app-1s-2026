import PromptSync from "prompt-sync";
import { sql } from "drizzle-orm";
import { db } from "./db";
import { uf } from "./db/schema";

const prompt = PromptSync();

function getOptions() {
  console.log("1. Obter linhas para tabela");
  console.log("2. inserir linha em uma tabela");
  console.log("3. atualizar linha em uma tabela");
  console.log("4. deletar linha em uma tabela");
  console.log("0. Sair");
}

async function getTable(): Promise<string> {
  console.clear();
  console.log("Selecione uma tabela:");

  const result = (await db.values(
    sql`SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`,
  )) as string[][];

  if (!result.length) {
    throw new Error("Nenhuma tabela encontrada.");
  }

  result.forEach((row, index) => {
    console.log(`${index + 1}. ${row[0]}`);
  });

  const input = prompt("Digite o número da tabela: ");
  const index = Number(input) - 1;

  if (isNaN(index) || index < 0 || index >= result.length) {
    throw new Error("Seleção inválida.");
  }

  return result[index][0];
}

async function insertData(table: string) {
  console.clear();
  console.log(`Inserindo em: ${table}`);

  const nome = prompt("nome: ");
  let sigla = "";
  let refId = "";

  if (table === "uf") {
    sigla = prompt("sigla: ");
    await db.run(
      sql`INSERT INTO uf (id, nome, sigla) VALUES (${crypto.randomUUID()}, ${nome}, ${sigla})`,
    );
  }

  if (table === "cidade") {
    refId = prompt("uf_id: ");
    await db.run(
      sql`INSERT INTO cidade (id, nome, uf_id) VALUES (${crypto.randomUUID()}, ${nome}, ${refId})`,
    );
  }

  if (table === "regiao") {
    refId = prompt("cidade_id: ");
    await db.run(
      sql`INSERT INTO regiao (id, nome, cidade_id) VALUES (${crypto.randomUUID()}, ${nome}, ${refId})`,
    );
  }

  console.log("Inserido com sucesso!");
}

async function getData(table: string) {
  console.clear();

  const result = await db.values(sql.raw(`SELECT * FROM ${table}`));

  console.log(`Dados da tabela ${table}:`);
  console.table(result);
}

async function updateData(table: string) {
  console.clear();

  const id = prompt("ID do registro: ");
  const nome = prompt("Novo nome: ");

  if (table === "uf") {
    const sigla = prompt("Nova sigla: ");
    await db.run(
      sql`UPDATE uf SET nome = ${nome}, sigla = ${sigla} WHERE id = ${id}`,
    );
  }

  if (table === "cidade") {
    const uf_id = prompt("Novo uf_id: ");
    await db.run(
      sql`UPDATE cidade SET nome = ${nome}, uf_id = ${uf_id} WHERE id = ${id}`,
    );
  }

  if (table === "regiao") {
    const cidade_id = prompt("Novo cidade_id: ");
    await db.run(
      sql`UPDATE regiao SET nome = ${nome}, cidade_id = ${cidade_id} WHERE id = ${id}`,
    );
  }

  console.log("Atualizado com sucesso!");
}

async function deleteData(table: string) {
  console.clear();

  const id = prompt("ID do registro a deletar: ");

  await db.run(sql.raw(`DELETE FROM ${table} WHERE id = '${id}'`));

  console.log("Deletado com sucesso!");
}

export default {
  getOptions,
  getData,
  insertData,
  updateData,
  deleteData,
  getTable,
};
