interface Exercicio{
  titulo: string,
  descricao: string,
  dataVenc: string,
  prioridade: string,
  status: string,
  dataCriacao: string,
}


let tarefas : Exercicio[] = [];
let tarefas_concluidas: Exercicio[] = [];

/*FUNÇÃO ADICIONAR*/
export function adicionar() {
  console.log("Os campos marcados com * são obrigatórios!");
  let titulo : string = prompt("*Digite o título da tarefa que deseja adicionar:\n")!;
  let descricao : string | null = prompt(
    "Digite uma breve descrição da tarefa que deseja adicionar:\n"
  );
  if (descricao == null){
    descricao = "Tarefa sem descrição"
  }
  let data_criacao = new Date();
  data_criacao.setHours(0, 0, 0, 0);
  const data_cria_convert = data_criacao.toISOString().split('T')[0];

  let dados_venc : string | null = prompt(
    "*Digite uma data de vencimento no formato xx/xx/xxxx:\n"
  );
  while(dados_venc === null) {
    dados_venc = prompt("*A data de vencimento é obrigatória. Digite no formato xx/xx/xxxx:\n")
  }
  
  let separa : string[] = dados_venc.split("/");
  let dataConvertida = new Date(parseInt(separa[2]), parseInt(separa[1]) - 1, parseInt(separa[0]));
  let date = dataConvertida.toISOString().split('T')[0];
  while (date < data_cria_convert) {
    const date_menor = prompt("*A data de vencimento precisa ser maior que a de criação. Digite uma no formato xx/xx/xxxx:\n")!;
    let separa_quatro : string[] = date_menor.split("/");
    let data_accept = new Date(parseInt(separa_quatro[2]), parseInt(separa_quatro[1])- 1, parseInt(separa_quatro[0]));
    const data_aceita = data_accept.toISOString().split('T')[0]
    date = data_aceita;
  }
  let prioridade : string | null = prompt(
    "*Digite o nível de importância da tarefa que deseja adicionar:\n (Baixa, Media ou Alta)\n"
  )!;

  /*DESTAQUE DA OBRIGATORIEDADE DOS CAMPOS*/
  for (let i = titulo; i === null; i = titulo) {
    const tit_obrig = prompt("*É obrigatório o título. Digite um:\n")!;
    titulo = tit_obrig;
  }
  for (let f = prioridade; f === null; f = prioridade) {
    const prio_obrig = prompt("*É obrigatório a prioridade. Digite uma:\n")!;
    prioridade = prio_obrig;
  }
  /*FIM DAS FUNÇÕES DE OBRIGATORIEDADE DOS CAMPOS*/
  tarefas.push({
    titulo: titulo,
    descricao: descricao,
    dataVenc: date,
    prioridade: prioridade,
    status: "Pendente",
    dataCriacao: data_cria_convert,
  });
  
  console.log("Tarefa adicionada com sucesso!");
  console.table(tarefas);
  return dataConvertida;
}

