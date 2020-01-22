<template>
  <q-page padding>
   <q-card>
      <q-table
      title="DATA BOKING"
      :data="data"
      :columns="columns"
      row-key="id"
      :pagination.sync="pagination"
      :loading="loading"
      :filter="filter"
      @request="onRequest"
      binary-state-sort
    >

      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
          <q-tr :props="props">
             <q-td key="kode" :props="props">{{ props.row.kode }}</q-td>
            <q-td key="tujuan" :props="props">{{ props.row.tujuan }}</q-td>
            <q-td key="tanggal" :props="props">{{ props.row.tanggal }}</q-td>
            <q-td key="nama" :props="props">{{ props.row.nama }}</q-td>
            <q-td key="jk" :props="props">{{ props.row.jk }}</q-td>
             <q-td key="alamat" :props="props">{{ props.row.alamat }}</q-td>
              <q-td key="umur" :props="props">{{ props.row.umur }}</q-td>
               <q-td key="nopon" :props="props">{{ props.row.nopon }}</q-td>
                <q-td key="email" :props="props">{{ props.row.email }}</q-td>
                 <q-td key="debit" :props="props">{{ props.row.debit }}</q-td>
                  <q-td key="name" :props="props">{{ props.row.name }}</q-td>
                   <q-td key="expired" :props="props">{{ props.row.expired }}</q-td>
                    <q-td key="cvv" :props="props">{{ props.row.cvv }}</q-td>
            <q-td key="aksi" :props="props">
              <q-card-actions align="around" class="row q-col-gutter-md no-wrap">
                <div class="col q-gutter-md">
                  <q-btn round @click="opendialog(props.row)" color="secondary" icon="edit"></q-btn>
                   <q-btn round @click="confirm(props.row._id)" color="negative" icon="delete"></q-btn>
                </div>
              </q-card-actions>
            </q-td>
          </q-tr>
        </template>

    </q-table>
   </q-card>
   <q-dialog v-model="openedit" v-if="openedit">
      <q-card style="width: 700px; max-width:80vw;">
        <q-card-section>
          <div class="text-h6">Edit Data</div>
        </q-card-section>

        <q-separator/>

          <q-card-selection style="max-height: 50vh" class="scroll">
         <q-input label ="kode" v-model ="activedata.kode"></q-input>
          <q-input label ="tujuan" v-model ="activedata.tujuan"></q-input>
          <q-input label ="tanggal" v-model ="activedata.tanggal"></q-input>
          <q-input label ="nama" v-model ="activedata.nama"></q-input>
          <q-input label ="jk " v-model ="activedata.jk"></q-input>
           <q-input label ="alamat " v-model ="activedata.alamat"></q-input>
            <q-input label ="umur " v-model ="activedata.umur"></q-input>
             <q-input label ="nopon " v-model ="activedata.nopon"></q-input>
              <q-input label ="email " v-model ="activedata.email"></q-input>
               <q-input label ="debit " v-model ="activedata.debit"></q-input>
                <q-input label ="name " v-model ="activedata.name"></q-input>
                 <q-input label ="expired" v-model ="activedata.expired"></q-input>
                  <q-input label ="cvv " v-model ="activedata.cvv"></q-input>
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
        { name: 'tujuan', label: 'tujuan', field: 'tujuan', sortable: true },
        { name: 'tanggal', label: 'tanggal', field: 'tanggal', sortable: true },
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
      this.$axios.get('lihat/getAllMhs')
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
        this.$axios.delete('hotel/delete/' + id)
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
