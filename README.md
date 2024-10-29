GERENCIADOR DE TAREFAS_TS


Este projeto é um sistema de gerenciamento de tarefas em TypeScript que permite criar, listar, editar, marcar como concluídas, remover e pesquisar tarefas. 
Cada tarefa inclui um título, descrição, data de criação, data de vencimento, prioridade e status.

ESTRUTURA DE DADOS:

As tarefas são representadas pela interface Exercicio, que inclui os seguintes atributos:

titulo: Título da tarefa
descricao: Descrição da tarefa
dataVenc: Data de vencimento no formato xx/xx/xxxx
prioridade: Nível de prioridade da tarefa (Baixa, Média ou Alta)
status: Status da tarefa (Pendente ou Concluída)
dataCriacao: Data de criação no formato xx/xx/xxxx

Duas listas são usadas para gerenciar as tarefas:

tarefas: Lista de tarefas pendentes.
tarefas_concluidas: Lista de tarefas concluídas.

FUNCIONALIDADES:

Adicionar Tarefa (adicionar):
Adiciona uma nova tarefa à lista tarefas. Solicita título, descrição (opcional), data de vencimento e prioridade. Verifica se todos os campos obrigatórios são preenchidos.


Listar Tarefas (listar):
Exibe todas as tarefas em uma tabela. O usuário pode escolher ordenar as tarefas por data de vencimento, prioridade ou data de criação, ou pode filtrá-las por status, prioridade ou data de vencimento.


Editar Tarefa (editar):
Edita o título, data de vencimento, descrição e prioridade de uma tarefa existente, conforme especificado pelo título da tarefa.


Remover Tarefa (remover):
Remove uma tarefa específica após confirmação. A tarefa é localizada pelo título.


Marcar como Concluída (marcar):
Marca uma tarefa como concluída, alterando seu status de "Pendente" para um ícone de concluído (✓) e movendo-a para a lista tarefas_concluidas.


Pesquisar Tarefa (pesquisar):
Pesquisa tarefas por título ou descrição (parcial ou completo) e exibe as correspondências.


Resumo de Tarefas (resumo):
Exibe o número total de tarefas, dividindo entre pendentes e concluídas. Lista também as tarefas com data de vencimento para o próximo dia.
