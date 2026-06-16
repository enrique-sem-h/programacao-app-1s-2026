import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as bcrypt from "bcrypt-ts";
import { alugueis } from "./schemas/alugueisSchema.ts";
import { anuncios, fotoAnuncios } from "./schemas/anunciosSchema.ts";
import { avaliacoes } from "./schemas/avaliacoesSchema.ts";
import { fotoUsuarios, usuarios } from "./schemas/usuariosSchema.ts";

dotenv.config({
  path: "./.env",
});

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const databaseUrl = `mysql://${getRequiredEnv("MYSQL_USER")}:${getRequiredEnv("MYSQL_PASSWORD")}@${getRequiredEnv("MYSQL_HOST")}:${getRequiredEnv("MYSQL_PORT")}/${getRequiredEnv("MYSQL_DATABASE")}`;

const ids = {
  usuarios: {
    ana: "11111111-1111-4111-8111-111111111111",
    bruno: "22222222-2222-4222-8222-222222222222",
    carla: "33333333-3333-4333-8333-333333333333",
    diego: "44444444-4444-4444-8444-444444444444",
  },
  anuncios: {
    camera: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
    vestido: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
    furadeira: "cccccccc-cccc-4ccc-8ccc-cccccccccccc",
    caixaTransporte: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
    ringLight: "eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee",
  },
  alugueis: {
    cameraFinalizado: "12121212-1212-4121-8121-121212121212",
    vestidoAtivo: "23232323-2323-4232-8232-232323232323",
    ringLightPendente: "34343434-3434-4343-8343-343434343434",
  },
};

