import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CurriculoForm from '@/components/CurriculoForm.vue'

describe('CurriculoForm.vue', () => {
  it('valida formulário corretamente', () => {
    const wrapper = mount(CurriculoForm)
    const vm = wrapper.vm

    vm.formData = {
      nome: '',
      email: 'email-invalido',
      telefone: '',
      cargo_desejado: '',
      escolaridade: '',
      arquivo: null
    }

    vm.validateForm()

    expect(vm.errors.nome).toBe('Nome é obrigatório')
    expect(vm.errors.email).toBe('E-mail inválido')
    expect(vm.errors.telefone).toBe('Telefone é obrigatório')
    expect(vm.errors.cargo_desejado).toBe('Cargo desejado é obrigatório')
    expect(vm.errors.escolaridade).toBe('Escolaridade é obrigatória')
    expect(vm.errors.arquivo).toBe('Arquivo é obrigatório')
  })

  it('valida email corretamente', () => {
    const wrapper = mount(CurriculoForm)
    const vm = wrapper.vm
    
    expect(vm.isValidEmail('email-invalido')).toBe(false)
    expect(vm.isValidEmail('email@valido.com')).toBe(true)
    expect(vm.isValidEmail('teste@dominio.com.br')).toBe(true)
  })

  it('valida arquivo corretamente', async () => {
    const wrapper = mount(CurriculoForm)
    const vm = wrapper.vm

    // Teste com arquivo inválido
    const invalidFile = new File([''], 'test.txt', { type: 'text/plain' })
    vm.formData.arquivo = invalidFile

    vm.validateForm()
    expect(vm.errors.arquivo).toBe('Apenas arquivos .doc, .docx ou .pdf são permitidos')

    // Teste com arquivo válido
    const validFile = new File([''], 'cv.pdf', { type: 'application/pdf' })
    vm.formData.arquivo = validFile
    vm.errors.arquivo = '' // Reseta o erro

    vm.validateForm()
    // Use toBeUndefined() em vez de toBe('')
    expect(vm.errors.arquivo).toBeUndefined()
  })
})