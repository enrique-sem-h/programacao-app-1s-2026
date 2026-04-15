import controller from "./indexController";
import PromptSync from "prompt-sync";

const prompt = PromptSync();

async function main() {
  while (true) {
    console.clear();
    controller.getOptions();

    const option = prompt("Escolha uma opção: ");

    if (option === "0") {
      console.log("Saindo...");
      break;
    }

    try {
      const table = await controller.getTable();

      switch (option) {
        case "1":
          await controller.getData(table);
          break;

        case "2":
          await controller.insertData(table);
          break;

        case "3":
          await controller.updateData(table);
          break;

        case "4":
          await controller.deleteData(table);
          break;

        default:
          console.log("Opção inválida");
      }
    } catch (err: any) {
      console.log("Erro:", err.message);
    }

    prompt("\nPressione ENTER para continuar...");
  }
}

main();
