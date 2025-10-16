const express = require("express");
const app = express();
const port = 3000;
 
app.set("view engine", "ejs");
app.set("views", "./views");
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
 
let estudante = {
  nome: "Paula Emy Tamay",
  curso: "Desenvolvimento de Software Multiplataforma | Ciência da Computação",
  instituicao: "FATEC | UNIP",
  ano: 2025
};
 
let disciplinas = {
  cursadas: [
    "Design Digital",
    "Desenvolvimento Web I",
    "Engenharia de Software I",
    "Sistemas Operacionais e Redes de Computadores",
    "Algoritmos e Lógica de Programação",
    "Modelagem de Banco de Dados"
  ],
  andamento: [
    "Banco de Dados Relacional",
    "Estrutura de Dados",
    "Técnicas de Programação",
    "Engenharia de Software II",
    "Matemática para Computação",
    "Desenvolvimento Web II"
  ]
};
 
let projetos = [
  { id: 1, 
    titulo: "Site de avaliação de projetos para Feira Técnica", 
    descricao: "Projeto feito para meu TCC do Colégio UNIVAP Centro. Tem como objetivo a criação de um site com a intenção de facilitar a organização dos projetos e permitir que professores e visitantes possam avaliar digitalmente os trabalhos da feira técnica.", 
    link: "https://github.com/PaulaEmy/tcc", 
    concluido: true },
  { id: 2, 
    titulo: "Site para análise de dados de exportação e importação do estado de SP", 
    descricao: "Primeira API para a FATEC. O objetivo desse site é permitir que qualquer usuário visualize os dados de importações e exportações do estado de SP com gráficos e filtros a fim de facilitar o entendimento das informações.", 
    link: "https://github.com/Kernel-Panic-FatecSjc/KernelPanic", 
    concluido: true },
  { id: 3, 
    titulo: "Site para centralizar e padronizar processos da Newe Log", 
    descricao: "Projeto desenvolvido para a API (Aprendizagem por Projeto Integrado) do 2° Semestre do curso Desenvolvimento de Software Multiplataforma (DSM) em parceria com a empresa Newe Log, no projeto de Plataforma Integrada de Gestão.", 
    link: "https://github.com/Kernel-Panic-FatecSjc/KernelPanic-2DSM-API", 
    concluido: false }
];
 
app.get("/", (req, res) => {
  res.render("index", { nome: estudante.nome });
});
 
app.get("/sobre", (req, res) => {
  res.render("sobre", { estudante });
});
 
app.get("/disciplinas", (req, res) => {
  res.render("disciplinas", { disciplinas });
}); 

app.post("/disciplinas", (req, res) => {
  const { nome, status } = req.body;

  if (status === "cursadas") {
    disciplinas.cursadas.push(nome);
  } else {
    disciplinas.andamento.push(nome);
  }

  res.redirect("/disciplinas");
});

app.post("/disciplinas/mover", (req, res) => {
  const { nome } = req.body;

  disciplinas.andamento = disciplinas.andamento.filter(d => d !== nome);

  disciplinas.cursadas.push(nome);

  res.redirect("/disciplinas");
});

 
app.get("/projetos", (req, res) => {
  res.render("projetos", { projetos });
});
 
app.post("/projetos", (req, res) => {
  const { titulo, descricao, link } = req.body;
  projetos.push({ id: projetos.length + 1, titulo, descricao, link, concluido: false });
  res.redirect("/projetos");
});
 
app.put("/projetos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { titulo, descricao, link, concluido } = req.body;

  const projeto = projetos.find(p => p.id === id);

  if (projeto) {
    if (titulo !== undefined) projeto.titulo = titulo;
    if (descricao !== undefined) projeto.descricao = descricao;
    if (link !== undefined) projeto.link = link;
    if (concluido !== undefined) projeto.concluido = concluido;

    res.json({ message: "Projeto atualizado com sucesso!", projeto });
  } else {
    res.status(404).json({ error: "Projeto não encontrado!" });
  }
});

 
app.delete("/projetos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  projetos = projetos.filter(p => p.id !== id);
  res.json({ message: "Projeto removido com sucesso!" });
});
 
app.get("/contato", (req, res) => {
  res.render("contato", {
    email: "paulaemy8262999@gmail.com",
    telefone: "(12) 98235-5367", 
    github: "https://github.com/PaulaEmy",
    linkedin: "https://www.linkedin.com/in/paula-tamay-7a168228a?utm_source=share&utm_campaign=share_via&u…",
    instagram: "https://www.instagram.com/paulatamay_?igsh=MTZmNnp2ZWhzcXVjaQ==" });
});
 
app.get("/dashboard", (req, res) => {
  const totalDisciplinas = disciplinas.cursadas.length + disciplinas.andamento.length;
  const totalProjetos = projetos.length;
  const concluidos = projetos.filter(p => p.concluido).length;
  const tecnologias = ["Node.js", "Flask", "Python", "HTML", "CSS", "JavaScript"];

  res.render("dashboard", { totalDisciplinas, totalProjetos, concluidos, tecnologias });
});

 
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});