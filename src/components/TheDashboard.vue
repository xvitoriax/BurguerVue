<template>
  <div id="burger-table" v-if="burgers.length > 0">
    <Message :msg="msg" v-show="msg" />

    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Pão:</div>
        <div>Carne:</div>
        <div>Opcionais:</div>
        <div>Ações:</div>
      </div>
    </div>

    <div id="burger-table-rows">
      <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
        <div class="order-number">{{ burger.id }}</div>
        <div>{{ burger.nome }}</div>
        <div>{{ burger.pao }}</div>
        <div>{{ burger.carne }}</div>
        <div>
          <ul>
            <li v-for="(opcional, index) in burger.opcionais" :key="index">
              {{ opcional }}
            </li>
          </ul>
        </div>
        <div>
          <select name="status" class="status" @change="updateBurger($event, burger.id)">
            <option
              v-for="s in status"
              :key="s.id"
              :value="s.tipo"
              :selected="burger.status === s.tipo"
            >
              {{ s.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <h2>Não há pedidos no momento!</h2>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import Message from './TheMessage.vue'

interface Burger {
  id: number | string
  nome: string
  pao: string
  carne: string
  opcionais: string[]
  status: string
}

interface Status {
  id: number
  tipo: string
}

const burgers = ref<Burger[]>([])
const status = ref<Status[]>([])
const msg = ref<string | null>(null)

const getPedidos = async () => {
  const req = await fetch('http://localhost:3000/burgers')
  const data = await req.json()
  burgers.value = data
  await getStatus()
}

const getStatus = async () => {
  const req = await fetch('http://localhost:3000/status')
  const data = await req.json()
  status.value = data
}

const deleteBurger = async (id: number | string) => {
  await fetch(`http://localhost:3000/burgers/${id}`, {
    method: 'DELETE',
  })

  msg.value = 'Pedido cancelado com sucesso!'
  setTimeout(() => (msg.value = null), 3000)

  await getPedidos()
}

const updateBurger = async (event: Event, id: number | string) => {
  const target = event.target as HTMLSelectElement
  const option = target.value

  const response = await fetch(`http://localhost:3000/burgers/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: option }),
  })

  const res = await response.json()

  msg.value = `O status do pedido N° ${res.id} foi atualizado para "${res.status}"!`
  setTimeout(() => (msg.value = null), 3000)
}

onMounted(() => {
  getPedidos()
})
</script>

<style lang="scss" scoped>
#burger-table {
  max-width: 1200px;
  margin: 0 auto;
}

#burger-table-heading,
#burger-table-rows,
.burger-table-row {
  display: flex;
  flex-wrap: wrap;
}

#burger-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}

.burger-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
}

#burger-table-heading div,
.burger-table-row div {
  width: 19%;
}

#burger-table-heading .order-id,
.burger-table-row .order-number {
  width: 5%;
}

select {
  padding: 12px 6px;
  margin-right: 12px;
}

.delete-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
