<template>
  <q-page padding>
   <q-card>
    </q-card>
   <q-dialog v-model="openedit" v-if="openedit">
      <q-card style="width: 700px; max-width:80vw;">
        <q-card-section>
          <div class="text-h6">Edit Data</div>
        </q-card-section>
         <p>Aplilkasi Hotel</p>
        <q-separator/>

          <q-card-selection style="max-height: 50vh" class="scroll">
          <q-input label ="Nama" v-model ="activedata.nama"></q-input>
          <q-input label ="No_ktp" v-model ="activedata.no_ktp"></q-input>
          <q-input label ="Tanggal_pemesanan" v-model ="activedata.tanggal_pemesanan"></q-input>
          <q-input label ="Tanggal_keluar" v-model ="activedata.tanggal_keluar"></q-input>
          <q-input label ="Jumlah_kamar" v-model ="activedata.jumlah_kamar"></q-input>
          <q-input label ="Harga" v-model ="activedata.harga"></q-input>
          </q-card-selection>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Edit" color="primary" @click="edit()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      filter: '',
      loading: false,
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 10
      },
      columns: [
        {
          name: 'kode',
          required: true,
          label: 'Kode',
          align: 'left',
          field: 'kode',
          format: val => `${val}`,
          sortable: true
        },
        { name: 'kode', align: 'center', label: 'kode', field: 'kode', sortable: true },
        { name: 'tujuan', label: 'tujuan', field: 'tujuan', sortable: true },
        { name: 'tanggal', label: 'Tanggal', field: 'tanggal', sortable: true },
        { name: 'nama', label: 'nama', field: 'nama', sortable: true },
        { name: 'jk', label: 'jk', field: 'jk', sortable: true },
        { name: 'alamat', label: 'alamat', field: 'alamat', sortable: true },
        { name: 'umur', label: 'umur', field: 'umur', sortable: true },
        { name: 'nopon', label: 'nopon', field: 'nopon', sortable: true },
        { name: 'email', label: 'email', field: 'email', sortable: true },
        { name: 'debit', label: 'debit', field: 'debit', sortable: true },
        { name: 'name', label: 'name', field: 'name', sortable: true },
        { name: 'expired', label: 'expired', field: 'expired', sortable: true },
        { name: 'cvv', label: 'cvv', field: 'cvv', sortable: true },
        { name: 'aksi', label: 'aksi', field: 'aksi' }
      ],
      data: [],
      original: [],
      openedit: false,
      activedata: null
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  methods: {
    getData () {
      this.$axios.get('hotel/getAllhotel')
        .then(res => {
          this.original = res.data.data
        })
    },
    onRequest (props) {
      let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      let filter = props.filter

      this.loading = true

      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.getRowsNumberCount(filter)

        // get all rows if "All" (0) is selected
        let fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage

        // calculate starting row of data
        let startRow = (page - 1) * rowsPerPage

        // fetch data from "server"
        let returnedData = this.fetchFromServer(startRow, fetchCount, filter, sortBy, descending)

        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData)

        // don't forget to update local pagination object
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending

        // ...and turn of loading indicator
        this.loading = false
      }, 1500)
    },
    fetchFromServer (startRow, count, filter, sortBy, descending) {
      let data = []

      if (!filter) {
        data = this.original.slice(startRow, startRow + count)
      } else {
        let found = 0
        for (let index = startRow, items = 0; index < this.original.length && items < count; ++index) {
          let row = this.original[index]
          // match filter?
          if (!row['name'].includes(filter)) {
            // get a different row, until one is found
            continue
          }
          ++found
          if (found >= startRow) {
            data.push(row)
            ++items
          }
        }
      }

      // handle sortBy
      if (sortBy) {
        data.sort((a, b) => {
          let x = descending ? b : a
          let y = descending ? a : b
          if (sortBy === 'desc') {
            // string sort
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
          } else {
            // numeric sort
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy])
          }
        })
      }

      return data
    },
    getRowsNumberCount (filter) {
      if (!filter) {
        return this.original.length
      }
      let count = 0
      this.original.forEach((treat) => {
        if (treat['name'].includes(filter)) {
          ++count
        }
      })
      return count
    },
    opendialog (data) {
      this.openedit = true
      this.activedata = data
    },
    edit () {
      this.$axios.put('lihat/edit/' + this.activedata._id, this.activedata)
        .then(res => {
          if (res.data.error) {
            this.showNotif(res.data.pesan, 'negative')
          } else {
            this.showNotif(res.data.pesan, 'positive')
            this.openedit = false
            this.getData()
          }
        })
    },
    showNotif (msg, color) {
      this.$q.notify({
        message: msg,
        color: color
      })
    },
    confirm (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'apakah anda yakin',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete('lihat/delete/' + id)
          .then(res => {
            if (res.data.error) {
              this.showNotif(res.data.pesan, 'negative')
            } else {
              this.showNotif(res.data.pesan, 'positive')
              this.getData()
            }
          })
      })
    }
  }
}
</script>
