<template>
  <form @submit.prevent="submitForm" class="curriculo-form">
    <div class="form-group">
      <label for="nome">Nome *</label>
      <input type="text" id="nome" v-model="formData.nome" :class="{ 'error': errors.nome }">
      <span class="error-message" v-if="errors.nome">{{ errors.nome }}</span>
    </div>

    <div class="form-group">
      <label for="email">E-mail *</label>
      <input type="email" id="email" v-model="formData.email" :class="{ 'error': errors.email }">
      <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
    </div>

    <div class="form-group">
      <label for="telefone">Telefone *</label>
      <input type="tel" id="telefone" v-model="formData.telefone" :class="{ 'error': errors.telefone }">
      <span class="error-message" v-if="errors.telefone">{{ errors.telefone }}</span>
    </div>

    <div class="form-group">
      <label for="cargo_desejado">Cargo Desejado *</label>
      <input type="text" id="cargo_desejado" v-model="formData.cargo_desejado" :class="{ 'error': errors.cargo_desejado }">
      <span class="error-message" v-if="errors.cargo_desejado">{{ errors.cargo_desejado }}</span>
    </div>

    <div class="form-group">
      <label for="escolaridade">Escolaridade *</label>
      <select id="escolaridade" v-model="formData.escolaridade" :class="{ 'error': errors.escolaridade }">
        <option value="">Selecione</option>
        <option value="fundamental">Fundamental</option>
        <option value="medio">Médio</option>
        <option value="superior">Superior</option>
        <option value="pos_graduacao">Pós-Graduação</option>
        <option value="mestrado">Mestrado</option>
        <option value="doutorado">Doutorado</option>
      </select>
      <span class="error-message" v-if="errors.escolaridade">{{ errors.escolaridade }}</span>
    </div>

    <div class="form-group">
      <label for="observacoes">Observações</label>
      <textarea id="observacoes" v-model="formData.observacoes" rows="4"></textarea>
    </div>

    <div class="form-group">
      <label for="arquivo">Arquivo (PDF, DOC, DOCX) *</label>
      <input type="file" id="arquivo" @change="handleFileUpload" :class="{ 'error': errors.arquivo }">
      <span class="error-message" v-if="errors.arquivo">{{ errors.arquivo }}</span>
    </div>

    <button type="submit" :disabled="loading">
      {{ loading ? 'Enviando...' : 'Enviar Currículo' }}
    </button>
  </form>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      formData: {
        nome: '',
        email: '',
        telefone: '',
        cargo_desejado: '',
        escolaridade: '',
        observacoes: '',
        arquivo: null
      },
      errors: {},
      loading: false
    };
  },
  methods: {
    handleFileUpload(event) {
      this.formData.arquivo = event.target.files[0];
    },
    validateForm() {
      this.errors = {};
      
      if (!this.formData.nome) this.errors.nome = 'Nome é obrigatório';
      if (!this.formData.email) {
        this.errors.email = 'E-mail é obrigatório';
      } else if (!this.isValidEmail(this.formData.email)) {
        this.errors.email = 'E-mail inválido';
      }
      if (!this.formData.telefone) this.errors.telefone = 'Telefone é obrigatório';
      if (!this.formData.cargo_desejado) this.errors.cargo_desejado = 'Cargo desejado é obrigatório';
      if (!this.formData.escolaridade) this.errors.escolaridade = 'Escolaridade é obrigatória';
      
      if (!this.formData.arquivo) {
        this.errors.arquivo = 'Arquivo é obrigatório';
      } else {
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(this.formData.arquivo.type)) {
          this.errors.arquivo = 'Apenas arquivos .doc, .docx ou .pdf são permitidos';
        }
        if (this.formData.arquivo.size > 1024 * 1024) {
          this.errors.arquivo = 'O arquivo não pode exceder 1MB';
        }
      }
      
      return Object.keys(this.errors).length === 0;
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    async submitForm() {
      if (!this.validateForm()) return;
      
      this.loading = true;
      
      try {
        const formData = new FormData();
        Object.keys(this.formData).forEach(key => {
          formData.append(key, this.formData[key]);
        });
        
        await api.post('/curriculos', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        alert('Currículo enviado com sucesso!');
        this.resetForm();
      } catch (error) {
        alert('Erro ao enviar currículo. Tente novamente.');
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.formData = {
        nome: '',
        email: '',
        telefone: '',
        cargo_desejado: '',
        escolaridade: '',
        observacoes: '',
        arquivo: null
      };
      this.errors = {};
    }
  }
};
</script>

<style scoped>
.curriculo-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input.error, select.error {
  border-color: #ff4444;
}

.error-message {
  color: #ff4444;
  font-size: 14px;
  margin-top: 5px;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>