/*FUNÇÃO LISTAR*/
export function listar() {
  console.log("Suas tarefas são:");
  console.table(tarefas);
  const opcao = prompt(
    "Como você deseja listar suas tarefas?\nOrdenar ou filtrar:\n"
  );

  /*ORDENAR*/
  if (opcao === "Ordenar") {
    const op : number | null = Number(prompt(
      "Escolha como você irá ordenar as tarefas:\n1 - Por dados de vencimento, 2 - por prioridade ou 3 - Dados de criação."
    ));
    if (op == 1) {
      const ordem_data = tarefas.sort((a , b) => new Date(a.dataVenc).getTime() - new Date(b.dataVenc).getTime());
      console.table(ordem_data);
    } else if (op == 2) {
      const valor_priori = { Alta: 1, Media: 2, Baixa: 3 };
      const ordem_prioridade = tarefas.sort(
        (a, b) => valor_priori[a.prioridade] - valor_priori[b.prioridade]
      );
      console.table(ordem_prioridade);
    } else if (op == 3) {
      const ordem_data_cria = tarefas.sort(
        (a, b) => new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime()
      );
      console.table(ordem_data_cria);
    }

  /*FILTRAR*/
  } else {
    const exibicao = Number(prompt(
      "Escolha o filtro que deseja listar as suas tarefas:\n 1 - Filtrar por status (pendente/concluído);\n 2 - Filtrar por prioridade;\n3 - Filtrar por dados de vencimento.\n"
    ));
    if (exibicao == 1) {
      console.log("Tarefas pendentes:");
      console.table(tarefas);
      console.log("Tarefas concluídas:");
      console.table(tarefas_concluidas);
    } else if (exibicao == 2) {
      const baixa = tarefas.filter((tarefa) => tarefa.prioridade === "Baixa");
      console.log("Tarefas de baixa prioridade:");
      console.table(baixa);
      const media = tarefas.filter((tarefa) => tarefa.prioridade === "Media");
      console.log("Tarefas de média prioridade:");
      console.table(media);
      const alta = tarefas.filter((tarefa) => tarefa.prioridade === "Alta");
      console.log("Tarefas de alta prioridade:");
      console.table(alta);
    } else if (exibicao == 3) {
      const data_hj = prompt(
        "Qual a data atual?\nDigite a data no formato xx/xx/xxxx:\n"
      )!;
      let separa_dois = data_hj.split("/");
      let data_separada = new Date(
        parseInt(separa_dois[2]),
        parseInt(separa_dois[1]) - 1,
        parseInt(separa_dois[0])
      );
      let data_compara = data_separada.toISOString().split('T')[0];
      const data_venc : Exercicio []= [];
      const data_venceu : Exercicio[] = [];
      const data_igual : Exercicio[] = [];
      for (const l of tarefas) {
        if (data_compara < l.dataVenc) {
          data_venc.push(l);
        } else if (data_compara > l.dataVenc) {
          data_venceu.push(l);
        } else if ((data_compara == l.dataVenc)) {
          data_igual.push(l);
        }
      }
      console.log("Tarefa(s) que ainda vai/vão vencer:");
      console.table(data_venc);
      console.log("Tarefa(s) que já venceu/venceram:");
      console.table(data_venceu);
      console.log("Tarefa(s) com data de vencimento para hoje:");
      console.table(data_igual);
    }
  }
}

/*FUNÇÃO EDITAR*/
export function editar() {
  const titulopesq : string = prompt("Digite o título da tarefa que deseja editar:\n")!;
    if (tarefas[0].titulo === titulopesq) {
      let titulo_novo : string | null= prompt("Digite um novo título para a tarefa:\n");
      while(titulo_novo === null) {
        titulo_novo = prompt("*O título é obrigatório. Digite um:\n")
      }
      tarefas[0].titulo = titulo_novo;
      let dados_venc_nova : string | null = prompt(
        "*Digite uma data de vencimento no formato xx/xx/xxxx:\n"
      );
      while(dados_venc_nova === null) {
        dados_venc_nova = prompt("*A data de vencimento é obrigatória. Digite no formato xx/xx/xxxx:\n")
      }
      let data_criation = new Date();
      data_criation.setHours(0, 0, 0, 0);
      const data_criation_convert = data_criation.toISOString().split('T')[0];
      
      let separa_tres = dados_venc_nova.split("/");
      let data_nova_convertida = new Date(parseInt(separa_tres[2]), parseInt(separa_tres[1])- 1, parseInt(separa_tres[0]));
      let data = data_nova_convertida.toISOString().split('T')[0];

      while (data < data_criation_convert) {
      let date_menor_um = prompt("*A data de vencimento precisa ser maior que a de criação. Digite uma no formato xx/xx/xxxx:\n")!;
      let separa_cinco = date_menor_um.split("/");
      let data_a = new Date(parseInt(separa_cinco[2]), parseInt(separa_cinco[1])- 1, parseInt(separa_cinco[0]));
      let data_aceitada = data_a.toISOString().split('T')[0]
      data = data_aceitada;
      }
      console.log(data)
      tarefas[0].dataVenc = data;

      let descricao_nova = prompt(
        "Digite uma nova descrição para a tarefa:\n"
      );
      if (descricao_nova == null){
        descricao_nova = "Tarefa sem descrição"
      }
      tarefas[0].descricao = descricao_nova;
      let prio_nova : string | null= prompt("Digite uma nova prioridade para a tarefa:\n(Baixa, Media e Alta)");
      while(prio_nova === null) {
        prio_nova = prompt("*A prioridade é obrigatória. Digite uma nova prioridade para a tarefa:\n(Baixa, Media e Alta)\n")
      }
      tarefas[0].prioridade = prio_nova
      console.table(tarefas)
    }   
}

