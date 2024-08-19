<template>
  <div>
    <h1>Editar Trabajo</h1>
    <form @submit.prevent="submitForm" v-if="form">
      <div class="form-group">
        <label for="estudiante">Estudiante:</label>
        <select id="estudiante" v-model="form.estudianteId" :class="{ 'is-invalid': errors.estudianteId }">
          <option :value="estudiante.id" v-for="(estudiante, index) in estudianteList" :key="`estudiante-${index}`">{{ estudiante.nombre }}
          </option>
        </select>
        <div v-if="errors.estudianteId" class="invalid-feedback">{{ errors.estudianteId }}</div>
      </div>

      <div class="form-group">
        <label for="name">Titulo del Trabajo:</label>
        <input type="text" id="name" v-model="form.titulo" :class="{ 'is-invalid': errors.titulo }"
          placeholder="Ingrese el titulo" />
        <div v-if="errors.titulo" class="invalid-feedback">{{ errors.titulo }}</div>
      </div>

      <div class="form-group">
        <label for="area">Area:</label>
        <select id="area" v-model="form.area" :class="{ 'is-invalid': errors.area }">
          <option :value="area" v-for="(area, index) in areaList" :key="`area-${index}`">{{ area }}</option>
        </select>
        <div v-if="errors.area" class="invalid-feedback">{{ errors.area }}</div>
      </div>

      <div class="form-group">
        <label for="fecha">Fecha:</label>
        <input type="date" id="fecha" v-model="form.fecha" :class="{ 'is-invalid': errors.fecha }"
          placeholder="Ingrese la fecha" />
        <div v-if="errors.fecha" class="invalid-feedback">{{ errors.fecha }}</div>
      </div>

      <div class="form-group">
        <label for="grupo">Grupo Asignado:</label>
        <input type="number" id="grupo" v-model="form.grupo" :class="{ 'is-invalid': errors.grupo }"
          placeholder="Ingrese el grupo" min="1" max="5" />
        <div v-if="errors.grupo" class="invalid-feedback">{{ errors.grupo }}</div>
      </div>
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>
  
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'TrabajoEdit',
  data() {
    return {
      estudianteList: [],
      areaList: [
        "Redes",
        "Programacion"
      ],
      errors: {}
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.titulo) {
        this.errors.titulo = 'El titulo es obligatorio.';
      }

      if (!this.form.area) {
        this.errors.area = 'El area es obligatoria.';
      }

      if (!this.form.fecha) {
        this.errors.fecha = 'La fecha es obligatoria.';
      }

      if (!this.form.grupo) {
        this.errors.grupo = 'El grupo es obligatorio.';
      }

      if (!this.form.estudianteId) {
        this.errors.estudianteId = 'El Estudiante es obligatorio.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
        this.form = {
          titulo: '',
          area: '',
          fecha: '',
          grupo: '',
          estudianteId: null
        };
      }
    },
    save() {
      const vm = this;
      this.axios.patch(this.baseUrl + "/trabajos/" + this.item.id, this.form)
        .then(function (response) {
          if (response.status == '200') {
            vm.$emit('on-update', response.data);
          }
          vm.itemList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getEstudianteList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/estudiantes")
        .then(function (response) {
          vm.estudianteList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    },
    form() {
      return Object.assign({},this.item);
    }
  },
  mounted() {
    this.getEstudianteList();
  },
  props: ['item']
}
</script>
  
<style scoped></style>
  