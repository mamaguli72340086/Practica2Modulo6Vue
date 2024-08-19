<template>
  <div>
    <h1>Registrar Revisiones</h1>
    <form @submit.prevent="submitForm">
      
      <div class="form-group">
        <label for="tutor">tutor:</label>
        <select id="tutor" v-model="form.tutorId" :class="{ 'is-invalid': errors.tutorId }">
          <option :value="tutor.id" v-for="(tutor, index) in tutorList" :key="`tutor-${index}`">{{tutor?.nombre }}
          </option>
        </select>
        <div v-if="errors.tutorId" class="invalid-feedback">{{ errors.tutorId }}</div>
      </div>

      <div class="form-group">
        <label for="est">estudiante:</label>
        <select id="estudiante" v-model="form.estudianteId" :class="{ 'is-invalid': errors.estudianteId }" @change="setTrabajos()">
          <option :value="estudiante.id" v-for="(estudiante, index) in estudianteList" :key="`estudiante-${index}`">{{ Estudiante?.nombre }}
          </option>
          
        </select>
        <div v-if="errors.estudianteId" class="invalid-feedback">{{ errors.estudianteId }}</div>
      </div>

                                                
      <div class="form-group">
        <label for="trabajo">trabajo:</label>
        <select id="trabajo" v-model="form.trabajoId" :class="{ 'is-invalid': errors.trabajoId }">
          <option :value="trabajo.id" v-for="(trabajo, index) in trabajoList" :key="`estudiante-${index}`">{{ trabajo?.titulo}}
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
  name: 'RevisionNew',
  data() {
    return {
      tutorList: [],
      estudianteList: [],
      trabajoList: [],
     
      form: {
        tutorId: null,
        estudianteId: null,
        trabajoId: null,
        fecha:null,
     
      },
      errors: {}
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.tutorId) {
        this.errors.tutorId = 'El tutor es obligatoria.';
      }

      if (!this.form.estudianteId) {
        this.errors.estudianteId = 'El estudiante es obligatorio.';
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
          estudianteId: null
        };
      }
    },
    save() {
      const vm = this;
      this.axios.post(this.baseUrl + "/revisionestrabajos", this.form)
        .then(function (response) {
          if (response.status == '201') {
            vm.$emit('on-register', response.data);
          }
          vm.itemList = response.data;
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
    setTrabajos(){
      const vm = this;
            this.axios.get(this.baseUrl + "/trabajos?estudianteId=" + this.form.estudianteId)
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
    }
  },
  mounted() {
    this.gettutorList();
    this.getestudianteList();
  },
}
</script>
  
<style scoped></style>
  