/*FUNÇÃO REMOVER*/
export function remover() {
  const remov = prompt("Digite a tarefa que deseja remover: ")!;
  const decision = prompt(
    "Deseja realmente remover essa tarefa?\nDigite S para sim ou N para não:\n"
  );
  if (decision == "S") {
    const indice = tarefas.findIndex(tarefa => tarefa.titulo === remov);
    if (indice !== -1) { 
      console.log("Tarefas removidas:")
      console.table(tarefas.splice(indice, 1)); 
    } else {
      console.log("Tarefa não encontrada.");
    }
  }
}

/*FUNÇÃO DE MARCAR COMO CONCLUÍDA UMA TAREFA*/
export function marcar() {
  const statuspesq = prompt("Digite o título da tarefa pendente:\n");
  let index = tarefas.findIndex((obj) => obj.titulo === statuspesq);

  if (index !== -1) {
    let objetoRemovido = tarefas.splice(index, 1)[0];
    tarefas_concluidas.push(objetoRemovido);
    let objeto = tarefas_concluidas.find((prop) => prop.status === "Pendente");

    if (objeto) {
      objeto.status = "\u2713";
    }
    console.log("As tarefas concluídas são:");
    console.table(tarefas_concluidas);
  }
}

/*FUNÇÃO PESQUISAR*/
export function pesquisar() {
  const escolha : number = Number(prompt(
    "Escolha a forma de pesquisar:\n(1 para pesquisa por título ou 2 para pesquisa por descrição)\n"
  ));
  if (escolha == 1) {
    const pesquisa_tit = prompt(
      "Digite o título completo ou parcial da tarefa que deseja pesquisar:\n"
    )!;
    const buscaparcial_tit = tarefas.filter((pesq_tit) => pesq_tit.titulo.includes(pesquisa_tit))
    console.table(buscaparcial_tit)     
  }
  else {
    const pesquisa_des = prompt(
      "Digite a descrição completa ou parcial da tarefa que deseja pesquisar:\n"
    )!;
    const buscaparcial_des = tarefas.filter((pesq_des) => pesq_des.descricao.includes(pesquisa_des))
    console.table(buscaparcial_des)     
  }
}

/*FUNÇÃO RESUMIR*/
export function resumo() {
  const quant_tarefas = tarefas.length;
  const quant_tarefas_conc = tarefas_concluidas.length;
  const result = quant_tarefas + quant_tarefas_conc;
  console.log(`O número total de tarefas é ${result}.`);
  console.log(`O número de tarefas pendentes é ${quant_tarefas}.`);
  console.log(`O número total de tarefas concluídas é ${quant_tarefas_conc}.`);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const amanha = new Date(hoje);
  amanha.setDate(hoje.getDate() + 1);
  const amanhaFormatada = amanha.toISOString().split('T')[0];
  const tarefasDeAmanha = tarefas.filter(tarefa => tarefa.dataVenc === amanhaFormatada);
  console.log("Tarefas que vão vencer no dia de amanhã:")
  console.table(tarefasDeAmanha)
}
