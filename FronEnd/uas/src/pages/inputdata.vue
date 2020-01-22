<template>
    <q-page>
       <div class="row justify-center q-pt-md">
           <div class="col-md-6 col-xs-26">
                <q-card class="my-card">
                <q-card-section>
                    <div class="text-h4 q-pb-md"><center> INPUT DATA HOTEL </center></div>
                    <q-form
      @submit="onSubmit"
      class="q-gutter-sm"
    >
       <q-input
        filled
        type="text"
        v-model="kode"
        label= "Masukkan kode pesawat  Anda "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

      <q-input
        filled
        type="text"
        v-model="tujuan"
        label= "Masukkan tujuan Anda "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

      <q-input
        filled
        type="text"
        v-model="tanggal"
        label= "Masukkan tanggal berangkat Anda "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

      <q-input
        filled
        type="text"
        v-model="nama"
        label= "Masukkan nama Anda "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

      <q-input
        filled
        type="text"
        v-model="jk"
        label= "Masukkan jk Anda "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

      <q-input
        filled
        type="text"
        v-model="alamat"
        label= "Masukkan alamat Anda "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

      <q-input
        filled
        type="text"
        v-model="umur"
        label= "Masukkan umur Anda "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />
       <q-input
        filled
        type="text"
        v-model="nopon"
        label= "Masukkan nopon Anda "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

 <q-input
        filled
        type="text"
        v-model="email"
        label= "Masukkan email Anda "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

 <q-input
        filled
        type="text"
        v-model="debit"
        label= "Masukkan debit Anda "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

 <q-input
        filled
        type="text"
        v-model="name"
        label= "Masukkan name Anda "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

 <q-input
        filled
        type="text"
        v-model="expired"
        label= "Masukkan expired Anda "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

 <q-input
        filled
        type="text"
        v-model="cvv"
        label= "Masukkan cvv Anda "
        lazy-rules
        :rules="[ val => val !== null && val !== '' || 'Wajib disi']"
      />

      <div>
        <q-btn label="SIMPAN" type="submit" color="primary"/>
      </div>
    </q-form>
                </q-card-section>
                </q-card>
           </div>
       </div>
    </q-page>
</template>

<script>
export default {
  data () {
    return {
      kode: '',
      tujuan: '',
      tanggal: '',
      nama: '',
      jk: '',
      alamat: '',
      umur: '',
      nopon: '',
      email: '',
      debit: '',
      name: '',
      expired: '',
      cvv: ''
    }
  },
  methods: {
    onSubmit () {
      this.$axios.post('lihat/input', {
    kode: this.kode,
        tujuan: this.tujuan,
        tanggal: this.tanggal,
        nama: this.nama,
        jk: this.jk,
        alamat: this.alamat,
        umur: this.umur,
        nopon: this.nopon,
         email: this.email,
         debit: this.debit,
          name: this.name,
        expired: this.expired,
            cvv: this.cvv
      }).then(res => {
        if (res.data.error) {
          this.showNotif(res.data.pesan, 'negative')
        } else {
          this.$router.push('/home')
        }
        this.kode = ''
        this.tujuan = ''
        this.tanggal = ''
        this.nama = ''
        this.jk = ''
        this.alamat = ''
        this.umur= ''
        this.nopon= ''
        this.email= ''
        this.debit= ''
        this.name= ''
        this.expired= ''
        this.cvv= ''
      })
    },
    showNotif (msg, color) {
      this.$q.notify({
        message: msg,
        color: 'color'
      })
    }
  }
}
</script>