async function main() {
  const pool = mysql.createPool(databaseUrl);
  const db = drizzle(pool);

  const senhaDemo = await bcrypt.hash("Senha123!", 12);

  const usuariosSeed = [
    {
      id: ids.usuarios.ana,
      nome: "Ana Souza",
      cpf: "12345678901",
      email: "ana@alugae.com",
      senha: senhaDemo,
      endereco: "Rua das Flores, 120 - Sao Paulo, SP",
      telefone: "11987654321",
      rep: 4.8,
      saldo: 245.5,
    },
    {
      id: ids.usuarios.bruno,
      nome: "Bruno Lima",
      cpf: "23456789012",
      email: "bruno@alugae.com",
      senha: senhaDemo,
      endereco: "Av. Brasil, 850 - Campinas, SP",
      telefone: "19976543210",
      rep: 4.6,
      saldo: 90,
    },
    {
      id: ids.usuarios.carla,
      nome: "Carla Mendes",
      cpf: "34567890123",
      email: "carla@alugae.com",
      senha: senhaDemo,
      endereco: "Rua XV de Novembro, 45 - Curitiba, PR",
      telefone: "41965432109",
      rep: 4.9,
      saldo: 510.25,
    },
    {
      id: ids.usuarios.diego,
      nome: "Diego Rocha",
      cpf: "45678901234",
      email: "diego@alugae.com",
      senha: senhaDemo,
      endereco: "Rua do Porto, 300 - Recife, PE",
      telefone: "81954321098",
      rep: 4.3,
      saldo: 32.75,
    },
  ];

  const fotoUsuariosSeed = [
    {
      usuarioId: ids.usuarios.ana,
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      usuarioId: ids.usuarios.bruno,
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    {
      usuarioId: ids.usuarios.carla,
      url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    },
    {
      usuarioId: ids.usuarios.diego,
      url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    },
  ];

  const anunciosSeed = [
    {
      id: ids.anuncios.camera,
      titulo: "Camera Canon EOS Rebel T7",
      descricao: "Camera DSLR com lente 18-55mm, bateria extra e bolsa.",
      categoria: "Eletrônicos" as const,
      valorDiario: 85,
      caucao: 500,
      usuarioId: ids.usuarios.ana,
    },
    {
      id: ids.anuncios.vestido,
      titulo: "Vestido longo para festa",
      descricao: "Vestido azul marinho, tamanho M, ideal para eventos.",
      categoria: "Moda e Acessórios" as const,
      valorDiario: 60,
      caucao: 220,
      usuarioId: ids.usuarios.carla,
    },
    {
      id: ids.anuncios.furadeira,
      titulo: "Furadeira Bosch 650W",
      descricao: "Furadeira de impacto com maleta e jogo de brocas.",
      categoria: "Casa e decoração" as const,
      valorDiario: 35,
      caucao: 180,
      usuarioId: ids.usuarios.bruno,
    },
    {
      id: ids.anuncios.caixaTransporte,
      titulo: "Caixa de transporte pet",
      descricao: "Caixa resistente para gatos e caes pequenos.",
      categoria: "Animais e Acessórios" as const,
      valorDiario: 25,
      caucao: 100,
      usuarioId: ids.usuarios.diego,
    },
    {
      id: ids.anuncios.ringLight,
      titulo: "Ring light profissional",
      descricao: "Ring light com tripé, controle de intensidade e suporte.",
      categoria: "Beleza e Cuidados" as const,
      valorDiario: 40,
      caucao: 150,
      usuarioId: ids.usuarios.ana,
    },
  ];

  const fotoAnunciosSeed = [
    {
      anuncioId: ids.anuncios.camera,
      url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      ordem: 1,
      principal: true,
    },
    {
      anuncioId: ids.anuncios.camera,
      url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd",
      ordem: 2,
      principal: false,
    },
    {
      anuncioId: ids.anuncios.vestido,
      url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
      ordem: 1,
      principal: true,
    },
    {
      anuncioId: ids.anuncios.furadeira,
      url: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407",
      ordem: 1,
      principal: true,
    },
    {
      anuncioId: ids.anuncios.caixaTransporte,
      url: "https://images.unsplash.com/photo-1548767797-d8c844163c4c",
      ordem: 1,
      principal: true,
    },
    {
      anuncioId: ids.anuncios.ringLight,
      url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91",
      ordem: 1,
      principal: true,
    },
  ];

  const alugueisSeed = [
    {
      id: ids.alugueis.cameraFinalizado,
      status: "finalizado" as const,
      valorTotal: 255,
      caucao: 500,
      dataInicio: "2026-06-01",
      dataFim: "2026-06-03",
      stripePaymentIntentId: "pi_seed_camera_finalizado",
      metodoPagamento: "cartao",
      locatarioId: ids.usuarios.bruno,
      anuncioId: ids.anuncios.camera,
    },
    {
      id: ids.alugueis.vestidoAtivo,
      status: "ativo" as const,
      valorTotal: 120,
      caucao: 220,
      dataInicio: "2026-06-18",
      dataFim: "2026-06-19",
      stripePaymentIntentId: "pi_seed_vestido_ativo",
      metodoPagamento: "cartao",
      locatarioId: ids.usuarios.ana,
      anuncioId: ids.anuncios.vestido,
    },
    {
      id: ids.alugueis.ringLightPendente,
      status: "pendente" as const,
      valorTotal: 80,
      caucao: 150,
      dataInicio: "2026-06-22",
      dataFim: "2026-06-23",
      stripePaymentIntentId: null,
      metodoPagamento: "pix",
      locatarioId: ids.usuarios.diego,
      anuncioId: ids.anuncios.ringLight,
    },
  ];

  const avaliacoesSeed = [
    {
      aluguelId: ids.alugueis.cameraFinalizado,
      avaliadorId: ids.usuarios.bruno,
      estrelas: 5,
      comentario: "Equipamento em otimo estado e retirada bem organizada.",
    },
  ];

  try {
    await db.transaction(async (tx) => {
      await tx.delete(avaliacoes);
      await tx.delete(alugueis);
      await tx.delete(fotoAnuncios);
      await tx.delete(anuncios);
      await tx.delete(fotoUsuarios);
      await tx.delete(usuarios);

      await tx.insert(usuarios).values(usuariosSeed);
      await tx.insert(fotoUsuarios).values(fotoUsuariosSeed);
      await tx.insert(anuncios).values(anunciosSeed);
      await tx.insert(fotoAnuncios).values(fotoAnunciosSeed);
      await tx.insert(alugueis).values(alugueisSeed);
      await tx.insert(avaliacoes).values(avaliacoesSeed);
    });

    console.log("Database seeded successfully.");
    console.log("Demo password for all seeded users: Senha123!");
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Error seeding database:", error);
  process.exit(1);
});
