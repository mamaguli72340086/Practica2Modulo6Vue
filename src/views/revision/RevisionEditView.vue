<template>
  <div>
    <h1>Editar Revision</h1>
    <form @submit.prevent="submitForm" v-if="form">

      <div class="form-group">
        <label for="estudiante">estudiante:</label>
        <select id="estudiante" v-model="form.estudianteId" :class="{ 'is-invalid': errors.estudianteId }">
          <option :value="estudiante.id" v-for="(estudiante, index) in estudianteList" :key="`estudiante-${index}`">{{ estudiante?.nombre }}
          </option>
        </select>
        <div v-if="errors.estudianteId" class="invalid-feedback">{{ errors.estudianteId }}</div>
      </div>

      <div class="form-group">
        <label for="tutor">Tutor:</label>
        <select id="tutor" v-model="form.tutorId" :class="{ 'is-invalid': errors.tutorId }" @change="setTrabajos()">
          <option :value="tutor.id" v-for="(tutor, index) in tutorList" :key="`tutor-${index}`">{{ tutor?.nombre }}
          </option>
        </select>
        <div v-if="errors.tutorId" class="invalid-feedback">{{ errors.tutorId }}</div>
      </div>

      <div class="form-group">
        <label for="trabajo">Trabajo:</label>
        <select id="trabajo" v-model="form.trabajoId" :class="{ 'is-invalid': errors.trabajoId }">
          <option :value="trabajo.id" v-for="(trabajo, index) in trabajoList" :key="`tutor-${index}`">{{trabajo?.titulo }}
          </option>
        </select>
        <div v-if="errors.trabajoId" class="invalid-feedback">{{ errors.trabajoId }}</div>
      </div>

    

      <div class="form-group">
        <label for="fecha">Fecha:</label>
        <input type="date" id="fecha" v-model="form.fecha" :class="{ 'is-invalid': errors.fecha }"
          placeholder="Ingrese la fecha" />
        <div v-if="errors.fecha" class="invalid-feedback">{{ errors.fecha }}</div>
      </div>

          
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>
  
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'RevisionEdit',
  data() {
    return {
      estudianteList: [],
      tutorList: [],
      trabajoList: [],
       errors: {}
    };
  },
  props:['item'],
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.estudianteId) {
        this.errors.estudianteId = 'El estudiante es obligatorio.';
      }

      if (!this.form.tutorId) {
        this.errors.tutorId = 'El tutor es obligatoria.';
      }
      
      if (!this.form.trabajoId) {
        this.errors.trabajoId = 'La trabajo es obligatorio.';
      }

      if (!this.form.fecha) {
        this.errors.fecha = 'La fecha es obligatorio.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
        this.form = {
          tutorId: null
        };
      }
    },
    save() {
      const vm = this;
      this.axios.patch(this.baseUrl + "/revisionestrabajos/"+this.item.id, this.form)
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
    getestudianteList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/estudiantes")
        .then(function (response) {
          vm.estudianteList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    gettutorList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/tutores")
        .then(function (response) {
          vm.tutorList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
   gettrabajoList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/tutores")
        .then(function (response) {
          vm.tutorList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },

    settrabajos(){
      const vm = this;
            this.axios.get(this.baseUrl + "/trabajos?tutorId=" + this.form.tutorId)
                .then(function (response) {
                    vm.trabajoList = response.data;
                })
                .catch(function (error) {
                    console.error(error);
                });
    }
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    },
    form(){
      return Object.assign({},this.item);
    }
  },
  mounted() {
    this.gettutorList();
    this.getestudianteList();
    this.gettrabajoList();
  },
}
</script>
  
<style scoped></style>
  