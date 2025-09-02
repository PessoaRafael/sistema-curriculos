# 📝 Sistema de Envio de Currículos

Sistema completo para recebimento e gerenciamento de currículos com validações, notificações por e-mail e armazenamento seguro.

![Vue.js](https://img.shields.io/badge/Vue.js-3.5.20-4FC08D?logo=vuedotjs)
![Laravel](https://img.shields.io/badge/Laravel-10.0-FF2D20?logo=laravel)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)
![Vitest](https://img.shields.io/badge/Vitest-1.0-6E9F18?logo=vitest)

## ✨ Funcionalidades
- Formulário completo: Nome, E-mail, Telefone, Cargo, Escolaridade, Observações e Arquivo  
- Validações: obrigatórios, e-mail, tipo e tamanho de arquivo  
- Notificação automática por e-mail  
- Armazenamento seguro em MySQL com IP e data/hora  
- Testes automatizados: PHPUnit (backend) e Vitest (frontend)  
- Interface responsiva

## 🏗️ Arquitetura do Projeto
- **backend/** → API Laravel  
  - **app/** → Models, Http, Mail  
  - **database/** → Migrations e Seeders  
  - **routes/** → Rotas da API  
  - **tests/** → Testes PHPUnit  
  - composer.json  
- **frontend/** → Vue.js  
  - **src/** → components, services, utils  
  - **tests/** → Testes Vitest  
  - package.json  

## 🚀 Começando
### Pré-requisitos
- PHP 8.2+ (BCMath, Ctype, cURL, DOM, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML)  
- Composer 2.5+  
- Node.js 18+  
- MySQL 8.0+  
- Git  

### Instalação
bash
# Clonar repositório
git clone https://github.com/pessoarafael/sistema-curriculos.git
cd sistema-curriculos

# Configurar backend
cd backend
cp .env.example .env
composer install
php artisan key:generate

# Criar banco de dados
mysql -u root -p -e "CREATE DATABASE curriculos_db;"

# Configurar variáveis no .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=curriculos_db
# DB_USERNAME=root
# DB_PASSWORD=sua_senha_aqui

# Executar migrations
php artisan migrate

# Configurar frontend
cd ../frontend
npm install

# Desenvolvimento - Backend
cd backend
php artisan serve
# Disponível em http://localhost:8000

# Desenvolvimento - Frontend
cd ../frontend
npm run dev
# Disponível em http://localhost:5173

# Produção - Build frontend
cd frontend
npm run build

# Servir aplicação Laravel
cd ../backend
php artisan serve

# Backend PHPUnit
cd backend
php artisan test
php artisan test --testsuite=Feature
php artisan test tests/Feature/CurriculoTest.php

# Frontend Vitest
cd frontend
npm run test:unit
npm run test:unit -- --watch
npm run coverage

✓ tests/unit/CurriculoForm.spec.js (3 tests)
✓ CurriculoForm.vue > valida formulário corretamente
✓ CurriculoForm.vue > valida email corretamente
✓ CurriculoForm.vue > valida arquivo corretamente
Cobertura: 74.59% | 93.54% branch coverage

## 📊 Tabela curriculos

| Campo           | Tipo                  | Descrição             | Obrigatório |
|-----------------|----------------------|----------------------|-------------|
| id              | bigint(20) UNSIGNED  | Chave primária       | ✅          |
| nome            | varchar(255)         | Nome completo        | ✅          |
| email           | varchar(255)         | E-mail válido        | ✅          |
| telefone        | varchar(20)          | Telefone             | ✅          |
| cargo_desejado  | varchar(255)         | Cargo de interesse   | ✅          |
| escolaridade    | enum                 | Nível de escolaridade| ✅          |
| observacoes     | text                 | Observações          | ❌          |
| arquivo         | varchar(255)         | Caminho do arquivo   | ✅          |
| ip              | varchar(45)          | IP do usuário        | ✅          |
| data_envio      | timestamp            | Data/hora do envio   | ✅          |
| created_at      | timestamp            | Data de criação      | ✅          |
| updated_at      | timestamp            | Data de atualização  | ✅          |

### Valores de escolaridade
- fundamental  
- medio  
- superior  
- pos_graduacao  
- mestrado  
- doutorado  

---

## 🔌 API Endpoints

### POST /api/curriculos

**Body**
json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "telefone": "(11) 99999-9999",
  "cargo_desejado": "Desenvolvedor Fullstack",
  "escolaridade": "superior",
  "observacoes": "Experiência em Vue.js e Laravel",
  "arquivo": "File" 
}

{
  "message": "Currículo enviado com sucesso!"
}

## ⚙️ Configurações

env
APP_NAME="Sistema de Currículos"
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=curriculos_db
DB_USERNAME=root
DB_PASSWORD=

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="noreply@example.com"
MAIL_FROM_NAME="Sistema de Currículos"

## ✅ Validações

- **Nome:** obrigatório, máximo 255 caracteres  
- **E-mail:** obrigatório, formato válido  
- **Telefone:** obrigatório, máximo 20 caracteres  
- **Cargo Desejado:** obrigatório, máximo 255 caracteres  
- **Escolaridade:** obrigatório, opções pré-definidas  
- **Arquivo:** obrigatório, .doc, .docx ou .pdf, máximo 1MB  
- **Observações:** opcional

## 👨‍💻 Autor

Rafael - [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/rafael-pessoa-4210a31b8/)
