import axios from "axios";

const ABACATE_URL = "https://api.abacatepay.com/v1";

export async function criarCobrancaPix(
  valor: number,
  aluguelId: string,
  nomeCliente: string,
  emailCliente: string,
  cpfCliente: string,
  telefoneCliente: string,
): Promise<{ cobrancaId: string; url: string }> {

    console.log("Enviando para Abacatepay:", JSON.stringify({
        cpf: cpfCliente,
        telefone: telefoneCliente,
        nome: nomeCliente,
        email: emailCliente,
        valor: Math.round(valor * 100),
      }));

  const response = await axios.post(
    `${ABACATE_URL}/billing/create`,
    {
      frequency: "ONE_TIME",
      methods: ["PIX"],
      products: [
        {
          externalId: aluguelId,
          name: "Aluguel",
          description: `Pagamento do aluguel #${aluguelId}`,
          quantity: 1,
          price: Math.round(valor * 100),
        },
      ],
      returnUrl: "https://example.com",
      completionUrl: "https://example.com",
      customer: {
        name: nomeCliente,
        email: emailCliente,
        cellphone: telefoneCliente,
        taxId: cpfCliente,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.ABACATE_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  console.log("Resposta Abacatepay:", JSON.stringify(response.data));

  const data = response.data.data ?? response.data;

  return {
    cobrancaId: data.id,
    url: data.url,
  };
}