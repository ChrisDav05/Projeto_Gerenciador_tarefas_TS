import { adicionar,listar,editar,remover,marcar,pesquisar,resumo} from "./funcoes";

console.log("\nSEJA BEM-VINDO AO GERENCIADOR DE TAREFAS TASKED!")
console.log("\nAqui, você poderá administrar suas tarefas de uma forma intutiva e prática!\n")
while(true){
    const opcao = Number(prompt("1 - Adicionar uma nova tarefa;\n2 - Listar tarefas;\n3 - Editar tarefa;\n4 - Remover tarefa;\n5 - Marcar tarefa como concluída;\n6 - Pesquisar tarefa;\n7 - Resumo das tarefas;\n8 - Sair do sistema.\nDigite a opção:"))

    if(opcao == 1){
    adicionar()
}
    else if(opcao == 2){
    listar()
}
    else if(opcao == 3){
        editar()
}
    else if(opcao == 4){
        remover()
    }
    else if(opcao == 5){
        marcar()
    }
    else if(opcao == 6){
        pesquisar()
    }
    else if(opcao == 7){
        resumo()
    }
    else if(opcao == 8){
        console.log("Obrigado por usar nosso sistema! :)")
        break
    }
}
