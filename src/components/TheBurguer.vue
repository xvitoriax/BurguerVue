<template>
  <div>
    <Message :msg="msg" v-show="msg" />
    <form id="burger-form" @submit="createBurger">
      <div class="input-container">
        <label for="nome">Nome do Cliente:</label>
        <input type="text" id="name" name="name" v-model="nome" placeholder="Digite o seu nome" />
      </div>

      <div class="input-container">
        <label for="pao">Escolha o Pão:</label>
        <select name="pao" id="pao" v-model="pao">
          <option value="">Selecione o Seu pão:</option>
          <option v-for="p in paes" :key="p.id" :value="p.tipo">
            {{ p.tipo }}
          </option>
        </select>
      </div>

      <div class="input-container">
        <label for="carne">Escolha a Carne do Seu Burger:</label>
        <select name="carne" id="carne" v-model="carne">
          <option value="">Selecione o tipo de carne:</option>
          <option v-for="c in carnes" :key="c.id" :value="c.tipo">
            {{ c.tipo }}
          </option>
        </select>
      </div>

      <div id="opcionais-container" class="input-container">
        <label id="opcionais-title" for="opcionais"> Selecione os opcionais: </label>
        <div class="checkbox-container" v-for="op in opcionaisdata" :key="op.id">
          <input type="checkbox" name="opcionais" v-model="opcionais" :value="op.tipo" />
          <span>{{ op.tipo }}</span>
        </div>
      </div>

      <div class="input-container">
        <input type="submit" class="submit-btn" value="Criar meu Burguer" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Message from './TheMessage.vue'

// Dados reativos
const paes = ref<{ id: number; tipo: string }[] | null>(null)
const carnes = ref<{ id: number; tipo: string }[] | null>(null)
const opcionaisdata = ref<{ id: number; tipo: string }[] | null>(null)

const nome = ref<string>('')
const pao = ref<string>('')
const carne = ref<string>('')
const opcionais = ref<string[]>([])
const msg = ref<string>('')

const getIngredientes = async () => {
  const req = await fetch('http://localhost:3000/ingredientes')
  const data = await req.json()

  console.log('Ingredientes carregados:', data)

  paes.value = data.paes
  carnes.value = data.carnes
  opcionaisdata.value = data.opcionais
}

// Criar burger
const createBurger = async (e: Event) => {
  e.preventDefault()

  const data = {
    nome: nome.value,
    pao: pao.value,
    carne: carne.value,
    opcionais: Array.from(opcionais.value),
    status: 'Solicitado',
  }

  const dataJson = JSON.stringify(data)

  const req = await fetch('http://localhost:3000/burgers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: dataJson,
  })

  const res = await req.json()

  msg.value = `Pedido N° ${res.id} criado com sucesso!`

  setTimeout(() => (msg.value = ''), 3000)

  nome.value = ''
  pao.value = ''
  carne.value = ''
  opcionais.value = []
}

onMounted(() => {
  getIngredientes()
})
</script>

<style lang="scss" scoped>
#burger-form {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #222;
  padding-left: 10px;
  border-left: 4px solid #fcba03;
}

input,
select {
  padding: 8px 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}
#opcionais-container {
  flex-direction: row;
  flex-wrap: wrap;
}

#opcionais-title {
  width: 100%;
  padding: 5px;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
  margin-top: 10px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-weight: bold;
}

.submit-btn {
  display: block;
  margin: 0 auto;
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
