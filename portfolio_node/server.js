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
  { id: 1, titulo: "Sistema de Diário de Pesadelos", descricao: "App em Flask para registrar pesadelos.", link: "https://github.com/seuusuario/diario-pesadelos", concluido: true },
  { id: 2, titulo: "Site de Exportações", descricao: "Dashboard com Flask e Chart.js.", link: "https://github.com/seuusuario/export-data", concluido: true },
  { id: 3, titulo: "Jogo em Python", descricao: "Jogo 2D feito com Pygame.", link: "#", concluido: false }
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
  const projeto = projetos.find(p => p.id === id);
  if (projeto) {
    projeto.concluido = true;
    res.json({ message: "Projeto marcado como concluído!" });
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
  const totalDisciplinas = disciplinas.length;
  const totalProjetos = projetos.length;
  const concluidos = projetos.filter(p => p.concluido).length;
  const tecnologias = ["Node.js", "Flask", "Python", "HTML", "CSS", "JavaScript"];
 
  res.render("dashboard", { totalDisciplinas, totalProjetos, concluidos, tecnologias });
});
 
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});